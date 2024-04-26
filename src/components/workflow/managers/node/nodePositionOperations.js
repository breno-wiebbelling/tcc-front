import { idGenerator } from "../../../common/idManager";
import { nodeKeys, findNodeFrequencies } from "../nodeManager";

export const isNodeIdPresentOnNextNode = (nodeId, nodeToVerify) => {

  return (
    (
      nodeToVerify.details.nextNode === (nodeId) || (typeof nodeToVerify.details.originalNextNode != "undefined" && nodeToVerify.details.originalNextNode === nodeId) 
    )
    ||
    (
      nodeToVerify.type === nodeKeys.CONDITIONAL_KEY
      && nodeToVerify.details.nextNode.includes(nodeId)
    )
  )
}

export const reprocessNextNodePosition = (currentNode, currentNodes, mainManager) => {
  if (currentNode.type === nodeKeys.FINAL_KEY) { return currentNodes }

  let nextNode = currentNodes.find(node => isNodeIdPresentOnNextNode(node.id, currentNode));

  if (nextNode.type === nodeKeys.FINAL_KEY) { return currentNodes }
  nextNode.line = mainManager.lineManagerInstance.process(currentNode.line);

  if (nextNode.type === nodeKeys.CONDITIONAL_KEY) {
    nextNode.details.nextNode.forEach(nextNodeId => {
      let nextConditionalNode = currentNodes.find(node => node.id === nextNodeId);
      let conditionalGhostNode = reprocessNodeOnNextPosition({ ...nextNode, column: nextConditionalNode.column }, currentNodes, mainManager)

      nextConditionalNode.line = mainManager.lineManagerInstance.process(conditionalGhostNode.line);
      currentNodes = reprocessNextNodePosition(nextConditionalNode, currentNodes, mainManager);
    })

    return currentNodes
  }

  return reprocessNextNodePosition(nextNode, currentNodes, mainManager);
}

export const reprocessNodeColumns = (mainManager, currentNodeId, latestNodes, updateParentNode) => {
  let currentNode = latestNodes.find(node => node.id === currentNodeId);
  switch (currentNode.type) {
    case nodeKeys.START_KEY:
      currentNode.column = mainManager.columnManagerInstance.central_column_name;

    case nodeKeys.TASK_KEY:
      currentNode.column = mainManager.nodeManagerInstance.parentNode.column;

    case nodeKeys.START_KEY: case nodeKeys.TASK_KEY:
      mainManager.nodeManagerInstance.updateParentNode(currentNode);
      latestNodes = reprocessNodeColumns(mainManager, currentNode.details.nextNode, latestNodes, updateParentNode);
      break;

    case nodeKeys.CONDITIONAL_KEY:
      let prev_parentNode = currentNode;
      currentNode.column = mainManager.nodeManagerInstance.parentNode.column;

      currentNode.details.nextNode.forEach((conditionalLegId, index) => {
        let columnNameForFollowingChild = mainManager.columnManagerInstance.create(index, currentNode.details.nextNode.length, currentNode.column);

        mainManager.nodeManagerInstance.updateParentNode({ column: columnNameForFollowingChild, line: currentNode.line });
        latestNodes = reprocessNodeColumns(mainManager, conditionalLegId, latestNodes, updateParentNode);
      })
      mainManager.nodeManagerInstance.updateParentNode(prev_parentNode)
      break;

    case nodeKeys.FINAL_KEY:
      currentNode.column = mainManager.columnManagerInstance.central_column_name;
      break;
  }

  return latestNodes;
}

export const reprocessNodeOnNextPosition = (currentNode, currentNodes, mainManager) => {
  if (currentNode.type === nodeKeys.FINAL_KEY) { return currentNodes }

  let nextNode = currentNodes.find(node => (node.line === currentNode.line && node.column === currentNode.column && node.id != currentNode.id));

  if (!nextNode && currentNode.type === nodeKeys.CONDITIONAL_KEY) {
    let nextLine = mainManager.lineManagerInstance.process(currentNode.line);
    let nextNode = currentNodes.find(node => (node.line === nextLine && node.column === currentNode.column && node.id != currentNode.id && node.type === nodeKeys.CONDITIONAL_GHOST));

    while (!nextNode) {
      nextLine = mainManager.lineManagerInstance.process(nextLine);
      nextNode = currentNodes.find(node => (node.line === nextLine && node.column === currentNode.column && node.id != currentNode.id && node.type === nodeKeys.CONDITIONAL_GHOST));
    }

    nextNode.line = nextLine;
    return nextNode;
  }

  nextNode.line = mainManager.lineManagerInstance.process(currentNode.line);
  return nextNode;
}

export const updateGhostPositions = (mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {

    let conditionalGhosts = latestNodes.filter(node => node.type === nodeKeys.CONDITIONAL_GHOST)
    conditionalGhosts.forEach(conditionalGhost => {
      latestNodes = reprocessNextNodePosition(conditionalGhost, latestNodes, mainManager)
    })

    let ghostNodes = latestNodes.filter(node => node.type === nodeKeys.GHOST);

    if (ghostNodes.length <= 0) { return latestNodes }

    let correctGhost = ghostNodes[0];
    let correctGhostPosition = mainManager.lineManagerInstance.getLinePosition(correctGhost.line);

    let new_ghostPosition;
    ghostNodes.forEach(new_ghost => {
      new_ghostPosition = mainManager.lineManagerInstance.getLinePosition(new_ghost.line);

      if (new_ghostPosition > correctGhostPosition) {
        correctGhost = new_ghost;
        correctGhostPosition = new_ghostPosition;
      }
    })

    ghostNodes.forEach(ghostNode => { ghostNode.line = correctGhost.line; })
    latestNodes = reprocessNextNodePosition(correctGhost, latestNodes, mainManager)

    return latestNodes;
  })
}

export const reloadNodesAndAddGhostNodes = (mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {

    let tempNodes = latestNodes;
    let seenIds = {};
    let uniqueList = tempNodes.filter(item => {
      if (seenIds.hasOwnProperty(item.id)) {
        return false;
      } else {
        seenIds[item.id] = true;
        return true;
      }
    });
    latestNodes = uniqueList;

    let nodesWithSimilarity = findNodeFrequencies(latestNodes);
    
    nodesWithSimilarity.forEach(similarNodeId => {
      let similarNode = latestNodes.find(node => node.id === similarNodeId);
      let ghostLine = mainManager.lineManagerInstance.processGhostLine(similarNode.line);

      let nodesPoitingToSimilarNode = latestNodes.filter(node => isNodeIdPresentOnNextNode(similarNodeId, node))
      if (nodesPoitingToSimilarNode.length > 1) {
        let newGhostColumns = [];

        nodesPoitingToSimilarNode.forEach(nodePoitingToSimilar => {
          let newGhostNode = { id: idGenerator("ghost"), details: { "nextNode": nodePoitingToSimilar.details.nextNode }, type: nodeKeys.GHOST, column: nodePoitingToSimilar.column, line: ghostLine }
          nodePoitingToSimilar.details.originalNextNode = nodePoitingToSimilar.details.nextNode;
          nodePoitingToSimilar.details.nextNode = newGhostNode.id;

          latestNodes.push(newGhostNode);
          newGhostColumns.push(newGhostNode.column);

          mainManager.edgeManagerInstance.updateTarget(nodePoitingToSimilar.id, similarNodeId, newGhostNode.id)
          mainManager.edgeManagerInstance.create(newGhostNode.id, similarNodeId)
        })

        //latestNodes.forEach(ln => {
        //  if (ln.id === similarNode.id) {
        //    ln.column = (mainManager.columnManagerInstance.getCentralColumn(newGhostColumns)).name;
        //  }
        //})
      }
    })

    let conditionalNodes = latestNodes.filter(node => node.type === nodeKeys.CONDITIONAL_KEY)
    if (conditionalNodes.length <= 0) { return latestNodes }
    conditionalNodes.forEach(cn => {
      let ghostLine = mainManager.lineManagerInstance.processConditionalGhostLine(cn.line);
      let nextNodes = (Array.isArray(cn.details.nextNode)) ? cn.details.nextNode : [cn.details.nextNode];

      if(nextNodes.length == 1){
        let possibleNextNodes = (latestNodes.find(n => n.id === nextNodes[0]))['details']['nextNode']
        nextNodes = possibleNextNodes.filter(n => !nodesWithSimilarity.includes(n))
      }

      nextNodes.forEach(nextNodeId => {
        let nextNode = latestNodes.find(node => node.id === nextNodeId);

        let newConditionalGhost = { id: idGenerator(), details: { "nextNode": nextNode.id }, type: nodeKeys.CONDITIONAL_GHOST, column: nextNode.column, line: ghostLine }

        latestNodes.push(newConditionalGhost);
        mainManager.edgeManagerInstance.updateTarget(cn.id, nextNodeId, newConditionalGhost.id)
        mainManager.edgeManagerInstance.create(newConditionalGhost.id, nextNodeId);
      })
    })

    return latestNodes;
  })
  updateNodesPositions(mainManager)
}

export const updateNodesPositions = (mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    let anyGhostNode = latestNodes.find(node => node.type === nodeKeys.GHOST);

    return latestNodes.map(node => {
      // if (node.type === nodeKeys.FINAL_KEY) {
      //   node.column = "central"
      // }

      node.position = {
        x: mainManager.columnManagerInstance.getColumnPosition(node.column),
        y: mainManager.lineManagerInstance.getLinePosition(node.line)
      }

      // if(node.data){
      //   node.data.label = node.line;
      // }else{
      //   node.data = { label: node.line }
      // }

      if (node.type === nodeKeys.START_KEY) { node.position.y -= 100 }
      if (node.type === nodeKeys.CONDITIONAL_KEY) { node.position.y -= 50 }
      if (node.type === nodeKeys.TASK_KEY || node.type === nodeKeys.NEW_KEY || node.type === nodeKeys.TEXT_KEY) { node.position.y -= 50 }
      if (node.type === nodeKeys.FINAL_KEY && anyGhostNode) { node.position.y -= 50 }

      return node
    })
  })
}

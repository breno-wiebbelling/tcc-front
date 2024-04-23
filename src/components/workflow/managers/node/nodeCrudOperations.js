import { idGenerator } from "../../../common/idManager";
import {
  nodeKeys,
  isNodeIdPresentOnNextNode,
  reprocessNextNodePosition,
  reprocessNodeColumns,
  updateNodesPositions,
  updateGhostPositions,
} from "../nodeManager";
import {
  create,
  updateNextNode,
  deleteById
} from "../../../../service/clients/nodeClient";

const processNextNodeForNewNode = (previousNode, mainManager) => {
  let nextNode = previousNode.details.nextNode;

  if(nextNode.includes('ghost')){
    mainManager.nodeManagerInstance.setNodes(ln => {
      nextNode = (ln.find(n => n.id === nextNode)).details.nextNode
      return ln;
    });
  }

  return nextNode;
}

const processNewNode = async (previousNode, mainManager, name) => {
  let baseNode = await create({
    name: name,
    simulation_id: mainManager.simulation_id,
    type: nodeKeys.NEW_KEY,
    details: {
      nextNode: processNextNodeForNewNode(previousNode, mainManager)
    }
  });

  baseNode.details.nextNode = previousNode.details.nextNode;

  return {
    ...baseNode,
    column: previousNode.column,
    line: mainManager.lineManagerInstance.process(previousNode.line),
    data: {
      label: baseNode.name,
      id: baseNode['_id'],
      simulationId: mainManager.simulation_id,
      click: mainManager.nodeManagerInstance.nodeClickEvents,
      details: baseNode.details,
      reload: mainManager.reload
    }
  }
}

export const addNodeBelow = async (fromNodeInformation, mainManager) => {
  let localNodes = []
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    localNodes = latestNodes;
    return latestNodes;
  })

  let currentNode = localNodes.find(node => node.id === fromNodeInformation.id);
  let newNodeBelow = await processNewNode(currentNode, mainManager, "Nova tarefa!")
  newNodeBelow.id = newNodeBelow._id;

  localNodes = await Promise.all(localNodes.map(async node => {
    if (node.id === fromNodeInformation.id) {
      await updateNextNode(node.id, newNodeBelow.id);
      node.details.nextNode = newNodeBelow.id;
    }
    return node;
  }));

  localNodes = [...localNodes, newNodeBelow];
  localNodes = reprocessNextNodePosition(currentNode, localNodes, mainManager);

  mainManager.edgeManagerInstance.updateSource(currentNode.id, newNodeBelow.details.nextNode, newNodeBelow.id);
  mainManager.edgeManagerInstance.create(currentNode.id, newNodeBelow.id)
  mainManager.nodeManagerInstance.setNodes(localNodes);

  updateGhostPositions(mainManager)
  updateNodesPositions(mainManager)

  return localNodes;
}

export const addNodeAbove = async (fromNodeInformation, mainManager) => {
  let localNodes = [];
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    localNodes = latestNodes;
    return latestNodes;
  });

  let currentNode = localNodes.find(node => node.id === fromNodeInformation.id);
  let newNode = await processNewNode({ ...currentNode, details: { nextNode: currentNode.id } }, mainManager, "Nova tarefa!")
  newNode.id = newNode._id;

  if (currentNode.type === nodeKeys.FINAL_KEY) {
    let baseLine = mainManager.lineManagerInstance.getBaseLine(currentNode.line);
    newNode.line = mainManager.lineManagerInstance.process(baseLine.baseLine);
  } else {
    let baseLine = mainManager.lineManagerInstance.getBaseLine(currentNode.line);
    newNode.line = mainManager.lineManagerInstance.process(baseLine.name);
  }

  localNodes.map(async node => {
    if (isNodeIdPresentOnNextNode(currentNode.id, node)) {
      if (node.type === nodeKeys.CONDITIONAL_KEY) {
        let indexOfNextNode = node.details.nextNode.indexOf(currentNode.id);
        let tempNode = node.details.nextNode;
        tempNode[indexOfNextNode] = newNode.id;
        await updateNextNode(node.id, tempNode);
      }
      else if(node.type === nodeKeys.CONDITIONAL_GHOST){
        node.details.nextNode = newNode.id;
      }
      else {
        await updateNextNode(node.id, newNode.id);
        node.details.nextNode = newNode.id;
      }
    }

    return node;
  })

  localNodes = [...localNodes, newNode];
  localNodes = reprocessNextNodePosition(newNode, localNodes, mainManager);

  mainManager.nodeManagerInstance.setNodes(localNodes);

  updateGhostPositions(mainManager)
  updateNodesPositions(mainManager)
}

export const addConditionalLeg = (fromNodeInformation, mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    latestNodes = latestNodes.filter(node => !node.type.includes(nodeKeys.GHOST))
    latestNodes = latestNodes.filter(node => !node.type.includes(nodeKeys.CONDITIONAL_GHOST))

    let final_node = latestNodes.find(node => node.type === nodeKeys.FINAL_KEY);
    let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);
    let newNodeId = idGenerator();
    //TODO
    let newNode = { id: newNodeId, type: nodeKeys.NEW_KEY, data: { label: newNodeId, id: newNodeId, click: mainManager.nodeManagerInstancenodeClickEvents }, details: { nextNode: final_node.id }, line: mainManager.lineManagerInstance.process(currentNode.line) }

    currentNode.details.nextNode.push(newNode.id);
    latestNodes.push(newNode)
    mainManager.edgeManagerInstance.create(currentNode.id, newNode.id)
    latestNodes = reprocessNodeColumns(mainManager.initialNode, latestNodes);

    return latestNodes;
  })
}

export const deleteNode = async (nodeInformation, mainManager) => {
  let currentNodes;
  
  mainManager.nodeManagerInstance.setNodes((latestNodes) => {
    currentNodes = latestNodes;

    return latestNodes;
  });

  nodeInformation = currentNodes.find(node => node.id === nodeInformation.id);
  
  
  await deleteById(nodeInformation.id);
  
  let newNextNode = processNextNodeForNewNode(nodeInformation, mainManager);
  let parentNode = currentNodes.find(node => isNodeIdPresentOnNextNode(nodeInformation.id, node));

  //TODO: delete all nodes until cond. closure
  if (nodeInformation.type === nodeKeys.CONDITIONAL_KEY) {
    let conditionalClosure = getConditionalClosure(nodeInformation.id, currentNodes);
    newNextNode = (currentNodes.find(cn => cn.id === conditionalClosure.details.nextNode)).id
  }

  if (parentNode.type === nodeKeys.CONDITIONAL_KEY) {
    
    let previousIndex = parentNode.details.nextNode.indexOf(nodeInformation.id);
    let nextNode;
    if(nodeInformation.type === nodeKeys.CONDITIONAL_KEY){
      nextNode = getConditionalClosure(nodeInformation.id, currentNodes);
    }else{
      nextNode = currentNodes.find(cn => cn.id === nodeInformation.details.nextNode);
    }

    if(nextNode.type === nodeKeys.GHOST){
      if (parentNode.details.conditionalDetails.type === 'boolean') {
        
        let newNode = await processNewNode({ ...nodeInformation, details: { nextNode: nextNode.details.nextNode } }, mainManager, "Tarefa temporária!");
        parentNode.details.nextNode[previousIndex] = newNode['_id'];
        newNextNode = parentNode.details.nextNode; 
      }
      else {
        //TODO: REMOVE SWITCH OPTION
      }
    }
    else{
      parentNode.details.nextNode[previousIndex] = nextNode.id;
      newNextNode = parentNode.details.nextNode; 
    }
  }
  
  
  await updateNextNode(parentNode.id, newNextNode);
  await mainManager.reload();
  
  return
}

export const findNodeFrequencies = (given_nodes) => {
  let processedNodes = [];
  let nodeFrequencyRegistrator = [];

  let nodeWasNotProcessed = false;
  let nodeIsNotOnNodeFrequency = false;

  const verifyAndProcessNodeFrequency = (nodeId) => {
    nodeWasNotProcessed = !processedNodes.includes(nodeId)
    nodeIsNotOnNodeFrequency = !nodeFrequencyRegistrator.includes(nodeId);

    if (nodeWasNotProcessed) {
      processedNodes.push(nodeId);
      return;
    }

    if (nodeIsNotOnNodeFrequency) {
      nodeFrequencyRegistrator.push(nodeId);
      return;
    }
  }

  given_nodes.forEach(node => {

    if ([nodeKeys.CONDITIONAL_GHOST, nodeKeys.GHOST].includes(node.type)) { return }

    if (node.type === nodeKeys.CONDITIONAL_KEY) {
      node.details.nextNode.forEach(nextNodeId => { verifyAndProcessNodeFrequency(nextNodeId) });

      return;
    }

    verifyAndProcessNodeFrequency(node.details.nextNode)
  });

  return nodeFrequencyRegistrator;
}

export const updateAfterFinish = (mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {

    latestNodes = latestNodes.map(node => {
      if (node.type === nodeKeys.NEW_KEY) {
        node.type = nodeKeys.TASK_KEY;
      }

      return node
    })

    return latestNodes;
  })

  updateNodesPositions(mainManager);

  return
}

const getConditionalClosure = (conditionalId, givenNodes) => {
  let conditionalNode = givenNodes.find(gn => gn.id === conditionalId);

  if (conditionalNode.type != nodeKeys.CONDITIONAL_KEY) {
    conditionalNode = givenNodes.find(gn => gn.id === conditionalNode.details.nextNode);
  }

  return findMeetPoint(conditionalNode, givenNodes, [], conditionalNode.details.nextNode.length);
}

function findMeetPoint(currentNode, givenNodes, verifiedPoints, meetSize) {
  if (currentNode.type === nodeKeys.FINAL_KEY) {
    return null;
  }

  if (Array.isArray(currentNode.details.nextNode)) {
    for (let n of currentNode.details.nextNode) {
      let nextNode = givenNodes.find(gn => gn.id === n);
      let meetPointResult = findMeetPoint(nextNode, givenNodes, verifiedPoints, meetSize, nodeKeys);
      if (meetPointResult !== null) {
        return meetPointResult;
      }
    }
  } else {
    verifiedPoints.push(currentNode.id);

    if (verifyPoint(currentNode.id, verifiedPoints, meetSize)) {
      return currentNode;
    } else {
      verifiedPoints.push(currentNode.details.nextNode);
      return findMeetPoint(givenNodes.find(gn => gn.id === currentNode.details.nextNode), givenNodes, verifiedPoints, meetSize, nodeKeys);
    }
  }

  return null;
}

const verifyPoint = (currentPointId, verifiedPoints, meetSize) => {
  return verifiedPoints.includes(currentPointId) && verifyMeetClosure(verifiedPoints, currentPointId, meetSize);
};

const verifyMeetClosure = (verifiedPoints, currentPointId, meetSize) => {
  return verifiedPoints.filter(vp => vp === currentPointId).length === meetSize;
};

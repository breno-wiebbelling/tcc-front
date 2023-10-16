import { idGenerator } from "../../../common/idManager";
import { 
  nodeKeys, 
  isNodeIdPresentOnNextNode, 
  reprocessNextNode, 
  reprocessNodeColumns,
  updateNodesPositions, 
  updateGhostPositions 
} from "../nodeManager";

const formatNewNode = (previousNode, mainManager) => {
  let newNodeId = idGenerator();

  return {  
    id: newNodeId, 
    type: nodeKeys.NEW_KEY,
    column: previousNode.column, 
    line: mainManager.lineManagerInstance.process(previousNode.line),
    details: { 
      nextNode: previousNode.details.nextNode 
    },
    data: { 
      label: newNodeId, 
      id:newNodeId, 
      click: mainManager.nodeManagerInstance.nodeClickEvents 
    }, 
  }
}

export const addNodeBelow = (fromNodeInformation, mainManager) => {

  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);
    let newNode = formatNewNode(currentNode, mainManager);
    
    latestNodes = latestNodes.map(node => {
      if(node.id === fromNodeInformation.id) { 
        node.details.nextNode = newNode.id; 
      }
      return node;
    })
    latestNodes = [...latestNodes, newNode];
    latestNodes = reprocessNextNode(currentNode, latestNodes, mainManager);

    mainManager.edgeManagerInstance.updateSource(currentNode.id, newNode.details.nextNode, newNode.id);
    mainManager.edgeManagerInstance.create(currentNode.id, newNode.id)

    return latestNodes;
  });

  updateGhostPositions(mainManager)
  updateNodesPositions(mainManager)
}

export const addNodeAbove = (fromNodeInformation, mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);
    let newNode = formatNewNode({ ...currentNode, details: { nextNode: currentNode.id } }, mainManager)

    if(currentNode.type === nodeKeys.FINAL_KEY){
      let baseLine = mainManager.lineManagerInstance.getBaseLine(currentNode.line);
      newNode.line = mainManager.lineManagerInstance.process(baseLine.name);
    }else{
      currentNode.line = mainManager.lineManagerInstance.process(currentNode.line);
    }

    latestNodes = latestNodes.map(node => {
      if(isNodeIdPresentOnNextNode(currentNode.id, node)){
        mainManager.edgeManagerInstance.updateTarget(node.id, currentNode.id, newNode.id);

        if( node.type === nodeKeys.CONDITIONAL_KEY ){
          let indexOfNextNode = node.details.nextNode.indexOf(currentNode.id);
          node.details.nextNode[indexOfNextNode] = newNode.id;
        }
        else{
          node.details.nextNode = newNode.id;
        }
      }
      
      return node;
    });
    latestNodes = [...latestNodes, newNode];
    latestNodes = reprocessNextNode(newNode, latestNodes, mainManager);

    mainManager.edgeManagerInstance.create(newNode.id, currentNode.id)
    return latestNodes;
  });

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
    let newNode = { id: newNodeId, type: nodeKeys.NEW_KEY, data: { label: newNodeId, id:newNodeId, click: mainManager.nodeManagerInstancenodeClickEvents }, details: { nextNode: final_node.id }, line: mainManager.lineManagerInstance.process(currentNode.line) }

    currentNode.details.nextNode.push(newNode.id);
    latestNodes.push(newNode)
    mainManager.edgeManagerInstance.create(currentNode.id, newNode.id)
    latestNodes = reprocessNodeColumns(mainManager.initialNode, latestNodes);

    return latestNodes;
  })
  // reloadNodesAndAddGhostNodes()
}

export const deleteNode = (nodeInformation, mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    let removedNodeIndex = latestNodes.findIndex(node => node.id === nodeInformation.id);
    let removedNode = latestNodes[removedNodeIndex];
    let previousNodes = latestNodes.filter(node => isNodeIdPresentOnNextNode(nodeInformation.id, node));

    if(removedNode){

      mainManager.edgeManagerInstance.remove(removedNode.id, removedNode.details.nextNode);
      latestNodes.splice(removedNodeIndex, 1);   
      
      previousNodes.forEach(previousNode => {
        if(previousNode.type === nodeKeys.CONDITIONAL_KEY){
          let nextNodes = previousNode.details.nextNode;
          nextNodes[nextNodes.indexOf(removedNode.id)] = removedNode.details.nextNode;
        }
        else{
          previousNode.details.nextNode = removedNode.details.nextNode;
          mainManager.edgeManagerInstance.updateTarget(previousNode.id, removedNode.id, removedNode.details.nextNode);
        }
        latestNodes = reprocessNextNode(previousNode, latestNodes, mainManager)
      })
  
    }

    return latestNodes;
  })

  updateGhostPositions(mainManager);
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    mainManager.lineManagerInstance.lines.forEach(line => {
      if( !latestNodes.find(node => node.line === line.name) && line.name !== mainManager.lineManagerInstance.first_line_name ){
        mainManager.lineManagerInstance.remove(line.name);
      }
    })

    return latestNodes;
  })
  updateNodesPositions(mainManager);
}

export const findNodeFrequencies  = (given_nodes) => {
  let processedNodes = [];
  let nodeFrequencyRegistrator = [];

  let nodeWasNotProcessed = false;
  let nodeIsNotOnNodeFrequency = false;

  const verifyAndProcessNodeFrequency = (nodeId) => {
    nodeWasNotProcessed = !processedNodes.includes(nodeId)
    nodeIsNotOnNodeFrequency = !nodeFrequencyRegistrator.includes(nodeId);

    if( nodeWasNotProcessed ){
      processedNodes.push(nodeId);
      return;
    }

    if( nodeIsNotOnNodeFrequency ){
      nodeFrequencyRegistrator.push(nodeId);
      return;
    }
  }

  given_nodes.forEach(node => {

    if([nodeKeys.CONDITIONAL_GHOST, nodeKeys.GHOST].includes(node.type)){ return }

    if(node.type === nodeKeys.CONDITIONAL_KEY){
      node.details.nextNode.forEach(nextNodeId => { verifyAndProcessNodeFrequency(nextNodeId) });

      return;
    }

    verifyAndProcessNodeFrequency(node.details.nextNode)    
  });

  return nodeFrequencyRegistrator;
}

export const updateAfterFinish = (newNode, mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {

    latestNodes = latestNodes.map(node => {
      if(node.type === nodeKeys.NEW_KEY){
        node.type = nodeKeys.TASK_KEY;
      }

      return node
    })

    return latestNodes;
  })

  updateNodesPositions(mainManager);
  
  return
}
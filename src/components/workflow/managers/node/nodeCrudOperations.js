import { idGenerator } from "../../../common/idManager";
import { 
  nodeKeys, 
  isNodeIdPresentOnNextNode, 
  reprocessNextNode, 
  reprocessNodeColumns,
  updateNodesPositions, 
  updateGhostPositions,
} from "../nodeManager";
import {
  create,
  updateNextNode,
  deleteById
} from "../../../../service/clients/nodeClient";

const processNewNode = async (previousNode, mainManager) => {

  let baseNode = await create({  
    name: "New Node",
    simulation_id: mainManager.simulation_id,
    type: nodeKeys.NEW_KEY,
    details: { 
      nextNode: previousNode.details.nextNode 
    }
  });

  return { 
    ...baseNode, 
    column: previousNode.column, 
    line: mainManager.lineManagerInstance.process(previousNode.line),
    data: { 
      label: baseNode.name, 
      id:baseNode['_id'], 
      click: mainManager.nodeManagerInstance.nodeClickEvents 
    }
  } 
}

export const addNodeBelow = (fromNodeInformation, mainManager) => {

  mainManager.nodeManagerInstance.setNodes( function(latestNodes){

    let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);

    processNewNode(currentNode, mainManager)
      .then(
        newNode => {
          newNode.id = newNode._id;
          mainManager.nodeManagerInstance.setNodes(
            latestNodes => {
              latestNodes = latestNodes.map(node => {
                if(node.id === fromNodeInformation.id) { 
                  node.details.nextNode = updateNextNode(node.id, newNode.id);
                  node.details.nextNode = newNode.id; 
                }
                return node;
              });
          
              latestNodes = [...latestNodes, newNode];
              latestNodes = reprocessNextNode(currentNode, latestNodes, mainManager);
          
              mainManager.edgeManagerInstance.updateSource(currentNode.id, newNode.details.nextNode, newNode.id);
              mainManager.edgeManagerInstance.create(currentNode.id, newNode.id)
              
              return latestNodes;
            }
          )
        }
      )
      .then( 
        () => {
          updateGhostPositions(mainManager)
          updateNodesPositions(mainManager)
        }
      )

    return latestNodes;
  })

}

export const addNodeAbove = (fromNodeInformation, mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);
    let newNode = processNewNode({ ...currentNode, details: { nextNode: currentNode.id } }, mainManager)

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
}

export const deleteNode = async (nodeInformation, mainManager) => {
  let currentNodes;

  mainManager.nodeManagerInstance.setNodes((latestNodes) => {
    currentNodes = latestNodes;

    return latestNodes;
  });
  nodeInformation = currentNodes.filter(node => node.id === nodeInformation.id)[0];
  let parentNode = currentNodes.filter(node => isNodeIdPresentOnNextNode(nodeInformation.id, node))[0]

  await deleteById(nodeInformation.id);

  await updateNextNode(parentNode.id, nodeInformation.details.nextNode, nodeInformation.id);
  await mainManager.reload();
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

export const updateAfterFinish = (mainManager) => {
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
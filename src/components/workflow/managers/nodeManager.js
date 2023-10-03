import ConditionalNode from '../nodes/types/conditional/CustomConditionalNode'; 
import InputNode from '../nodes/types/input/CustomInputNode'; 
import DefaultNode from '../nodes/types/default/CustomDefaultNode'; 
import OutputNode from '../nodes/types/output/CustomOutputNode';
import GhostNode from '../nodes/types/ghost/CustomeGhostNode'

//common
export const nodeKeys = {
  GHOST:"ghost",
  FINAL_KEY:"final",
  TASK_KEY:"task",
  START_KEY:"start",
  CONDITIONAL_KEY:"conditional",
  CONDITIONAL_GHOST:"conditional_ghost"
};

export const nodeTypes = { 
  conditional:ConditionalNode, 
  start:InputNode, 
  task:DefaultNode,
  final:OutputNode, 
  ghost:GhostNode,
  conditional_ghost:GhostNode
};

export const nodeCRUDOperations = {
  ADD_BELOW:"new_node_below",
  CONDITIONAL_KEY:"new_leg",
  ADD_ABOVE:"new_node_above"
}

//util
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

export const isNodeIdPresentOnNextNode = (nodeId, nodeToVerify) => {
  return (nodeToVerify.details.nextNode === (nodeId))
  ||(nodeToVerify.type === nodeKeys.CONDITIONAL_KEY && nodeToVerify.details.nextNode.includes(nodeId))
}

//position
export const updateNodesPositions = (setNodes, lineManagerInstance, columnManagerInstance) => {
  setNodes(latestNodes => {
    let anyGhostNode = latestNodes.find(node => node.type === nodeKeys.GHOST);

    return latestNodes.map(node => {

      if(node.type === nodeKeys.FINAL_KEY){
        node.data.label = node.line;
      }

      node.position = {
        x : columnManagerInstance.getColumnPosition(node.column),
        y : lineManagerInstance.getLinePosition(node.line)
      }

      if(node.type === nodeKeys.START_KEY) { node.position.y -= 100 }
      if(node.type === nodeKeys.CONDITIONAL_KEY) { node.position.y -= 50 }
      if(node.type === nodeKeys.TASK_KEY) { node.position.y -= 50 }
      if(node.type === nodeKeys.FINAL_KEY && anyGhostNode ) { node.position.y -= 100 }

      return node
    }) 
  })
} 


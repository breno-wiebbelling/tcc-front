import { useState } from 'react';

import ConditionalNode from '../nodes/types/conditional/CustomConditionalNode'; 
import InputNode from '../nodes/types/input/CustomInputNode'; 
import DefaultNode from '../nodes/types/default/CustomDefaultNode'; 
import OutputNode from '../nodes/types/output/CustomOutputNode';
import GhostNode from '../nodes/types/ghost/CustomeGhostNode';
import NewNode from '../nodes/types/new/CustomNewNode';

import { deleteNode, addNodeBelow, addNodeAbove, addConditionalLeg, updateAfterFinish, findNodeFrequencies } from './node/nodeCrudOperations';
import { reprocessNextNode, reprocessNodeColumns, updateGhostPositions, isNodeIdPresentOnNextNode, updateNodesPositions, reloadNodesAndAddGhostNodes } from './node/nodePositionOperations';

export {
  reprocessNextNode, 
  updateGhostPositions, 
  isNodeIdPresentOnNextNode, 
  updateNodesPositions, 
  reloadNodesAndAddGhostNodes,
  reprocessNodeColumns,
  findNodeFrequencies,
}

export const nodeKeys = {
  GHOST:"ghost",
  FINAL_KEY:"final",
  TASK_KEY:"task",
  START_KEY:"start",
  CONDITIONAL_KEY:"conditional",
  CONDITIONAL_GHOST:"conditional_ghost",
  NEW_KEY:"new_node"
};

export const nodeCRUDOperations = {
  ADD_BELOW:"new_node_below",
  CONDITIONAL_KEY:"new_leg",
  ADD_ABOVE:"new_node_above"
}

export default (initialNodes, mainManager, nodeClickEvents, simulationId) => {

  const [nodes, setNodes] = useState([]);
  const [parentNode] = useState({ column: mainManager.columnManagerInstance.central_column_name, line: mainManager.columnManagerInstance.first_line_name });

  const library = {};

  library.nodes = nodes;
  library.setNodes = setNodes;
  library.parentNode = parentNode;

  library.updateParentNode = ( newParentNode, mainManager ) => {
    library.parentNode.column = newParentNode.column;
    library.parentNode.line = newParentNode.line;
  }

  library.nodeTypes = { 
    conditional:ConditionalNode, 
    start:InputNode, 
    task:DefaultNode,
    final:OutputNode, 
    ghost:GhostNode,
    conditional_ghost:GhostNode,
    new_node:NewNode
  };

  library.nodeCRUDOperations = nodeCRUDOperations;

  library.nodeClickEvents = {
    ...nodeClickEvents,
    addNode:(mode, nodeInformation) => {
      switch (mode) {
        case library.nodeCRUDOperations.ADD_BELOW:
          addNodeBelow(nodeInformation, mainManager);
          break;
        
        case library.nodeCRUDOperations.ADD_ABOVE:
          addNodeAbove(nodeInformation, mainManager);
          break;

        case library.nodeCRUDOperations.CONDITIONAL_KEY:
          addConditionalLeg(nodeInformation, mainManager)
          break;

        default:
          break;
      }
      
      nodeClickEvents.newNode(() => { updateAfterFinish(mainManager) });
    },
    deleteNode: (nodeInformation) => { deleteNode(nodeInformation, mainManager) }
  }

  library.processNode = (currentNodeId, mainManager) => {
    let currentNodeIndex = initialNodes.findIndex(node => node._id === currentNodeId);

    if( currentNodeIndex>=0 ){
      
      let currentNode = initialNodes[currentNodeIndex];
      switch (currentNode.type){
  
        case nodeKeys.START_KEY:
          currentNode.column = mainManager.columnManagerInstance.central_column_name;
          currentNode.line = mainManager.lineManagerInstance.first_line_name;
        
        case nodeKeys.TASK_KEY:
          currentNode.column = parentNode.column;
          currentNode.line = mainManager.lineManagerInstance.process(parentNode.line);
  
        case nodeKeys.START_KEY: case nodeKeys.TASK_KEY:
          mainManager.edgeManagerInstance.create(currentNode.id, currentNode.details.nextNode);
          library.updateParentNode(currentNode, mainManager);
          library.processNode(currentNode.details.nextNode, mainManager);
          break;
  
        case nodeKeys.CONDITIONAL_KEY:
          let prev_parentNode = currentNode;
          currentNode.column = parentNode.column;
          currentNode.line = mainManager.lineManagerInstance.process(parentNode.line);
  
          currentNode.details.nextNode.forEach((conditionalLegId, index) => {
            let columnNameForFollowingChild = mainManager.columnManagerInstance.create( index, currentNode.details.nextNode.length, currentNode.column );
  
            library.updateParentNode({ column: columnNameForFollowingChild, line: currentNode.line }, mainManager);
            mainManager.edgeManagerInstance.create( prev_parentNode.id, conditionalLegId );
            library.processNode(conditionalLegId, mainManager);
          })
          
          library.updateParentNode(prev_parentNode, mainManager)
          break;
  
        case nodeKeys.FINAL_KEY:
          currentNode.column = mainManager.columnManagerInstance.central_column_name;
          currentNode.line = mainManager.lineManagerInstance.last_line_name;
          break;
      }
  

      currentNode.data = {
        label:currentNode.name,
        id:currentNode._id,
        click:library.nodeClickEvents
      }
      
      setNodes((latest) => { return [...latest, currentNode] })
      initialNodes.splice(currentNodeIndex, 1);
    }
  } 

  return library;
}

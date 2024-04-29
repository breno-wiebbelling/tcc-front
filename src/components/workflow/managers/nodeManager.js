import { useState } from 'react';

import ConditionalNode from '../nodes/types/conditional/CustomConditionalNode'; 
import InputNode from '../nodes/types/input/CustomInputNode'; 
import DefaultNode from '../nodes/types/default/CustomDefaultNode'; 
import TextNode from '../nodes/types/text/CustomTextNode'; 
import OutputNode from '../nodes/types/output/CustomOutputNode';
import GhostNode from '../nodes/types/ghost/CustomeGhostNode';
import NewNode from '../nodes/types/new/CustomNewNode';

import { deleteNode, addNodeBelow, addNodeAbove, addConditionalLeg, updateAfterFinish, findNodeFrequencies } from './node/nodeCrudOperations';
import { reprocessNextNodePosition, reprocessNodeColumns, updateGhostPositions, isNodeIdPresentOnNextNode, updateNodesPositions, reloadNodesAndAddGhostNodes } from './node/nodePositionOperations';

export {
  reprocessNextNodePosition, 
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
  TEXT_KEY: "text",
  CONDITIONAL_KEY:"conditional",
  CONDITIONAL_GHOST:"conditional_ghost",
  NEW_KEY:"new_node"
};

export const nodeCRUDOperations = {
  ADD_BELOW:"new_node_below",
  CONDITIONAL_KEY:"new_leg",
  ADD_ABOVE:"new_node_above"
}

export default (initialNodes, mainManager, nodeClickEvents) => {

  const [nodes, setNodes] = useState([]);
  const library = {};

  library.nodes = nodes;
  library.setNodes = setNodes;
  library.parentNode = { column: mainManager.columnManagerInstance.central_column_name, line: mainManager.lineManagerInstance.first_line_name };
  library.initialNodes = initialNodes;

  library.updateParentNode = (newParentNode) => { 
    library.parentNode.column = newParentNode.column; 
    library.parentNode.line = newParentNode.line;
  }
  library.conditionalClosures = []

  library.nodeTypes = { 
    conditional:ConditionalNode,
    start:InputNode,
    task:DefaultNode,
    text:TextNode,
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
    },
    deleteNode: (nodeInformation) => { deleteNode(nodeInformation, mainManager) }
  }

  library.processNode = (currentNodeId, mainManager) => {
    let currentNodeIndex = library.initialNodes.findIndex(node => node._id === currentNodeId);

    if( currentNodeIndex>=0 ){
      let currentNode = library.initialNodes[currentNodeIndex];

      if(library.conditionalClosures.find(cc => cc['closure'] === currentNodeId)){
        
        library.conditionalClosures.forEach(cc => {
          if(cc['closure'] === currentNodeId){
            if(mainManager.lineManagerInstance.getLinePosition(library.parentNode.line) 
                > mainManager.lineManagerInstance.getLinePosition(cc.line)
            ){
              cc.line = library.parentNode.line;
            }
          }
        })

        return 
      }

      switch (currentNode.type){
        case nodeKeys.FINAL_KEY:
          currentNode.column = mainManager.columnManagerInstance.central_column_name;
          currentNode.line = mainManager.lineManagerInstance.last_line_name;
          break;

        case nodeKeys.START_KEY:
          currentNode.column = mainManager.columnManagerInstance.central_column_name;
          currentNode.line = mainManager.lineManagerInstance.first_line_name;
        
        case nodeKeys.TASK_KEY: case nodeKeys.TEXT_KEY: case nodeKeys.NEW_KEY:
          currentNode.column = library.parentNode.column;
          currentNode.line = mainManager.lineManagerInstance.process(library.parentNode.line);
  
        case nodeKeys.START_KEY: case nodeKeys.TEXT_KEY: case nodeKeys.TASK_KEY: case nodeKeys.NEW_KEY:
          mainManager.edgeManagerInstance.create(currentNode.id, currentNode.details.nextNode);
          library.updateParentNode(currentNode, mainManager);
          library.processNode(currentNode.details.nextNode, mainManager);
          break;
  
        case nodeKeys.CONDITIONAL_KEY:
          let prev_parentNode = currentNode;
          currentNode.column = library.parentNode.column;
          currentNode.line = mainManager.lineManagerInstance.process(library.parentNode.line);
          library.conditionalClosures.push({ id: currentNode.id, closure:currentNode.details.conditionalClosure, column: currentNode.column, line: currentNode.line });

          let conditionalLegId;
          for(let li = 0; li<currentNode.details.nextNode.length; li++){
            conditionalLegId = currentNode.details.nextNode[li];
            
            if(conditionalLegId !== currentNode.details.conditionalClosure){
              let columnNameForFollowingChild = mainManager.columnManagerInstance.create(li, currentNode.details.nextNode.length, currentNode.column, Object.keys(library.conditionalClosures).length > 1);
              library.updateParentNode({ column: columnNameForFollowingChild, line: currentNode.line }, mainManager);
              mainManager.edgeManagerInstance.create( prev_parentNode.id, conditionalLegId );
              library.processNode(conditionalLegId, mainManager);
            }
          }

          let closure = library.conditionalClosures.find(cc => cc['id'] === currentNode.id);
          let currentClosureLinePosition = mainManager.lineManagerInstance.getLinePosition(closure.line);
          let currentParentLinePosition  = mainManager.lineManagerInstance.getLinePosition(library.parentNode.line);
          let lowerParentLine = (currentClosureLinePosition > currentParentLinePosition) ? closure.line : library.parentNode.line;

          library.updateParentNode({ column: closure.column, line: lowerParentLine });
          library.conditionalClosures = library.conditionalClosures.filter(cc => cc['id'] !== currentNode.id);
          library.processNode(currentNode.details.conditionalClosure, mainManager);
          
          break;
      }

      currentNode.data = {
        label: currentNode.name,
        id: currentNode._id,
        type: currentNode.type,
        details: currentNode.details,
        click: library.nodeClickEvents,
        reload: mainManager.reload
      }
      
      setNodes((latest) => { return [...latest, currentNode] })
      library.initialNodes.splice(library.initialNodes.findIndex(node => node._id === currentNodeId), 1);
    }

    return 
  } 

  library.reset = async (newInitialNodes, mainManagerLibrary) => {
    library.updateParentNode({ column: mainManagerLibrary.columnManagerInstance.central_column_name, line: mainManagerLibrary.lineManagerInstance.first_line_name })
    
    newInitialNodes.forEach(tempInitialNode => {
      tempInitialNode.id = tempInitialNode["_id"];
    })
    library.initialNodes = newInitialNodes
    library.setNodes([]);

    library.processNode(mainManagerLibrary.initialNode, mainManagerLibrary)
    reloadNodesAndAddGhostNodes(mainManagerLibrary);
  }

  return library;
}

import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import StyledSimulation from "./styled"
import { white } from "../common/style/index"

import ColumnManager from "./managers/columnManager";
import EdgesManager from "./managers/edgeManager";
import LineManager, { first_line_name, last_line_name } from "./managers/lineManager";
import { idGenerator } from "../common/idManager"
import { 
  nodeKeys, nodeTypes, 
  findNodeFrequencies, updateNodesPositions, nodeCRUDOperations,
  isNodeIdPresentOnNextNode
} 
from './managers/nodeManager';

export default ({ initialNodes, initialNode, isInfoPanelOpen, nodeClickEvents }) => {

  const [nodes, setNodes] = useState([]);
  const edgesManagerInstance = EdgesManager();
  const columnManagerInstance = ColumnManager();
  const lineManagerInstance = LineManager();
  const [parentNode] = useState({ column: columnManagerInstance.central_column_name, line:first_line_name });

  const updateParentNode = ( newParentNode ) => {
    parentNode.column = newParentNode.column;
    parentNode.line = newParentNode.line;
  }

  const updateGhostPositions = () => {
    setNodes(latestNodes => {

      let conditionalGhosts = latestNodes.filter(node => node.type === nodeKeys.CONDITIONAL_GHOST)
      conditionalGhosts.forEach(conditionalGhost => {
        latestNodes = reprocessNextNode(conditionalGhost, latestNodes);
      })

      let ghostNodes = latestNodes.filter(node => node.type === nodeKeys.GHOST );
      if(ghostNodes.length <= 0){ return latestNodes }

      let correctGhost = ghostNodes[0];
      let correctGhostPosition = lineManagerInstance.getLinePosition(correctGhost.line);
      
      let new_ghostPosition;

      ghostNodes.forEach(new_ghost => {
        new_ghostPosition = lineManagerInstance.getLinePosition(new_ghost.line);

        if(new_ghostPosition > correctGhostPosition){
          correctGhost = new_ghost;
          correctGhostPosition = new_ghostPosition;
        }
      })

      ghostNodes.forEach(ghostNode => { ghostNode.line = correctGhost.line; })
      
      latestNodes = reprocessNextNode(correctGhost, latestNodes)

      return latestNodes;
    })
  }

  const reloadNodesAndAddGhostNodes = () => {
    setNodes(latestNodes => {
      let conditionalNodes = latestNodes.filter(node => node.type === nodeKeys.CONDITIONAL_KEY)

      if(conditionalNodes.length<=0) { return latestNodes }
      conditionalNodes.forEach(conditionalNode => {
        let ghostLine = lineManagerInstance.processConditionalGhostLine(conditionalNode.line);

        conditionalNode.details.nextNode.forEach(nextNodeId => {
          let nextNode = latestNodes.find(node => node.id === nextNodeId);
          let newConditionalGhost = { id: idGenerator(), details: {"nextNode":nextNode.id}, type: nodeKeys.CONDITIONAL_GHOST, column:nextNode.column, line:ghostLine }
          
          latestNodes.push(newConditionalGhost);
          edgesManagerInstance.updateTarget(conditionalNode.id, nextNodeId, newConditionalGhost.id)
          edgesManagerInstance.create(newConditionalGhost.id, nextNodeId);
        })

      })

      let nodesWithSimilarity = findNodeFrequencies(latestNodes);
      nodesWithSimilarity.forEach(similarNodeId => {
        let similarNode = latestNodes.find(node => node.id === similarNodeId);
        let ghostLine = lineManagerInstance.processGhostLine(similarNode.line);

        let nodesPoitingToSimilarNode = latestNodes.filter(node => isNodeIdPresentOnNextNode(similarNodeId, node))
        nodesPoitingToSimilarNode.forEach(nodePoitingToSimilar => {

          let newGhostNode  = { id: idGenerator(), details: {"nextNode":nodePoitingToSimilar.details.nextNode}, type: nodeKeys.GHOST, column:nodePoitingToSimilar.column, line:ghostLine }
          nodePoitingToSimilar.details.nextNode = newGhostNode.id;
          
          latestNodes.push(newGhostNode);
          edgesManagerInstance.updateTarget(nodePoitingToSimilar.id, similarNodeId, newGhostNode.id)
          edgesManagerInstance.create(newGhostNode.id, similarNodeId)
        })
      })

      return latestNodes;
    })

    updateNodesPositions(setNodes, lineManagerInstance, columnManagerInstance)
  }  

  const reprocessNodeOnNextPosition = (currentNode, currentNodes) => {
    if(currentNode.type === nodeKeys.FINAL_KEY) { return currentNodes }

    let nextNode = currentNodes.find(node => (node.line === currentNode.line && node.column === currentNode.column && node.id != currentNode.id ));

    if(!nextNode && currentNode.type === nodeKeys.CONDITIONAL_KEY){
      let nextLine = lineManagerInstance.process(currentNode.line);
      let nextNode = currentNodes.find(node => ( node.line === nextLine && node.column === currentNode.column && node.id != currentNode.id && node.type === nodeKeys.CONDITIONAL_GHOST ));

      while(!nextNode){
        nextLine = lineManagerInstance.process(nextLine);
        nextNode = currentNodes.find(node => ( node.line === nextLine && node.column === currentNode.column && node.id != currentNode.id && node.type === nodeKeys.CONDITIONAL_GHOST ));
      }

      nextNode.line = nextLine;
      return nextNode;
    }

    nextNode.line = lineManagerInstance.process(currentNode.line);
    return nextNode;
  }

  const reprocessNextNode = (currentNode, currentNodes) => {
    if(currentNode.type === nodeKeys.FINAL_KEY){ return currentNodes }

    let nextNodes = currentNodes.filter(node => isNodeIdPresentOnNextNode(node.id, currentNode));
    let nextNode = nextNodes[0];

    if(nodeKeys.FINAL_KEY === nextNode.type) { return currentNodes };

    nextNode.line = lineManagerInstance.process(currentNode.line);

    if(nextNode.type === nodeKeys.CONDITIONAL_KEY){
      nextNode.details.nextNode.forEach(nextNodeId => {
        let nextConditionalNode = currentNodes.find(node => node.id === nextNodeId);
        let conditionalGhostNode = reprocessNodeOnNextPosition( {...nextNode, column:nextConditionalNode.column }, currentNodes )

        nextConditionalNode.line = lineManagerInstance.process(conditionalGhostNode.line);
        currentNodes = reprocessNextNode(nextConditionalNode, currentNodes);
      })
      
      return currentNodes
    }

    return reprocessNextNode(nextNode, currentNodes);
  }

  const addNodeBelow = (fromNodeInformation) => {
    setNodes(latestNodes => {
      let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);
      let newNodeId = idGenerator();
      let newNode = {  
        id: newNodeId, type: nodeKeys.TASK_KEY, data: { label: newNodeId, id:newNodeId, click: nodeClickEvents },
        details: { nextNode: currentNode.details.nextNode }, 
        column: currentNode.column, line: lineManagerInstance.process(currentNode.line),
      }
      
      latestNodes = latestNodes.map(node => {
        if(node.id === fromNodeInformation.id) { node.details.nextNode = newNode.id; }
        return node;
      })
      latestNodes = [...latestNodes, newNode]
      latestNodes = reprocessNextNode(currentNode, latestNodes)

      edgesManagerInstance.updateSource(currentNode.id, newNode.details.nextNode, newNode.id);
      edgesManagerInstance.create(currentNode.id, newNode.id)

      return latestNodes;
    });

    updateGhostPositions()
    updateNodesPositions(setNodes, lineManagerInstance, columnManagerInstance)
  }

  const addNodeAbove = (fromNodeInformation) => {
    setNodes(latestNodes => {
      let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);
      let newNodeId = idGenerator();
      let newNode = { id: newNodeId, type: nodeKeys.TASK_KEY, data: { label: newNodeId, id:newNodeId, click: nodeClickEvents }, details: { nextNode: currentNode.id }, column: currentNode.column }

      if(currentNode.type === nodeKeys.FINAL_KEY){
        let baseLine = lineManagerInstance.getBaseLine(currentNode.line);
        newNode.line = lineManagerInstance.process(baseLine.name);
      }else{
        currentNode.line = lineManagerInstance.process(currentNode.line);
      }

      latestNodes = latestNodes.map(node => {
        if(isNodeIdPresentOnNextNode(currentNode.id, node)){
          edgesManagerInstance.updateTarget(node.id, currentNode.id, newNode.id);

          if( node.type === nodeKeys.CONDITIONAL_KEY ){
            let indexOfNextNode = node.details.nextNode.indexOf(currentNode.id);
            node.details.nextNode[indexOfNextNode] = newNode;
          }
          else{
            node.details.nextNode = newNodeId;
          }
        }
        
        return node;
      });

      latestNodes = [...latestNodes, newNode]
      latestNodes = reprocessNextNode(newNode, latestNodes)

      edgesManagerInstance.create(newNode.id, currentNode.id)

      return latestNodes;
    });

    updateGhostPositions()
    updateNodesPositions(setNodes, lineManagerInstance, columnManagerInstance)
  }

  nodeClickEvents.addNode = (mode, nodeInformation) => {
    switch (mode) {
      case nodeCRUDOperations.ADD_BELOW:
        addNodeBelow(nodeInformation);
        break;
      
      case nodeCRUDOperations.ADD_ABOVE:
        addNodeAbove(nodeInformation);

      default:
        break;
    }
  }

  nodeClickEvents.deleteNode = (nodeInformation) => {
    setNodes(latestNodes => {
      
      //TODO: if removed node === conditonal

      let removedNodeIndex = latestNodes.findIndex(node => node.id === nodeInformation.id);
      let removedNode = latestNodes[removedNodeIndex];
      let previousNodes = latestNodes.filter(node => isNodeIdPresentOnNextNode(nodeInformation.id, node));

      edgesManagerInstance.remove(removedNode.id, removedNode.details.nextNode);
      latestNodes.splice(removedNodeIndex, 1);   
      
      previousNodes.forEach(previousNode => {
        if(previousNode.type === nodeKeys.CONDITIONAL_KEY){
          let nextNodes = previousNode.details.nextNode;
          nextNodes[nextNodes.indexOf(removedNode.id)] = removedNode.details.nextNode;
        }
        else{
          previousNode.details.nextNode = removedNode.details.nextNode;
          edgesManagerInstance.updateTarget(previousNode.id, removedNode.id, removedNode.details.nextNode);
        }
        latestNodes = reprocessNextNode(previousNode, latestNodes)
      })
      return latestNodes;
    })

    updateGhostPositions();
    setNodes(latestNodes => {
      lineManagerInstance.getLines().forEach(line => {
        if( !latestNodes.find(node => node.line === line.name) && line.name !== first_line_name ){
          lineManagerInstance.remove(line.name);
        }
      })

      return latestNodes;
    })
    updateNodesPositions(setNodes, lineManagerInstance, columnManagerInstance);
  }
 
  const processNode = (currentNodeId) => {
    let currentNodeIndex = initialNodes.findIndex(node => node.id === currentNodeId);

    if( currentNodeIndex>=0 ){

      let currentNode = initialNodes[currentNodeIndex];
      switch (currentNode.type){

        case nodeKeys.START_KEY:
          currentNode.column = columnManagerInstance.central_column_name;
          currentNode.line = first_line_name;
        
        case nodeKeys.TASK_KEY:
          currentNode.column = parentNode.column;
          currentNode.line = lineManagerInstance.process(parentNode.line);

        case nodeKeys.START_KEY: case nodeKeys.TASK_KEY:
          edgesManagerInstance.create(currentNode.id, currentNode.details.nextNode);
          updateParentNode(currentNode);
          processNode(currentNode.details.nextNode);
          break;

        case nodeKeys.CONDITIONAL_KEY:
          let prev_parentNode = currentNode;
          currentNode.column = parentNode.column;
          currentNode.line = lineManagerInstance.process(parentNode.line);

          currentNode.details.nextNode.forEach((conditionalLegId, index) => {
            let columnNameForFollowingChild = columnManagerInstance.create( index, currentNode.details.nextNode.length, currentNode.column );

            updateParentNode({ column: columnNameForFollowingChild, line: currentNode.line });
            edgesManagerInstance.create( prev_parentNode.id, conditionalLegId );
            processNode(conditionalLegId);
          })
          
          updateParentNode(prev_parentNode)
          break;

        case nodeKeys.FINAL_KEY:
          currentNode.column = columnManagerInstance.central_column_name;
          currentNode.line = last_line_name;
          break;
      }

      currentNode.data.id = currentNode.id
      currentNode.data.click = nodeClickEvents;
      
      setNodes((latest) => { return [...latest, currentNode] })
      initialNodes.splice(currentNodeIndex, 1);
    }
  } 

  useEffect(() => { 
    processNode(initialNode) 
    reloadNodesAndAddGhostNodes();
  }, []);

  return (
    <StyledSimulation style={{ width:(!isInfoPanelOpen) ? '100vw':'70vw' }}>
      <ReactFlow
        nodes={ nodes }
        edges={ edgesManagerInstance.edges }
        nodeTypes={nodeTypes}
        style={{ borderRadius:"10px"  }}
      >
        <Controls/>
        {/* <Background style={{ "backgroundColor": white}} color="#ffffff" /> */}
      </ReactFlow>
    </StyledSimulation>
  );
};

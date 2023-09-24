import React, { useEffect, useState } from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, { Controls, Background } from 'reactflow';

import StyledSimulation from "./styled"
import { white } from "../style/index"

import ColumnManager from "./managers/columnManager";
import EdgesManager from "./managers/edgeManager";
import LineManager, { first_line_name, last_line_name } from "./managers/lineManager";
import { nodeKeys, nodeTypes } from './managers/nodeManager';

export default ({ initialNodes, initialNode, isInfoPanelOpen, nodeClickEvents }) => {

  const [nodes, setNodes] = useState([]);
  const edgeManagerInstance = EdgesManager();
  const columnManagerInstance = ColumnManager();
  const lineManagerInstance = LineManager();
  const [parentNode] = useState({ column: columnManagerInstance.central_column_name, line:first_line_name });

  const updateParentNode = ( newParentNode ) => {
    parentNode.column = newParentNode.column;
    parentNode.line = newParentNode.line;
  }

  const createNode = (currentNodeId) => {
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
          edgeManagerInstance.create(currentNode.id, currentNode.details.nextNode);
          updateParentNode(currentNode);
          createNode(currentNode.details.nextNode);
          break;

        case nodeKeys.CONDITIONAL_KEY:
          let prev_parentNode = currentNode;
          currentNode.column = parentNode.column;
          currentNode.line = lineManagerInstance.process(parentNode.line);

          currentNode.details.nextNode.forEach((conditionalLegId, index) => {
            let columnNameForFollowingChild = columnManagerInstance.create( index, currentNode.details.nextNode.length, currentNode.column );
            updateParentNode({ column: columnNameForFollowingChild, line: currentNode.line });
            
            edgeManagerInstance.create( prev_parentNode.id, conditionalLegId );
            createNode(conditionalLegId);
          })
          
          updateParentNode(prev_parentNode)
          break;

        case nodeKeys.FINAL_KEY:
          currentNode.column = columnManagerInstance.central_column_name;
          currentNode.line = last_line_name;
          break;
      }

      currentNode.data.click = nodeClickEvents;
   
      setNodes((latest) => { return [...latest, currentNode] })
      initialNodes.splice(currentNodeIndex, 1);
    }
  } 

  const reloadNodesAndUpdateEdges = () => {
    setNodes(latestNodes => {

      let newGhostLine = lineManagerInstance.processGhostLine();
      let lastNode = latestNodes.find(node => node.type == nodeKeys.FINAL_KEY);

      latestNodes.forEach(node => {
        if(node.type != "final" 
          && node.details.nextNode == lastNode.id
          && node.column != "central"
        ){
            let newNode = {
              id: Math.random().toString(36).substring(2, 8),
              details: {"nextNode":lastNode.id},
              type: nodeKeys.GHOST,
              column:node.column,
              line:newGhostLine,
            }

            latestNodes.push(newNode)
            edgeManagerInstance.updateTarget(node.id, lastNode.id, newNode.id)
            edgeManagerInstance.create(newNode.id, lastNode.id)
          }
      })

      return latestNodes.map(node => {

        return {
          ...node,
          position : {
            x : columnManagerInstance.getColumnPosition(node.column),
            y : lineManagerInstance.getLinePosition(node.line)
          }
        }
        
      })  
    })
  }  

  useEffect(() => { 
    createNode(initialNode) 
    reloadNodesAndUpdateEdges();
  }, []);

  return (
    <StyledSimulation style={{ width:(!isInfoPanelOpen) ? '100vw':'70vw' }}>
      <ReactFlow
        nodes={ nodes }
        edges={ edgeManagerInstance.edges }
        nodeTypes={nodeTypes}
        style={{ borderRadius:"10px"  }}
      >
        <Controls/>
        <Background style={{ "backgroundColor": white}} color="#ffffff" />
      </ReactFlow>
    </StyledSimulation>
  );
};

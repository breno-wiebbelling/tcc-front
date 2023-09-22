import React, {useEffect, useState} from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, { useNodesState, useEdgesState, MiniMap, Controls, Background, MarkerType } from 'reactflow';

import StyledSimulation from "./styled"
import {white} from "../style/index"

import ColumnManager, {central_column_name} from "./managers/columnManager";
import EdgesManager from "./managers/edgeManager";
import LineManager, {first_line_name, last_line_name} from "./managers/lineManager";
import { nodeKeys, nodeTypes, onNodeClick, reloadNodesPosition } from './managers/nodeManager';

let counter = 0;

export default ({initialNodes, initialNode, isInfoPanelOpen }) => {

  const [screenWidth, setScreenWidth] = useState((!isInfoPanelOpen) ? '100vw':'70vw');
  const [edges] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [parentNode]      = useState({ column: central_column_name, line:first_line_name });
  const columnManagerInstance = ColumnManager();
  const edgeManagerInstance = EdgesManager(edges);
  const lineManagerInstance = LineManager();

  //update edges------
  //set new line before last
    //update line that was using last (start using new line)
  
  //get nodes that were using last as reference
    //create one ghost for each (using same column as node and on the new line)
    //create adge from node to ghost and ghost to last
  //

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
          currentNode.column = central_column_name;
          currentNode.line = first_line_name;
        
        case nodeKeys.TASK_KEY:
          currentNode.column = parentNode.column;
          currentNode.line = lineManagerInstance.process(parentNode.line);

        case nodeKeys.START_KEY: case nodeKeys.TASK_KEY:
          edgeManagerInstance.create(currentNode.id, currentNode.details.nextNode);
          updateParentNode(currentNode)
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
          currentNode.column = central_column_name;
          currentNode.line = last_line_name;
          break;
      }

      setNodes((latest) => {
        return [...latest, currentNode]
      })

      initialNodes.splice(currentNodeIndex, 1);
    }
  } 

  useEffect(() => {
    if(initialNodes.length == 0){
      
    }
  }, [initialNodes])

  useEffect(()=> {
    setScreenWidth((current) => {
      return (!isInfoPanelOpen) ? '100vw':'70vw';
    })
  }, [isInfoPanelOpen])

  useEffect(() => { 
    counter++;
    if(counter<=1){
      createNode(initialNode) 
      reloadNodesPosition(setNodes, columnManagerInstance, lineManagerInstance);
    }
  }, []);

  return (
    <StyledSimulation style={{ width:(isInfoPanelOpen) ? '100vw':'70vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        style={{ borderRadius:"10px"  }}
      >
        <Controls/>
        <Background style={{ "backgroundColor": white}} color="#ffffff" />
      </ReactFlow>
    </StyledSimulation>
  );
};

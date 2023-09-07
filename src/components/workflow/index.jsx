import React, {useEffect, useState} from 'react';
import ReactFlow, { useNodesState, useEdgesState, MiniMap, Controls, Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

import StyledSimulation from "./styled"
import {white} from "../style/index"

import ColumnManager from "./managers/columnManager";
import EdgesManager from "./managers/edgeManager";
import { nodeKeys, nodeTypes, onNodeClick, reloadNodesPosition } from './managers/nodeManager';

//TODO
const Y_GAP = 150;

export default ({initialNodes, initialNode, isInfoPanelOpen }) => {
  
  const [nodes, setNodes] = useNodesState([])
  const [edges] = useEdgesState([])
  const columnManagerInstance = ColumnManager();
  const edgeManagerInstance = EdgesManager(edges);
  const [parentNode] = useState( { x: 260, y: 0, column: "central", id: "0"} );
  let nextNodeId = initialNode;

  const updateParentNode = ( currentNode ) => {
    parentNode.id =  null;
    parentNode.y = currentNode.position.y
    parentNode.column = currentNode.column;
  }

  const formatNode = (currentNodeId) => {
    let currentNodeIndex = initialNodes.findIndex(node => node.id === currentNodeId);

    if(currentNodeIndex>=0){

      let currentNode = initialNodes[currentNodeIndex];
      currentNode.position = { 
        x: columnManagerInstance.getColumnPosition(parentNode.column), 
        y: parentNode.y + Y_GAP 
      };
      currentNode.column = parentNode.column;

      switch (currentNode.type){
        case nodeKeys.FINAL_KEY:
          currentNode.column = "central";
          break;

        case nodeKeys.TASK_KEY: case nodeKeys.START_KEY:
          edgeManagerInstance.formatNewEdge(currentNode.id, currentNode.details.nextNode)
          updateParentNode(currentNode)
          formatNode(currentNode.details.nextNode);
          break;

        case nodeKeys.CONDITIONAL_KEY:
          let prev_y_position = currentNode.position.y;
          let prev_column     = currentNode.column;
          let prev_parent_id  = currentNode.id

          currentNode.details.nextNode.forEach((conditionalResult, index) => {
            let columnName = columnManagerInstance.formatNewColumn(index, currentNode.details.nextNode.length, currentNode.column);
            updateParentNode( { position: { y: prev_y_position}, column: columnName })
            edgeManagerInstance.formatNewEdge(prev_parent_id, conditionalResult)
            formatNode(conditionalResult)
          })

          parentNode.column = prev_column;
          break;
      }

      setNodes(latest => [...latest, currentNode])
      reloadNodesPosition(setNodes, columnManagerInstance);
      initialNodes.splice(currentNodeIndex, 1)
    }

  }

  useEffect(() => { formatNode(nextNodeId) }, [])

  return (
    <StyledSimulation style={{ width:(isInfoPanelOpen) ? '100vw':'70vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        style={{ borderRadius:"10px"  }}
      >
        {/* <MiniMap  style={{ "backgroundColor": "#e6e6e6"}}/> */}
        <Controls/>
        <Background style={{ "backgroundColor": white}} color="#ffffff" />
      </ReactFlow>
    </StyledSimulation>
  );
};

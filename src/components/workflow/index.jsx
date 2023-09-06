import React, {useEffect, useState} from 'react';
import ReactFlow, { useNodesState, useEdgesState, MiniMap, Controls, Background, MarkerType } from 'reactflow';

import 'reactflow/dist/style.css';
import StyledSimulation from "./styled"
import {white} from "../style/index"

import ColumnManager from "./managers/columnManager";
import EdgesManager from "./managers/edgeManager";

//TODO
import ConditionalNode from '../nodes/conditional/CustomConditionalNode'; import InputNode from '../nodes/input/CustomInputNode'; import DefaultNode from '../nodes/default/CustomDefaultNode'; import OutputNode from '../nodes/output/CustomOutputNode';
const FINAL_KEY = "output"; const TASK_KEY  = "task"; const START_KEY = "start"; const CONDITIONAL_KEY = "conditional"
const Y_GAP = 150;

//TODO
const onNodeClick = (event, node) => alert(JSON.stringify(node));

export default ({initialNodes, initialNode, isInfoPanelOpen }) => {
  const nodeTypes = { 
    conditional:ConditionalNode, 
    start:InputNode, 
    task:DefaultNode,
    final:OutputNode, 
  };

  const [nodes, setNodes] = useNodesState([])
  const [edges] = useEdgesState([])

  const columnManagerInstance = ColumnManager();
  const edgeManagerInstance = EdgesManager(edges);

  let nextNodeId = initialNode;

  const [parentNode] = useState( { x: 260, y: 0, column: "central", id: "0"} );
  const updateParentNode = ( posX, posY, column, id ) => {
    parentNode.id = id;
    parentNode.x = posX
    parentNode.y = posY
    parentNode.column = column;
  }

  const reloadNodesPosition = () => {
    setNodes(latest => {
      return latest.map(node => {
        node.position.x = columnManagerInstance.getColumnPosition(node.column, columnManagerInstance.columns);
        return node;
      })
    })
  }

  const formatNode = (currentNodeIndex) => {
    let currentNode = initialNodes[currentNodeIndex];
    currentNode.position = { x: columnManagerInstance.getColumnPosition(parentNode.column), y: parentNode.y + Y_GAP };
    if(parentNode.type === "conditional") {
      currentNode.position.y += (Y_GAP/2);
    }
    currentNode.column = parentNode.column;

    switch (currentNode.type){
      case TASK_KEY: case START_KEY:
        currentNode.position.y += (Y_GAP/4);
        nextNodeId=currentNode.details.nextNode;
        edgeManagerInstance.formatNewEdge(currentNode.id, nextNodeId)
        updateParentNode(currentNode.position.x, currentNode.position.y, currentNode.column, currentNode.id, currentNode.type)
        reloadNodesPosition()
        break;

      case CONDITIONAL_KEY:
        let prev_y_position = currentNode.position.y;
        let prev_column     = currentNode.column;
        let prev_parent_id  = currentNode.id

        currentNode.details.nextNode.forEach((conditionalResult, index) => {
          let columnName = columnManagerInstance.formatNewColumn(index, currentNode.details.nextNode.length, currentNode.column);
          let nodeIndex  = initialNodes.findIndex(node => node.id === conditionalResult); 
          updateParentNode( columnManagerInstance.getColumnPosition(columnName), prev_y_position, columnName, prev_parent_id, currentNode.type)
          edgeManagerInstance.formatNewEdge(prev_parent_id, conditionalResult)
          formatNode(nodeIndex)
        })

        parentNode.column = prev_column;
        reloadNodesPosition()
        break;
    }
    
    setNodes(latest => [...latest, currentNode])
    initialNodes.splice(currentNodeIndex, 1)
  }

  useEffect(() => {
    
    while(initialNodes.length > 0){
      let currentNodeIndex = initialNodes.findIndex(node => node.id === nextNodeId);
      
      if(currentNodeIndex == -1){
        currentNodeIndex = 0;
        console.log(initialNodes[0])
      }

      formatNode(currentNodeIndex)
    }
  }, [])

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

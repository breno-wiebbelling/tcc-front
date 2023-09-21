import React, {useEffect, useState} from 'react';
import 'reactflow/dist/style.css';
import Canvas from "./draw/Canvas/canvas.jsx"

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

      // updateParentNode(currentNode);
      setNodes((latest) => {
        return [...latest, currentNode]
      })

      initialNodes.splice(currentNodeIndex, 1);
    }
  }

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
    <StyledSimulation style={{ "width": screenWidth }} > 
      <Canvas screenWidth={screenWidth} nodes={nodes} />
    </StyledSimulation>
  );
};

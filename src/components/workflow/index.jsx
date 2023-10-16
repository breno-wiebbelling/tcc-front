import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import StyledSimulation from "./styled"
import { white } from "../common/style/index"
import useMainManager from "./managers/mainManager";
import { reloadNodesAndAddGhostNodes, processNode } from "./managers/nodeManager";

export default ({ initialNodes, initialNode, isInfoPanelOpen, nodeClickEvents }) => {

  const mainManager = useMainManager(initialNode, initialNodes, nodeClickEvents);

  useEffect(() => { 
    mainManager.nodeManagerInstance.processNode(initialNode, mainManager) 
    reloadNodesAndAddGhostNodes(mainManager);
  }, []);

  return (
    <StyledSimulation style={{ width:(!isInfoPanelOpen) ? '100vw':'70vw' }}>
      <ReactFlow
        nodes={ mainManager.nodeManagerInstance.nodes }
        edges={ mainManager.edgeManagerInstance.edges }
        nodeTypes={ mainManager.nodeManagerInstance.nodeTypes}
        style={{ borderRadius:"10px"  }}
      >
        <Controls/>
        <Background style={{ "backgroundColor": white}} color="#ffffff" />
      </ReactFlow>
    </StyledSimulation>
  );
};

import React, { useEffect } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import StyledSimulation from "./styled"
import { white } from "../common/style/index"
import useMainManager from "./managers/mainManager";
import { LoadingConsumer } from "../../context/loadingContext";

export default ({ initialNodes, initialNode, isInfoPanelOpen, nodeEventClicks, simulationId, searchInicialNodes}) => {

  const loadingService = LoadingConsumer();
  let mainManager = useMainManager(initialNode, initialNodes, nodeEventClicks, simulationId, searchInicialNodes, loadingService);

  useEffect(() => {
    const fetchData = async () => {
      await mainManager.loadNodes();
    };

    fetchData();
  }, []);

  return (
    <StyledSimulation style={{ width:(!isInfoPanelOpen) ? '100vw':'70vw' }}>
      <ReactFlow
        nodes={ mainManager.nodeManagerInstance.nodes }
        edges={ mainManager.edgeManagerInstance.edges }
        nodeTypes={ mainManager.nodeManagerInstance.nodeTypes}
        edgeTypes={ mainManager.edgeManagerInstance.edgeTypes}
        style={{ borderRadius:"10px"  }}
      >
        <Controls/>
        <Background style={{ "backgroundColor": white}} color="#ffffff" />
      </ReactFlow>
    </StyledSimulation>
  );
};

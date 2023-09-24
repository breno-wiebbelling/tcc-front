import React  from 'react';
import SimulationStyled from "./style"
import { useState, useEffect } from 'react';
import Header from "../../components/header/index";
import SimulationFlow from "../../components/workflow/index"
import InfoPanel from "../../components/workflow/panel/index.jsx"
import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@mui/material/IconButton';
import SimulationInfo from "../../components/simulation/infoPanel/index.jsx"
import NodeInfo from "../../components/nodes/infoPanel/index.jsx"

//TODO
const nodeEventNames = { add: "addNode", edit:"editNode", delete: "deleteNode" }

const getUserNodes = () => {
  return [
    { id: '1',      type: 'start',          details: {nextNode: "2"},               data: { label: 'START' } },
    { id: '2',      type: 'conditional',    details: {nextNode: ["25", "23"] },     data: { label: '2' } },
    { id: '25',     type: 'task',           details: {nextNode: "5"},               data: { label: '25' } },
    { id: '23',     type: 'conditional',    details: {nextNode: ["251", "252"]},      data: { label: '23' } },
    { id: '251',    type: 'task',          details: {nextNode: "253"},               data: { label: '251' } },
    { id: '253',    type: 'task',          details: {nextNode: "5"},               data: { label: '253' } },
    { id: '252',    type: 'task',          details: {nextNode: "5"},               data: { label: '252' } },
    { id: '5',      type: 'final',                                                  data: { label: 'FINAL' } }
  ];
}

export const Simulation = () => {
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false); 
  const [simulationInfo, setSimulationInfo] = useState(null);
  const [InfoPanelComponent, setInfoPanelComponent] = useState(()=> { return <SimulationInfo simulationInfo={simulationInfo}/> });
  const initialNodes = getUserNodes();
  const initialNode = "1";

  const nodeClickEvents = {
    editNode : (node_information) => { openModalWithNodeEvent(nodeEventNames.edit, node_information) },
    deleteNode : (node_information) => { openModalWithNodeEvent(nodeEventNames.delete, node_information) },
  }

  const openModalWithNodeEvent = (eventName, node_information) => {
    alert(eventName)
    switch (eventName){
      case nodeEventNames.add:
        setInfoPanelComponent(() => { return <NodeInfo nodeInfo={node_information}/> });
        break;

      case nodeEventNames.edit:
        setInfoPanelComponent(() => { return <NodeInfo nodeInfo={node_information}/> });
        break;

      case nodeEventNames.delete:
        setInfoPanelComponent(() => { return <NodeInfo nodeInfo={node_information}/> });
        break;
    }
      
    setIsInfoPanelOpen(true);
  }

  useEffect(() => {
    setSimulationInfo({ "name": "Busca de usuários", "created":"22/03/2023", "descripiton": "Busca de usuários validos para cartão cartão corporativo"});
  }, [])

  return (
    <SimulationStyled>
      <Header/>

      <div className='container'>
        <SimulationFlow 
          initialNode={initialNode} 
          initialNodes={initialNodes} 
          isInfoPanelOpen={isInfoPanelOpen} 
          nodeClickEvents={nodeClickEvents} 
        />
        
        {!isInfoPanelOpen && 
          <IconButton className="openInfoPanel" onClick={ () => { setIsInfoPanelOpen(true)} } >
            <DescriptionIcon/>
          </IconButton>
        }

        <InfoPanel isOpen={isInfoPanelOpen} setIsOpen={setIsInfoPanelOpen}>
          { InfoPanelComponent }
        </InfoPanel>
      </div>
     
    </SimulationStyled>
  )
}
import React  from 'react';
import SimulationStyled from "./style"
import { useState, useEffect } from 'react';
import Header from "../../components/header/index";
import SimulationFlow from "../../components/workflow/index"
import InfoPanel from "../../components/workflow/panel/index.jsx"
import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@mui/material/IconButton';
import SimulationInfo from "../../components/simulation/infoPanel/index.jsx"

const getUserNodes = () => {
  return [
    { id: '1',      type: 'start',          details: {nextNode: "5"},               data: { label: 'START' } },
    // { id: '2',      type: 'conditional',    details: {nextNode: ["25", "23"] },     data: { label: '2' } },
    // { id: '23',     type: 'task',           details: {nextNode: "5"},               data: { label: '23' } },
    // { id: '25',     type: 'conditional',    details: {nextNode: ["29", "30"]},      data: { label: '25' } },
    // { id: '29',     type: 'task',           details: {nextNode: "291"},               data: { label: '29' } },
    // { id: '291',    type: 'task',           details: {nextNode: "5"},               data: { label: '29' } },
    // { id: '30',     type: 'task',           details: {nextNode: "5"},               data: { label: '30' } },
    { id: '5',      type: 'final',                                                  data: { label: 'FINAL' } }

  ];
}

export const Simulation = () => {
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false); 
  const [InfoComponent, setInfoComponent] = useState(null);
  const [simulationInfo, setSimulationInfo] = useState(null);
  let initialNode = "1";
  let initialNodes = getUserNodes();

  useEffect(() => {
    //TODO: get info
    setSimulationInfo({
      "name": "Busca de usuários",
      "created":"22/03/2023",
      "descripiton": "Busca de usuários validos para cartão cartão corporativo"
    })
    setInfoComponent( ()=> { return <SimulationInfo/> } )

  }, []);

  return (
    <SimulationStyled>
      <Header/>

      <div className='container'>
        <SimulationFlow initialNode={initialNode} initialNodes={initialNodes} isInfoPanelOpen={{isInfoPanelOpen}} />
        
        {!isInfoPanelOpen && 
          <IconButton className="openInfoPanel" onClick={ () => { setIsInfoPanelOpen(true)} } >
            <DescriptionIcon/>
          </IconButton>
        }

        <InfoPanel isOpen={isInfoPanelOpen} setIsOpen={setIsInfoPanelOpen}>
          { InfoComponent }
        </InfoPanel>
      </div>
     
    </SimulationStyled>
  )
}
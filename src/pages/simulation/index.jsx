import React  from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/header/index";
import SimulationFlow from "../../components/workflow/index";
import InfoPanel from "../../components/workflow/panel/index.jsx";
import { LoadingConsumer } from '../../context/loadingContext.jsx'
import SimulationInfo from "../../components/simulation/infoPanel/index.jsx";
import EditNodeComponent from "../../components/workflow/nodes/infoPanel/edit/index.jsx";

import SimulationStyled from "./style";
import { getSimulationById } from "../../service/clients/simulationClient";
import { getInitialNodesBySimulationId } from "../../service/clients/simulationClient.js";
import PopperAlert from "../../components/alert";

const nodeEventNames = { add: "addNode", edit:"editNode", delete: "deleteNode" }

export default () => {

  const { simulationId } = useParams();
  const loadingService = LoadingConsumer()

  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false); 
  const [simulationInfo, setSimulationInfo] = useState(null);
  const [InfoPanelComponent, setInfoPanelComponent] = useState(()=> { return <SimulationInfo simulationInfo={simulationInfo}/> });
  const [initialNodes, setInitialNodes] = useState([{ "id": "0" }]);
  const [loaded, setLoaded] = useState(false);
  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }

  const nodeEventClicks = {
    editNode : (nodeInformation) => {
      openModalWithNodeEvent(nodeEventNames.edit, nodeInformation)
    },
    newNode: (updateAfterFinish) => { openModalWithNodeEvent(nodeEventNames.edit, updateAfterFinish)}
  }

  const openModalWithNodeEvent = (eventName, nodeInformation) => {
    nodeInformation['simulationId'] = simulationId;

    switch (eventName){
      case nodeEventNames.edit:
        setInfoPanelComponent(() => {
          return (
            <EditNodeComponent
              nodeInfo={nodeInformation}
              setIsInfoPanelOpen={setIsInfoPanelOpen}
              setAlertInfo={setAlertInfo}
              loadInformation={loadInformation}
            />
          )
        });
        setIsInfoPanelOpen(true);
        break;
      default:
        break;
    }
      
  }

  const loadInformation = async () => {
    setLoaded(false);
    
    let localSimulation = await getSimulationById(simulationId);
    setSimulationInfo(localSimulation);

    let localInitialNodes = await searchInicialNodes();
    setInitialNodes(
      localInitialNodes.map(initialNode => {
        initialNode.id = initialNode["_id"];
        return initialNode;
      })
    );
    
    setLoaded(true);
    loadingService.hide()
  }

  const searchInicialNodes = () => {
    return getInitialNodesBySimulationId(simulationId);
  }

  useEffect(() => {
    loadingService.show()
    loadInformation();
  }, [])

  return (
    <SimulationStyled>
      <Header/>
      {alertInfo.msg !== "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}

      <div className='container'>
        {
          loaded &&
          <SimulationFlow
            initialNode={simulationInfo["id_start"]}
            initialNodes={initialNodes}
            isInfoPanelOpen={isInfoPanelOpen}
            nodeEventClicks={nodeEventClicks}
            simulationId={simulationId}
            searchInicialNodes={searchInicialNodes}
          />
        }
        
        {/*{*/}
        {/*  !isInfoPanelOpen && */}
        {/*  <IconButton className="openInfoPanel" onClick={ () => { setIsInfoPanelOpen(true)} } >*/}
        {/*    <DescriptionIcon/>*/}
        {/*  </IconButton>*/}
        {/*}*/}

        <InfoPanel isOpen={isInfoPanelOpen} setIsOpen={setIsInfoPanelOpen}>
          { InfoPanelComponent }
        </InfoPanel> 
      </div>
     
    </SimulationStyled>
  )
}
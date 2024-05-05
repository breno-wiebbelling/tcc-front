import React from 'react';
import BasicTable from '../../common/list/list';
import CreationModal from "../creation/index"
import EditionModal from "../edition/index"
import { LoadingConsumer } from '../../../context/loadingContext.jsx'
import { getSimulationsByUser, deleteSimulationById } from "../../../service/clients/simulationClient";
import SimulationListStyled from "./style"
import PopperAlert from '../../../components/alert/index';

const LIST_NAME = "Simulações"
const ELEMENT_NAME = "simulação"
const onSimulationClick = (simulation) => { window.location.href = `/simulation/${simulation["_id"]}` }
const deleteSimulation = async (simulation) => { await deleteSimulationById(simulation['_id']); }
let simulationFieldsDetails = { "keys": ["name", "description", "createdAt"], "names": ["Nome", "Descrição", "Data de Criação"], "sizes": ["28%", "52%", "17%"], "tooltip": [false, true, false], "actions": [{ "name": "onElementClick", "function": onSimulationClick }, { "name": "deleteElement", "function": deleteSimulation }] }

const popAlertError = (e, setAlertInfo) => {
  if (e.message) {
    setAlertInfo({ msg: (e.message ?? "Algo de errado aconteceu!"), mode: 'error' });
  }
  else {
    setAlertInfo({ msg: (e ?? "Algo de errado aconteceu!"), mode: 'error' });
  }
}

export default () => {
  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: '' });
  const [isCreationModalOpen, setIsCreationModalOpen] = React.useState(false);
  const [isEditionModalOpen, setIsEditionModalOpen] = React.useState(false);
  const [simulations, setSimulations] = React.useState([])

  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: '' }); }
  const popError = (e) => { popAlertError(e, setAlertInfo); }
  const loadingService = LoadingConsumer();

  simulationFieldsDetails["actions"].push({
    "name": "editElement", "function": () => { setIsEditionModalOpen(true) }
  })

  React.useEffect(() => {
    loadingService.show();
  }, []);

  return (
    <SimulationListStyled className='display_flex_center'>
      {alertInfo.msg != "" && <PopperAlert message={alertInfo.msg} mode={'error'} resetMessage={resetErrorMessage} />}

      <CreationModal open={isCreationModalOpen} setOpen={setIsCreationModalOpen} setSimulations={setSimulations} setErrorMessage={popError} />
      <EditionModal open={isEditionModalOpen} setOpen={setIsEditionModalOpen} setSimulations={setSimulations} setErrorMessage={popError} />
      <BasicTable
        elements={simulations}
        setElements={setSimulations}
        getWithPage={getSimulationsByUser}
        listName={LIST_NAME}
        elementName={ELEMENT_NAME}
        elementFieldDetails={simulationFieldsDetails}
        elementClick={onSimulationClick}
        addAction={() => setIsCreationModalOpen(true)}
        loadingService={loadingService}
      />
    </SimulationListStyled>
  );
}

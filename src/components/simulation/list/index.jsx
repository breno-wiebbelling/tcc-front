import React, {useState} from 'react';
import BasicTable from '../../common/list/list';
import CreationModal from "../creation/index"
import EditionModal from "../edition/index"
import { getSimulationsByUser, deleteSimulationById } from "../../../service/clients/simulationClient";
import SimulationListStyled from "./style"
import PopperAlert from '../../../components/alert/index';

export default () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreationModalOpen, setIsCreationModalOpen] = React.useState(false);
  const [isEditionModalOpen, setIsEditionModalOpen] = React.useState(false);
  const listName = "Simulações"
  const elementName = "simulação"

  const onElementClick = (simulation) => {
    window.location.href=`/simulation/${simulation["_id"]}`
  }

  const deleteSimulation = async (simulation) => {
    await deleteSimulationById(simulation['_id']);
  }

  const elementFieldDetails = {
    "keys": ["name", "description", "createdAt"],
    "names": ["Nome", "Descrição", "Data de Criação"],
    "sizes": ["28%", "52%", "17%"],
    "tooltip": [false, true, false],
    "actions": [ 
      {
        "name":"onElementClick",
        "function": onElementClick
      },
      {
        "name":"deleteElement",
        "function": deleteSimulation
      },
      {
        "name":"editElement",
        "function": () => { setIsEditionModalOpen(true) }
      }
    ]
  }; 
  
  const [simulations, setSimulations] = React.useState([])

  return (
    <SimulationListStyled className='display_flex_center'>
      {errorMessage && <PopperAlert message={errorMessage} setMessage={setErrorMessage} />}
      <CreationModal  open={isCreationModalOpen} setOpen={setIsCreationModalOpen} setSimulations={setSimulations} setErrorMessage={setErrorMessage}/>
      <EditionModal   open={isEditionModalOpen}  setOpen={setIsEditionModalOpen}  setSimulations={setSimulations} setErrorMessage={setErrorMessage}/>
      <BasicTable 
        elements={simulations}
        setElements={setSimulations}
        getWithPage={getSimulationsByUser} 
        listName={listName} 
        elementName={elementName}
        elementFieldDetails={elementFieldDetails}
        elementClick={onElementClick}
        addAction={ () => setIsCreationModalOpen(true) }
      />
    </SimulationListStyled>
  );
}

import React from 'react';
import SimulationListStyled from "./style"
import { getSimulationsByUser } from "../../../service/clients/simulationClient";
import BasicTable from '../../common/list/list';
import CreationModal from "../creation/index"

export default () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = React.useState(false);
  const listName = "Simulações"
  const elementName = "simulação"
  const elementFieldDetails = {
    "keys": ["name", "description", "created_at", "updated_at"],
    "names": ["Nome", "Descrição", "Data de Criação", "Última alteração"],
    "sizes": ["18%", "40%", "15%", "15%"],
    "tooltip": [false, true, false, false]
  }; 
  const [simulations, setSimulations] = React.useState([])

  return (
    <SimulationListStyled className='display_flex_center'>
      <CreationModal open={isCreationModalOpen} setOpen={setIsCreationModalOpen} setSimulations={setSimulations}/>
      <BasicTable 
        elements={simulations}
        setElements={setSimulations}
        getWithPage={getSimulationsByUser} 
        listName={listName} 
        elementName={elementName}
        elementFieldDetails={elementFieldDetails}
        addAction={ () => setIsCreationModalOpen(true) }
      />
    </SimulationListStyled>
  );
}

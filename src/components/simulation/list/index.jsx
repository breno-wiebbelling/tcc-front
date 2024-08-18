import React, { useEffect } from 'react';
import CreationModal from "../creation/index"
import EditionModal from "../edition/index"
import { LoadingConsumer } from '../../../context/loadingContext.jsx'
import { getSimulationsByUser, deleteSimulationById } from "../../../service/clients/simulationClient";
import SimulationListStyled from "./style"
import PopperAlert from '../../../components/alert/index';
import Tooltip from '@mui/material/Tooltip';

import NoResults from '../../common/list/noResults/index.jsx';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { smokeHover } from '../../common/style/index.js';

const onSimulationClick = (simulation) => { window.location.href = `/simulation/${simulation["_id"]}` }
const popAlertError = (e, setAlertInfo) => {
  if (e.message) {
    setAlertInfo({ msg: (e.message ?? "Algo de errado aconteceu!"), mode: 'error' });
  }
  else {
    setAlertInfo({ msg: (e ?? "Algo de errado aconteceu!"), mode: 'error' });
  }
}

export default () => {
  const [simulations, setSimulations] = React.useState([])
  const [simulationInfo, setSimulationInfo] = React.useState({ name: "", description: "" })

  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: '' });
  const [isCreationModalOpen, setIsCreationModalOpen] = React.useState(false);
  const [isEditionModalOpen, setIsEditionModalOpen] = React.useState(false);
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: '' }); }
  const popError = (e) => { popAlertError(e, setAlertInfo); }

  const [page, setPage] = React.useState(1);
  const [pagesCount, setPagesCount] = React.useState(0);
  const loadingService = LoadingConsumer();

  const loadSimulations = async (pge) => {
    loadingService.show();
    setSimulationInfo({ name: "", description: "" })

    getSimulationsByUser(pge)
      .then(clientResponse => {
        setSimulations(clientResponse.list);
        setPagesCount(clientResponse.pages)
        if (loadingService) {
          loadingService.hide();
        }
      })
  }

  const createSimulation = () => {
    setIsCreationModalOpen(true)
  }

  const editSimulation = (simulation) => {
    setSimulationInfo(simulation);
    setIsEditionModalOpen(true);
  }

  const deleteSimulation = async (simulation) => {
    await deleteSimulationById(simulation['_id']);
    loadSimulations(page)
  }

  useEffect(() => {
    loadSimulations(1);
  }, [])

  return (
    <SimulationListStyled className='display_flex_center'>
      {alertInfo.msg != "" && <PopperAlert message={alertInfo.msg} mode={'error'} resetMessage={resetErrorMessage} />}

      <CreationModal reload={() => { loadSimulations(page) }} open={isCreationModalOpen} setOpen={setIsCreationModalOpen} setErrorMessage={popError} />
      <EditionModal reload={() => { loadSimulations(page) }} open={isEditionModalOpen} setOpen={setIsEditionModalOpen} setErrorMessage={popError} simulationInfo={simulationInfo} setSimulationInfo={setSimulationInfo} />

      <div className='simulationList'>
        <div className="simulationsInfo">
          <h4>Simulações</h4>
          <div className="actions">
            <button onClick={() => { createSimulation() }} className='display_flex_center'>
              <AddIcon className='add_icon' style={{ color: smokeHover }} />
              <span>criar simulação</span>
            </button>
          </div>
        </div>
        <div className="headers">
          <div className="header_container">
            <div className="header">
              <div style={{ width: "25%" }}>
                <p>Nome</p>
              </div>
              <div style={{ width: "35%" }} >
                <p> Descrição </p>
              </div>
              <div style={{ width: "30%" }} >
                <p > Data de Criação  </p>
              </div>
            </div>
            <div style={{ width: "10%" }} className="actions"></div>
          </div>
        </div>
        <div className="simulations">
          {
            simulations.length === 0 && <NoResults contentName={"Simulação"} />
          }
          {
            simulations.length > 0 &&

            simulations.map(simulation => {
              return (
                <div className={"simulation_container"} key={simulation['_id']}>
                  <div className='simulation' onClick={() => { onSimulationClick(simulation) }} >
                    <div style={{ width: "25%" }} >
                      <Tooltip title={simulation['name']} arrow disableInteractive className="simulation_info_container">
                        <p> {simulation['name']} </p>
                      </Tooltip>
                    </div>
                    <div style={{ width: "35%" }}>
                      <Tooltip title={simulation['description']} arrow disableInteractive className="simulation_info_container">
                        <p style={{ width: "80%" }}> {simulation['description']}   </p>
                      </Tooltip>
                    </div>
                    <div style={{ width: "30%" }}>
                      <Tooltip  title={simulation['createdAt']} arrow disableInteractive className="simulation_info_container">
                        <p> {String(simulation['createdAt']).split("T")[0]} </p>
                      </Tooltip>
                    </div>
                  </div>
                  <div style={{ width: "10%" }} className='actions'>
                    <EditIcon className='action' onClick={() => { editSimulation(simulation) }} />
                    <DeleteIcon className='action' onClick={() => { deleteSimulation(simulation) }} />
                  </div>
                </div>
              )
            })
          } 
        </div>
        <div className="pagination display_flex_center">
          {
            pagesCount > 1 &&
            <Stack spacing={2}>
              <Pagination count={pagesCount} onChange={(event, value) => { setPage(() => { return value }); loadSimulations(value) }} />
            </Stack>
          }
        </div>
      </div>
    </SimulationListStyled >
  );
}

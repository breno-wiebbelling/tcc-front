import React from 'react';
import InputDetailsStyled from "./styled";
import { user_host_key } from "../../../../../../service/authService";
import { creamWhite } from "../../../../../common/style/index";
import Dropdown from "../../../../../form/dropdown";
import { getVariablesByUserAndSimulationId } from "../../../../../../service/clients/variableClient";
import VariableCreationModal from "../../../../../variable/creation/variableCreationModal";
import {formatURIInfo} from "../input/uriBuilder/uriBuilderManager";

const getUserHost = ()=>{ return sessionStorage.getItem(user_host_key); }

const loadUserVariables = async (simulationId, setVariables) => {
  let userVariables = await getVariablesByUserAndSimulationId(0, simulationId)
  let filteredVariables = userVariables.list.map(v => {
    return {key: v['_id'], label:v['name'], value:v['value']}
  });

  setVariables(filteredVariables)

  return filteredVariables;
}

export default ({ nodeInfo, setNodeDetails, nodeDetails }) => {
  const [variables, setVariables] = React.useState([]);
  const [variable, setVariable] = React.useState('');
  const [variableCreationModalOpen, setVariableCreationModalOpen] = React.useState(false);
  const handleVariableCreation = () => {
    loadUserVariables(nodeInfo['simulationId'], setVariables)
      .then(() => {
        setVariableCreationModalOpen(false);
      });
  }
  const handleDropdownValueChange = (newVariable) => { setVariable(newVariable); }

  React.useEffect(()=> {
    loadUserVariables(nodeInfo['simulationId'], setVariables)
      .then((variables) => {
        setVariable(variables.filter(v => v['key'] === nodeInfo['details']['variable'])[0])
      });
  },[nodeInfo])

  React.useEffect(() => {
    setNodeDetails(latestDetails => {
      return { ...latestDetails, 'variable': variable['key'] }
    })
  }, [variable])

  return (
    <InputDetailsStyled>
      <div className="node-details-line"></div>
      <h3>Detalhes de Saída</h3>
      <div style={{ height: '45px' }}>
        <Dropdown
          options={variables}
          value={variable}
          placeholder={"Variável de Saída"}
          onChange={handleDropdownValueChange}
          hasNewValueOption={true}
          className="dropdown"
          onNewValueOptionClick={() => {setVariableCreationModalOpen(true)}}
          isEnabled={true}
          tooltipTitle={'Nome da Variável de Saída'}/>
      </div>
      <div className="node-details-line"></div>

      <VariableCreationModal
        isOpen={variableCreationModalOpen}
        close={() => { setVariableCreationModalOpen(false) }}
        onCreate={handleVariableCreation}
        simulationId={nodeInfo['simulationId']}
      />
    </InputDetailsStyled>
  )
}
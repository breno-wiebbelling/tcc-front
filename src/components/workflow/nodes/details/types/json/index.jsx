import React from 'react';
import JsonDetailsStyled from "./styled";
import PopperAlert from '../../../../../alert/index';
import VariableCreationModal from "../../../../../variable/creation/variableCreationModal";
import { getVariablesByUserAndSimulationId } from "../../../../../../service/clients/variableClient";
import Dropdown from "../../../../../form/dropdown/index";
import VariableTypeEnum from '../../../../../variable/VariableTypeEnum';
import JsonOperationModeEnum from './JsonOperationModeEnum';
import EditJsonInfo from "./edit/index";
import GetJsonKeyValue from "./get/index";

const DEFAULT_JSON_VARIABLE = { key: 'key', label: 'Variável JSON', value: 'Não definido' };
const DEFAULT_JSON_OPERATION_OPTION = { key: 'key', label: 'Operação JSON', value:"Operação realizada no JSON selecionado"}

export default ({ nodeInfo, setNodeDetails, nodeDetails }) => {
  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: '' });
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: '' }); }
  const setError = (errMsg) => { setAlertInfo({ mode: 'error', msg: errMsg }) }
  const setWarning = (wrnMsg) => { setAlertInfo({ mode: 'warn', msg: wrnMsg }) }

  const [variables, setVariables] = React.useState([]);
  const [jsonVariables, setJsonVariables] = React.useState([]);
  const [variableCreationModalOpen, setVariableCreationModalOpen] = React.useState(false);
  const openVariableCreationModal  = () => { setVariableCreationModalOpen(true); }
  const closeVariableCreationModal = () => { setVariableCreationModalOpen(false); }

  const [jsonVariable, setJsonVariable] = React.useState(DEFAULT_JSON_VARIABLE);
  const [jsonOperationMode, setJsonOperationMode] = React.useState(DEFAULT_JSON_OPERATION_OPTION)

  const loadUserVariables = async () => {
    let userVariables = await getVariablesByUserAndSimulationId(0, nodeInfo['simulationId'])
    let filteredVariables = userVariables
      .list
      .map(v => { return { key: v['_id'], label: v['name'], value: v['value'], type: v['type'] } });

    setVariables(filteredVariables)
    setJsonVariables(filteredVariables.filter(v => v.type === VariableTypeEnum.JSON.code))

    return filteredVariables;
  }

  const handleVariableCreation = () => {
    setVariableCreationModalOpen(false);
    loadUserVariables(nodeInfo['simulationId']);
  }

  const handleJsonVariableChange = (newValue) => {
    setJsonVariable(newValue);
    setNodeDetails(latestDetails => {
      latestDetails['jsonVariable'] = newValue['key'];
      return latestDetails;
    });
  }

  const handleJsonOperationChange = (newJsonOperation) => { 
    setJsonOperationMode(newJsonOperation)
    setNodeDetails(latestDetails => {
      latestDetails['jsonOperationMode'] = newJsonOperation['key']
      return latestDetails;
    })
  }

  const loadJsonDetails = async (nodeInfo) => {
    let loadedVariables = await loadUserVariables(nodeInfo['simulationId']);
    if (typeof nodeInfo['details']['jsonVariable'] === 'undefined') {
      setJsonVariable(DEFAULT_JSON_VARIABLE);
    }
    else {
      setJsonVariable(loadedVariables.find(lv => lv['key'] === nodeInfo['details']['jsonVariable']));
    }

    if(typeof nodeInfo['details']['jsonOperationMode'] === 'undefined'){
      setJsonOperationMode(DEFAULT_JSON_OPERATION_OPTION)
    }else{
      setJsonOperationMode(JsonOperationModeEnum.getByCode(typeof nodeInfo['details']['jsonOperationMode']))
    }
  }

  React.useEffect(() => {
    loadJsonDetails(nodeInfo)
  }, [nodeInfo])

  React.useEffect(() => {
    const element = document.getElementById('TypeSelectorComponent');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [jsonOperationMode])

  return (
    <JsonDetailsStyled>
      <div className="node-details-line"></div>
      {alertInfo.msg !== "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}
      <h3>Detalhes de JSON</h3>
      <div style={{ height: '45px' }}>
        <Dropdown options={jsonVariables} value={jsonVariable} onChange={handleJsonVariableChange} placeholder={jsonVariable.label} tooltipTitle={"Variável JSON"} hasNewValueOption={true} onNewValueOptionClick={openVariableCreationModal} />
      </div>
      <div style={{ height: '45px' }}>
        <Dropdown options={JsonOperationModeEnum.dropdownOptions} value={jsonOperationMode} onChange={handleJsonOperationChange} placeholder={jsonOperationMode.label} tooltipTitle={"Operação JSON"}/>
      </div>
      {
        (jsonVariable['key'] !== DEFAULT_JSON_VARIABLE['key'] && jsonOperationMode['key'] === JsonOperationModeEnum.EDIT.key) &&
        (
          <EditJsonInfo nodeInfo={nodeInfo} setNodeDetails={setNodeDetails} variables={variables} jsonVariable={jsonVariable} setWarning={setWarning} openVariableCreationModal={openVariableCreationModal} setError={setError}/>
        )  
      }
      {
        (jsonVariable['key'] !== DEFAULT_JSON_VARIABLE['key'] && jsonOperationMode['key'] === JsonOperationModeEnum.GET.key) &&
        (
          <GetJsonKeyValue nodeInfo={nodeInfo} setNodeDetails={setNodeDetails} variables={variables} openVariableCreationModal={openVariableCreationModal}/>
        )  
      }

      <VariableCreationModal isOpen={variableCreationModalOpen} close={() => { closeVariableCreationModal(false) }} onCreate={handleVariableCreation} simulationId={nodeInfo['simulationId']} openVariableCreationModal={openVariableCreationModal} />
    </JsonDetailsStyled>
  )
}
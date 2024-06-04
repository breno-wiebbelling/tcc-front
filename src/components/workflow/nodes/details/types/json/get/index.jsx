import React from 'react';
import GetJsonValueStyled from "./styled";
import Input from "../../../../../../form/rawInput/index"
import Dropdown from '../../../../../../form/dropdown';
import PopperAlert from '../../../../../../alert/index';
import { validateDangerousChars } from "../../../../../../form/formValidators";

const DEFAULT_NEW_JSON_VALUE = { key: 'key', label: 'Variável destino', value: 'Não definido' };

export default ({ nodeInfo, setNodeDetails, variables, openVariableCreationModal }) => {
  const [resultVariable, setResultVariable] = React.useState(DEFAULT_NEW_JSON_VALUE);
  const [keyName, setKeyName] = React.useState('');

	const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});
	const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }
  const setError = (errMsg) => { setAlertInfo({ mode: 'error', msg: errMsg }) }

  const handleResultVariableChange = (newResultVariable) => {
    setResultVariable(newResultVariable)
    setNodeDetails(latest => {
      latest['resultVariable'] = newResultVariable['key'];
      return latest;
    })
  }

  const handleKeyNameChange = (event) => {
    let newKeyName = event.target.value;

    if(!validateDangerousChars(newKeyName, setError)){
      return;
    }
    newKeyName = String(newKeyName).replace(/\s+/g, '');

    setKeyName(newKeyName);
    setNodeDetails(latest => {
      latest['keyName'] = newKeyName;
      return latest;
    });
  }

  React.useEffect(() => {
    let newResultVariable = (typeof nodeInfo['details']['resultVariable'] !== "undefined")
      ? variables.find(v => v['key'] === nodeInfo['details']['resultVariable'])
      : DEFAULT_NEW_JSON_VALUE;
    setResultVariable(newResultVariable);

    let keyName = (typeof nodeInfo['details']['keyName'] !== "undefined")
      ? nodeInfo['details']['keyName']
      : '';
    setKeyName(keyName);
  }, [nodeInfo])

  return (
    <GetJsonValueStyled>
			{alertInfo.msg != "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}	

      <Input value={keyName} onChange={handleKeyNameChange} placeholder="chave de consulta" />
      <div style={{ height:"45px" }}>
        <Dropdown options={variables} value={resultVariable} onChange={handleResultVariableChange} placeholder={"Variável Destino"} hasNewValueOption={true} onNewValueOptionClick={openVariableCreationModal} iconSizes={{ height: '18px', width: '18px' }} />
      </div>
    </GetJsonValueStyled>
  )
}
import React from 'react';
import GetJsonValueStyled from "./styled";
import Input from "../../../../../../form/rawInput/index"
import Dropdown from '../../../../../../form/dropdown';

const DEFAULT_NEW_JSON_VALUE = { key: 'key', label: 'valor', value: 'Não definido' };

export default ({ nodeInfo, setNodeDetails, variables, openVariableCreationModal }) => {
  const [resultVariable, setResultVariable] = React.useState(DEFAULT_NEW_JSON_VALUE);
  const [keyName, setKeyName] = React.useState('');

  const handleResultVariableChange = (newResultVariable) => {
    setResultVariable(newResultVariable)
    setNodeDetails(latest => {
      latest['details']['resultVariable'] = newResultVariable['key'];
      return latest;
    })
  }

  const handleKeyNameChange = (newKeyName) => {
    setKeyName(newKeyName);
    setNodeDetails(latest => {
      latest['details']['keyName'] = newKeyName;
      return latest;
    });
  }

  React.useEffect(() => {
    let newResultVariable = (typeof nodeInfo['details']['resultVariable'] !== "undefined")
      ? variables.find(v => v['key'] === nodeInfo['details']['resultVariable'])
      : DEFAULT_NEW_JSON_VALUE;
    setResultVariable(newResultVariable);

    let keyName = (typeof nodeInfo['details']['keyName'] !== "undefined")
      ? variables.find(v => v['key'] === nodeInfo['details']['keyName'])
      : '';
    setKeyName(keyName);
  }, [nodeInfo])

  return (
    <GetJsonValueStyled>
      <div style={{ height:"45px" }}>
        <Dropdown options={variables} value={resultVariable} onChange={handleResultVariableChange} placeholder={"Variável Destino"} hasNewValueOption={true} onNewValueOptionClick={openVariableCreationModal} iconSizes={{ height: '18px', width: '18px' }} />
      </div>
      <Input
        value={keyName}
        onChange={handleKeyNameChange}
        placeholder="Chave"
      />
    </GetJsonValueStyled>
  )
}
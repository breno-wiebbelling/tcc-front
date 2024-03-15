import React from "react";
import ValueSelectorStyled from "./styled"
import Dropdown from "../../../../../../form/dropdown";
import MathValueTypeEnum from "./mathValueTypeEnum";
import VariableCreationModal from "../../../../../../variable/creation/variableCreationModal";

import { getVariablesByUser } from "../../../../../../../service/clients/variableClient";

export default ({ value, setValue, valueType, setValueType }) => {

  const [variables, setVariables] = React.useState([])
  const [variableCreationModalOpen, setVariableCreationModalOpen] = React.useState(false);

  const handleInputValueChange = (event) => {
    setValue(event.target.value);
  }

  const handleDropdownValueChange = (newValue) => {
    setValue(newValue);
  }

  React.useEffect(() => {
    setVariables(getVariablesByUser(""));
  }, []);

  const onCloseVariableCreationModal = () => {
    setVariableCreationModalOpen(false);
  }

  // const options = [
  //   { value: 1, label: "Primeira", key: 1  },
  //   { value: 2, label: "Segunda", key: 2  },
  //   { value: 3, label: "Terceira", key: 3  },
  // ];

  return (
    <ValueSelectorStyled>
      {
        valueType.code === MathValueTypeEnum.NUMBER.code
        && (
          <input
            className="input"
            placeholder="Digite um número"
            type="number"
            onChange={handleInputValueChange}
          />
        )
      }
      {
        valueType.code === MathValueTypeEnum.VARIABLE.code
        && (
          <div className="dropdown-valuetype">
            <Dropdown
              options={variables}
              value={value}
              placeholder="Selecione uma variável"
              onChange={handleDropdownValueChange}
              hasNewValueOption={true}
              className="dropdown"
              onNewValueOptionClick={() => { setVariableCreationModalOpen(true) }}
            />
          </div>
        )
      }
      <div className='variable-type-selector'>
        <div className='variable-type-selector-names'>
          <p className='variable-type-selector-name' onClick={() => { setValueType(MathValueTypeEnum.NUMBER) }}>Número</p>
          <p className='variable-type-selector-name' onClick={() => { setValueType(MathValueTypeEnum.VARIABLE) }}>Variável</p>

          <div
            className='variable-type-selector-indicator'
            style={{
              left: (valueType.code === MathValueTypeEnum.NUMBER.code) ? 0 : null,
              right: (valueType.code === MathValueTypeEnum.VARIABLE.code) ? 0 : null
            }}
          >
            <p>{valueType.name}</p>
          </div>
        </div>
      </div>
      <VariableCreationModal isOpen={variableCreationModalOpen} setIsOpen={setVariableCreationModalOpen} onClose={onCloseVariableCreationModal} />
    </ValueSelectorStyled>
  )
}
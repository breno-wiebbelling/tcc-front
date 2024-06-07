import React from "react";
import ValueSelectorStyled from "./styled"
import Dropdown from "../../../../../../form/dropdown";
import MathValueTypeEnum from "./mathValueTypeEnum";
import Tooltip from "@mui/material/Tooltip";

export default ({ value, setValue, valueType, setValueType, placeHolder, variables, setVariableCreationModalOpen }) => {

  const handleInputValueChange = (event) => { setValue(event.target.value); }
  const handleDropdownValueChange = (newValue) => { setValue(newValue); }

  return (
    <ValueSelectorStyled>
      {
        valueType.code === MathValueTypeEnum.NUMBER.code
        && (
          <Tooltip title={`Valor da ${placeHolder}`} disableInteractive>
            <input
              className="input"
              placeholder="Digite um número"
              value={value}
              type="number"
              onChange={handleInputValueChange}
            />
          </Tooltip>
        )
      }
      {
        valueType.code === MathValueTypeEnum.VARIABLE.code
        && (
          <div className="dropdown-valuetype" >
            <Dropdown options={variables} value={value} placeholder={placeHolder} onChange={handleDropdownValueChange} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => { setVariableCreationModalOpen(true) }} isEnabled={true} tooltipTitle={`Valor da ${placeHolder}`} />
          </div>
        )
      }
      <Tooltip title={`Tipo da ${placeHolder}`} disableInteractive>
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
      </Tooltip>
    </ValueSelectorStyled>
  )
}
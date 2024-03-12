import React  from 'react';
import MathSelectorStyled from "./styled";
import ValueSelector from "./valueSelector/index.jsx";
import TypeValuesEnum from "./valueSelector/mathValueTypeEnum";
import MathOperationEnum from "./MathOperationEnum";
import Dropdown from "../../../../../form/dropdown";

export default ({  }) => {
  const [firstValueType, setFirstValueType] = React.useState(TypeValuesEnum.NUMBER);
  const [firstValue, setFirstValue] = React.useState("");
  const [secondValueType, setSecondValueType] = React.useState(TypeValuesEnum.VARIABLE);
  const [secondValue, setSecondValue] = React.useState("");
  const [mathOperation, setMathOperation] = React.useState("");
  const mathOptions = [
    {key: MathOperationEnum.ADD.code,   value: MathOperationEnum.ADD.code,  label: MathOperationEnum.ADD.name},
    {key: MathOperationEnum.SUB.code,   value: MathOperationEnum.SUB.code,  label: MathOperationEnum.SUB.name},
    {key: MathOperationEnum.MULT.code,  value: MathOperationEnum.MULT.code, label: MathOperationEnum.MULT.name},
    {key: MathOperationEnum.DIV.code,   value: MathOperationEnum.DIV.code,  label: MathOperationEnum.DIV.name},
  ]

  const onMathSelection = (newMathValue) => {
    console.log(newMathValue)
    // setMathOperation(newMathValue)
  }

  return (
    <MathSelectorStyled>
      <div className="node-details-line"></div>
      <h2>Detalhes Matemáticos</h2>
      <ValueSelector value={firstValue} valueType={firstValueType}  setValueType={setFirstValueType}  setValue={setFirstValue}/>
      <div className="dropdown-math-operation">
        <Dropdown placeholder="Operação Matemática" options={mathOptions} value={mathOperation}  onChange={onMathSelection} />
      </div>
      <ValueSelector value={secondValue} valueType={secondValueType} setValueType={setSecondValueType} setValue={setSecondValue}/>
      <div className="node-details-line"></div>
    </MathSelectorStyled>
  )
}
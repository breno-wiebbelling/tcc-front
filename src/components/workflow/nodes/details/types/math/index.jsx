import React from 'react';
import MathSelectorStyled from "./styled";
import ValueSelector from "./valueSelector/index.jsx";
import TypeValuesEnum from "./valueSelector/mathValueTypeEnum";
import MathOperationEnum from "./MathOperationEnum";
import Dropdown from "../../../../../form/dropdown";
import { getVariablesByUserAndTypeAndSimulationId } from "../../../../../../service/clients/variableClient";
import VariableTypeEnum from "../../../../../variable/VariableTypeEnum";
import VariableCreationModal from "../../../../../variable/creation/variableCreationModal";

const mathOptions = [
  { key: MathOperationEnum.ADD.code, value: MathOperationEnum.ADD.code, label: MathOperationEnum.ADD.name },
  { key: MathOperationEnum.SUB.code, value: MathOperationEnum.SUB.code, label: MathOperationEnum.SUB.name },
  { key: MathOperationEnum.MULT.code, value: MathOperationEnum.MULT.code, label: MathOperationEnum.MULT.name },
  { key: MathOperationEnum.DIV.code, value: MathOperationEnum.DIV.code, label: MathOperationEnum.DIV.name },
]
const DEFAULT_RESULT_VARIABLE = { key: 'key', label:'Variável Resultado', value: "none"};

const processValue = (value, valueType) => {

  if (valueType === "var") {
    return value.key;
  }

  return value;
}

const receiveValue = (value, valueType, variables) => {

  if (valueType === "var") {
    return variables.filter(v => v['key'] === value)[0]
  }

  return value;
}

export default ({ nodeInfo, setNodeDetails, nodeDetails }) => {
  const [variables, setVariables] = React.useState([])
  const [page, setPage] = React.useState(0);
  const [variableCreationModalOpen, setVariableCreationModalOpen] = React.useState(false);
  const closeVariableCreationModal = () => { setVariableCreationModalOpen(false); }

  const [firstValueType, setFirstValueType] = React.useState(TypeValuesEnum.NUMBER);
  const [firstValue, setFirstValue] = React.useState(0);
  const [mathOperation, setMathOperation] = React.useState({ key: MathOperationEnum.NONE.code, value: MathOperationEnum.NONE.code, label: MathOperationEnum.NONE.name });
  const [secondValueType, setSecondValueType] = React.useState(TypeValuesEnum.NUMBER);
  const [secondValue, setSecondValue] = React.useState(0);
  const [resultVariable, setResultVariable] = React.useState(DEFAULT_RESULT_VARIABLE);

  const loadUserVariables = () => {
    return getVariablesByUserAndTypeAndSimulationId(page, nodeInfo['simulationId'], VariableTypeEnum.NUMBER.code)
      .then(userVariables => {
        let filteredVariables = userVariables.list.map(v => {
          return { key: v['_id'], label: v['name'], value: v['value'] }
        });

        setVariables(filteredVariables)
        return filteredVariables;
      })
  }

  const handleVariableCreation = () => {
    closeVariableCreationModal();
    loadUserVariables();
  }

  React.useEffect(() => {
    loadUserVariables().then(userVariables => {
      setPage(0);
      setVariableCreationModalOpen(false);

      if (typeof nodeDetails.mathOperation != 'undefined') {
        setFirstValueType(TypeValuesEnum.getByCode(nodeDetails.firstValue.firstValueType));
        setFirstValue(receiveValue(nodeDetails.firstValue.firstValue, nodeDetails.firstValue.firstValueType, userVariables));
        setMathOperation(MathOperationEnum.getDropdownOptionByCode(nodeDetails.mathOperation));
        setSecondValueType(TypeValuesEnum.getByCode(nodeDetails.secondValue.secondValueType));
        setSecondValue(receiveValue(nodeDetails.secondValue.secondValue, nodeDetails.secondValue.secondValueType, userVariables));
        setResultVariable(receiveValue(nodeDetails.resultVariable, "var", userVariables));
      }
    });
  }, [nodeInfo]);

  React.useEffect(() => {
    setNodeDetails(latestDetails => {

      return {
        ...latestDetails,
        "firstValue": {
          "firstValueType": (firstValueType.code),
          "firstValue": (processValue(firstValue, firstValueType.code))
        },
        "secondValue": {
          "secondValueType": (secondValueType.code),
          "secondValue": (processValue(secondValue, secondValueType.code))
        },
        "mathOperation": (mathOperation.key),
        "resultVariable": (resultVariable && resultVariable.key ) ? (resultVariable.key) : ''
      }
    })
  }, [firstValue, secondValue, resultVariable, mathOperation])

  return (
    <MathSelectorStyled>
      <div className="node-details-line"></div>

      <h3>Detalhes Matemáticos</h3>
      <ValueSelector value={firstValue} valueType={firstValueType} setValueType={setFirstValueType} setValue={setFirstValue} nodeInfo={nodeInfo} placeHolder={"Primeira Variável"} loadUserVariables={loadUserVariables} variables={variables} setVariableCreationModalOpen={setVariableCreationModalOpen} />
      <div className="dropdown-math-operation">
        <Dropdown placeholder="Operação Matemática" tooltipTitle={"Operação Matemática"} options={mathOptions} value={mathOperation} onChange={setMathOperation} isEnabled={true} />
      </div>
      <ValueSelector value={secondValue} valueType={secondValueType} setValueType={setSecondValueType} setValue={setSecondValue} nodeInfo={nodeInfo} placeHolder={"Segunda Variável"} loadUserVariables={loadUserVariables} variables={variables} setVariableCreationModalOpen={setVariableCreationModalOpen} />

      <div className="dropdown-math-operation">
        <Dropdown options={variables} value={resultVariable} placeholder={"Variável Destino"} tooltipTitle={"Variável Destino"} onChange={setResultVariable} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => { setVariableCreationModalOpen(true) }} isEnabled={true} />
      </div>

      <VariableCreationModal isOpen={variableCreationModalOpen} close={closeVariableCreationModal} onCreate={handleVariableCreation} simulationId={nodeInfo['simulationId']} />
      <div className="node-details-line"></div>
    </MathSelectorStyled>
  )
}
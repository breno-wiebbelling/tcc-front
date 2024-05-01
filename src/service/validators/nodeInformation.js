import NodeDetailsTypeEnum from "../../components/workflow/nodes/details/types/typeDetailsEnum";
import MathOperationEnum from "../../components/workflow/nodes/details/types/math/MathOperationEnum";

import { validateStringValue } from "../../components/form/formValidators";
import { validateNewUriInfo } from "../clients/nodeClient";

const validateMathTypeDetails = (nodeInformation, setError) => {
  if (nodeInformation.details.mathOperation === MathOperationEnum.NONE.code) {
    setError('Selecione uma operação matemática!')
    return false;
  }

  if (typeof nodeInformation.details.resultVariable == 'undefined') {
    setError('Selecione a variável destino!')
    return false;
  }

  return true
}

const validateInputTypeDetails = async (nodeInformation, setError) => {
  if (nodeInformation['details']['uriInfo'].length === 0) {
    setError('Adicione informações URI!');
    return false;
  }

  if (!(await validateNewUriInfo(nodeInformation))) {
    setError('Você já possui uma simulação com essa URI!');
    return false;
  }

  return true;
}

const validateConditionalTypeDetails = (nodeInformation, setError) => {

  if (typeof nodeInformation['details']['conditionalDetails']   === "undefined"
    || typeof nodeInformation['details']['conditionalClosure']  === "undefined"
    || typeof nodeInformation['details']['conditionalDetails']['comparisonDetails'] === "undefined"
    || typeof nodeInformation['details']['conditionalDetails']['type']    === "undefined"
    || typeof nodeInformation['details']['conditionalDetails']['options'] === "undefined"
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['comparison']['key']
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['firstVariable']['key']
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['secondVariable']['key']
  ){
    setError("Algo de errado aconteceu! Tente novamente!")
  
    return false;
  }

  nodeInformation['details']['conditionalDetails']['options'].map(option => {
    if(option['option']['key']){
      option.option = option.option.key
    }

    return option;
  })

  return true;
}

const validateType = async (nodeInformation, setError) => {

  if (nodeInformation.type === NodeDetailsTypeEnum.NONE.code) {
    setError('Selecione um tipo!');
    return false;
  }

  if (nodeInformation.type === NodeDetailsTypeEnum.MATH.code && !validateMathTypeDetails(nodeInformation, setError)) {
    return false;
  }

  if (nodeInformation.type === NodeDetailsTypeEnum.START.code && !(await validateInputTypeDetails(nodeInformation, setError))) {
    return false;
  }

  if (nodeInformation.type === NodeDetailsTypeEnum.COND.code && !validateConditionalTypeDetails(nodeInformation, setError)) {
    return false
  }

  return true;
}

const nameValidator = (nodeInformation, setError) => {
  if (String(nodeInformation.name) === 'Nova tarefa!') {
    setError("Adicione um nome!")
    return false;
  }

  return validateStringValue(nodeInformation.name, setError, 'Adicione um nome!')
}

export const validateNodeInformation = async (nodeInformation, setError) => {

  return nameValidator(nodeInformation, setError) && (await validateType(nodeInformation, setError));
}
import NodeDetailsTypeEnum from "../../components/workflow/nodes/details/types/typeDetailsEnum";
import MathOperationEnum from "../../components/workflow/nodes/details/types/math/MathOperationEnum";

import { validateStringValue } from "../../components/form/formValidators";
import { validateNewUriInfo } from "../clients/nodeClient";
const allEqual = arr => arr.every(val => val === arr[0]);

const validateMathTypeDetails = (nodeInformation, setError) => {
  if (nodeInformation.details.mathOperation === MathOperationEnum.NONE.code) {
    setError('Selecione uma operação matemática!')
    return false;
  }

  if (typeof nodeInformation.details.resultVariable == 'undefined') {
    setError('Selecione a variável destino!')
    return false;
  }

  return true;
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
  if (
    typeof nodeInformation['details']['conditionalClosure'] === "undefined" 
    || typeof nodeInformation['details']['conditionalDetails']   === "undefined"
    || typeof nodeInformation['details']['conditionalDetails']['comparisonDetails'] === "undefined"
  ){
    setError("Adicione uma Condição!");
    return false;
  }

  if (
    typeof nodeInformation['details']['conditionalDetails']['comparisonDetails']['firstVariable'] === "undefined" 
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['firstVariable']['key']
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['firstVariable'] === 'key'
  ){
    setError("Adicione a primeira variável na Condição");
    return false;
  }

  if (
    typeof nodeInformation['details']['conditionalDetails']['comparisonDetails']['comparison'] === "undefined" 
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['comparison']['key']
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['comparison'] === 'key'
  ){
    setError("Adicione a comparação na Condição");
    return false;
  }

  if (
    typeof nodeInformation['details']['conditionalDetails']['comparisonDetails']['secondVariable'] === "undefined" 
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['secondVariable']['key']
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['secondVariable'] === 'key'
  ){
    setError("Adicione a segunda variável na Condição");
    return false;
  }

  if(typeof nodeInformation['details']['conditionalDetails']['options'] === "undefined"){
    setError("Selecione as opções da Comparação");
    return false;
  }

  if(nodeInformation['details']['conditionalDetails']['options'].map(op => op.option).includes('key')){
    setError("Selecione todas opções da Comparação");
    return false;
  }

  if(allEqual(nodeInformation['details']['conditionalDetails']['options'].map(op => op.option)) && nodeInformation['details']['conditionalDetails']['options'][0]['option'] !== 'temp' ){
    setError("As opções da Comparação não podem ser iguais");
    return false;
  }

  nodeInformation['details']['conditionalDetails']['options'].map(option => {
    if (option['option']['key']) {
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
import NodeDetailsTypeEnum from "../../components/workflow/nodes/details/types/typeDetailsEnum";
import MathOperationEnum from "../../components/workflow/nodes/details/types/math/MathOperationEnum";

import { validateStringValue } from "../../components/form/formValidators";
import { validateNewUriInfo } from "../clients/nodeClient";
import HttpOperationEnum from "../../components/workflow/nodes/details/types/input/HttpOperationEnum";
const allEqual = arr => arr.every(val => val === arr[0]);

const validateMathTypeDetails = (nodeInformation, setError) => {
  if (nodeInformation.details.firstValue.firstValueType === "var" && typeof nodeInformation.details.firstValue.firstValue === "undefined"){
    setError('Adicione o primeiro valor!')
    return false;
  }

  if (nodeInformation.details.mathOperation === MathOperationEnum.NONE.code) {
    setError('Selecione uma operação matemática!')
    return false;
  }

  if (nodeInformation.details.secondValue.secondValueType === "var" && typeof nodeInformation.details.secondValue.secondValue === "undefined"){
    setError('Adicione o segundo valor!')
    return false;
  }

  if (typeof nodeInformation.details.resultVariable === 'undefined' || nodeInformation.details.resultVariable  === 'key' ) {
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

  if(nodeInformation['details']['httpMethod'] === HttpOperationEnum.POST.code && typeof nodeInformation['details']['inputVariable'] === "undefined" ){
    setError('Adicione a variável de entrada!');
    return false;
  }
  console.log(nodeInformation)

  if (!(await validateNewUriInfo(nodeInformation))) {
    setError('Você já possui uma simulação com essa URI!');
    return false;
  }

  return true;
}

const validateConditionalTypeDetails = (nodeInformation, setError) => {
  if (
    typeof nodeInformation['details']['conditionalClosure'] === "undefined"
    || typeof nodeInformation['details']['conditionalDetails'] === "undefined"
    || typeof nodeInformation['details']['conditionalDetails']['comparisonDetails'] === "undefined"
  ) {
    setError("Adicione uma Condição!");
    return false;
  }

  if (
    typeof nodeInformation['details']['conditionalDetails']['comparisonDetails']['firstVariable'] === "undefined"
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['firstVariable']['key']
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['firstVariable'] === 'key'
  ) {
    setError("Adicione a primeira variável na Condição");
    return false;
  }

  if (
    typeof nodeInformation['details']['conditionalDetails']['comparisonDetails']['comparison'] === "undefined"
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['comparison']['key']
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['comparison'] === 'key'
  ) {
    setError("Adicione a comparação na Condição");
    return false;
  }

  if (
    typeof nodeInformation['details']['conditionalDetails']['comparisonDetails']['secondVariable'] === "undefined"
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['secondVariable']['key']
    || nodeInformation['details']['conditionalDetails']['comparisonDetails']['secondVariable'] === 'key'
  ) {
    setError("Adicione a segunda variável na Condição");
    return false;
  }

  if (typeof nodeInformation['details']['conditionalDetails']['options'] === "undefined") {
    setError("Selecione as opções da Comparação");
    return false;
  }

  if (nodeInformation['details']['conditionalDetails']['options'].map(op => op.option).includes('key')) {
    setError("Selecione todas opções da Comparação");
    return false;
  }

  if (allEqual(nodeInformation['details']['conditionalDetails']['options'].map(op => op.option)) && nodeInformation['details']['conditionalDetails']['options'][0]['option'] !== 'temp') {
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

const validateTextTypeDetails = (nodeInformation, setError) => {
  if (nodeInformation['details']['textElements'].length <= 0) {
    setError("Insira operações de texto!")
    return false;
  }

  if (nodeInformation['details']['resultVariable'] === 'key') {
    setError("Selecione a variável de destino!")
    return false;
  }

  return true;
}

const validateJsonTypeDetails = (nodeInformation, setError) => {
  if( typeof nodeInformation['details']['jsonVariable'] === 'undefined'){
    setError('Selecione uma variável json!');
    return false;
  }

  if( typeof nodeInformation['details']['jsonOperationMode'] === 'undefined'){
    setError('Selecione a operação json!');
    return false;
  }

  if( nodeInformation['details']['jsonOperationMode'] === 'get'){
    if( typeof nodeInformation['details']['keyName'] === 'undefined'){
      setError('Insira a chave de consultada');
      return false;
    }

    if(typeof nodeInformation['details']['resultVariable'] === 'undefined'){
      setError('Insira a variável resultado');
      return false;
    }
  }

  if( nodeInformation['details']['jsonOperationMode'] === 'edit'){
    if(typeof nodeInformation['details']['jsonOperations'] === 'undefined' ||  nodeInformation['details']['jsonOperations'].length === 0 ){
      setError('Insira alterações no Json!');
      return false;
    }
  }

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

  if (nodeInformation.type === NodeDetailsTypeEnum.TEXT.code && !validateTextTypeDetails(nodeInformation, setError)) {
    return false;
  }

  if (nodeInformation.type === NodeDetailsTypeEnum.JSON.code && !validateJsonTypeDetails(nodeInformation, setError)) {
    return false;
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
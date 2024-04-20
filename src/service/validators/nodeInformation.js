import NodeDetailsTypeEnum from "../../components/workflow/nodes/details/types/typeDetailsEnum";
import MathOperationEnum from "../../components/workflow/nodes/details/types/math/MathOperationEnum";

import { validateStringValue } from "../../components/form/formValidators";
import { validateNewUriInfo } from "../clients/nodeClient";

const validateMathTypeDetails = (nodeInformation, setError) => {
  if(nodeInformation.details.mathOperation === MathOperationEnum.NONE.code){
    setError('Selecione uma operação matemática!')
    return false;
  }

  if(typeof nodeInformation.details.resultVariable == 'undefined'){
    setError('Selecione a variável destino!')
    return false;
  }

  return true
}

const validateInputTypeDetails = async (nodeInformation, setError) => {
  if(nodeInformation['details']['uriInfo'].length === 0){
    setError('Adicione informações URI!');
    return false;
  }

  if(!(await validateNewUriInfo(nodeInformation))){
    setError('Você já possui uma simulação com essa URI!');
    return false;
  }

  return true;
}

const validateConditionalTypeDetails = (nodeInformation, setError) => {
  return true;
}

const validateType = async (nodeInformation, setError) => {

  if(nodeInformation.type === NodeDetailsTypeEnum.NONE.code){
    setError('Selecione um tipo!');
    return false;
  }

  if(nodeInformation.type === NodeDetailsTypeEnum.MATH.code && !validateMathTypeDetails(nodeInformation, setError)){
    return false;
  }
  
  if(nodeInformation.type === NodeDetailsTypeEnum.START.code && !(await validateInputTypeDetails(nodeInformation, setError)) ){
    return false;
  }

  if(nodeInformation.type === NodeDetailsTypeEnum.COND.code && !validateConditionalTypeDetails(nodeInformation, setError)){
    return false
  }

  return true;
}

const nameValidator = (nodeInformation, setError) => {
  if(String(nodeInformation.name) === 'Nova tarefa!') {
    setError("Adicione um nome!")
    return false;
  }

  return validateStringValue(nodeInformation.name, setError, 'Adicione um nome!')
}

export const validateNodeInformation = async (nodeInformation, setError) => {

  return nameValidator(nodeInformation, setError) && (await validateType(nodeInformation, setError));
}
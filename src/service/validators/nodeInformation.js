import { validateStringValue } from "../../components/form/formValidators";
import NodeDetailsTypeEnum from "../../components/workflow/nodes/details/types/typeDetailsEnum";
import MathOperationEnum from "../../components/workflow/nodes/details/types/math/MathOperationEnum";
const validateMathTypeDetails = (nodeInformation, setError) => {
  if(nodeInformation.details.mathOperation === MathOperationEnum.NONE.code){
    setError('Selecione uma operação matemática!')
    return false;
  }

  if(typeof  nodeInformation.details.resultVariable == 'undefined'){
    setError('Selecione a variável destino!')
    return false;
  }

  return true
}

const validateType = (nodeInformation, setError) => {

  if(nodeInformation.type === NodeDetailsTypeEnum.NONE.code){
    setError('Selecione um tipo!');
    return false;
  }

  if(nodeInformation.type === NodeDetailsTypeEnum.MATH.code && !validateMathTypeDetails(nodeInformation, setError)){
    return false;
  }

  if(nodeInformation.type === NodeDetailsTypeEnum.COND.code && true){
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

export const validateNodeInformation = (nodeInformation, setError) => {

  return nameValidator(nodeInformation, setError) && validateType(nodeInformation, setError);
}
import { nodeKeys } from "../../../managers/nodeManager";

const typeDetailsValues = {
  MATH: {
    code: nodeKeys.TASK_KEY,
    name: "Matemática"
  },
  COND:{
    code: nodeKeys.CONDITIONAL_KEY,
    name: "Condicional"
  },
  START:{
    code: nodeKeys.START_KEY,
    name: "Entrada"
  },
  NONE: {
    code:"none",
    name:"Tipo"
  }
}

const getOptionType = (code) => {
  switch (code){
    case typeDetailsValues.MATH.code:
      return typeDetailsValues.MATH
    case typeDetailsValues.COND.code:
      return typeDetailsValues.COND
    case typeDetailsValues.START.code:
      return typeDetailsValues.START
    default:
      return typeDetailsValues.NONE
  }
}

export default Object.freeze({
  ...typeDetailsValues,
  getDropdownOptionByCode : (code) => {
    let optionType = getOptionType(code);
    return { value: optionType.code, label: optionType.name, key: optionType.code } ;
  }
});
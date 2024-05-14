import { nodeKeys } from "../../../managers/nodeManager";

const typeDetailsValues = {
  MATH: {
    code: nodeKeys.MATH_KEY,
    name: "Matemática"
  },
  COND:{
    code: nodeKeys.CONDITIONAL_KEY,
    name: "Comparação"
  },
  START:{
    code: nodeKeys.START_KEY,
    name: "Entrada"
  },
  TEXT:{
    code: nodeKeys.TEXT_KEY,
    name: "Textual"
  },
  END:{
    code: nodeKeys.FINAL_KEY,
    name: "Saída"
  },
  JSON:{
    code: nodeKeys.JSON_KEY,
    name: 'Json'
  },
  NONE: {
    code:"none",
    name:"Tipo"
  }
}

const getOptionType = (code) => {
  switch (code){
    case typeDetailsValues.MATH.code:
      return typeDetailsValues.MATH;
    case typeDetailsValues.COND.code:
      return typeDetailsValues.COND;
    case typeDetailsValues.START.code:
      return typeDetailsValues.START;
    case typeDetailsValues.TEXT.code:
      return typeDetailsValues.TEXT;
    case typeDetailsValues.END.code:
      return typeDetailsValues.END;
    case typeDetailsValues.JSON.code:
      return typeDetailsValues.JSON;
    default:
      return typeDetailsValues.NONE;
  }
}

export default Object.freeze({
  ...typeDetailsValues,
  getDropdownOptionByCode : (code) => {
    let optionType = getOptionType(code);
    return { value: optionType.code, label: optionType.name, key: optionType.code } ;
  }
});
const mathOperationEnumValues = {
  MULT: {
    code: "mult",
    name: "Multiplicação"
  },
  DIV:{
    code: "div",
    name: "Divisão"
  },
  ADD: {
    code:"add",
    name:"Adição"
  },
  SUB:{
    code: "sub",
    name: "Subtração"
  },
  NONE: {
    code: "none",
    name: "Operação Matemática"
  }
}

export default Object.freeze({
  ...mathOperationEnumValues,
  getDropdownOptionByCode: (code) => {
    switch (code){
      case mathOperationEnumValues.MULT.code:
        return {key: mathOperationEnumValues.MULT.code,  value: mathOperationEnumValues.MULT.code,  label: mathOperationEnumValues.MULT.name}
      case mathOperationEnumValues.DIV.code:
        return {key: mathOperationEnumValues.DIV.code,   value: mathOperationEnumValues.DIV.code,   label: mathOperationEnumValues.DIV.name}
      case mathOperationEnumValues.SUB.code:
        return {key: mathOperationEnumValues.SUB.code,   value: mathOperationEnumValues.SUB.code,   label: mathOperationEnumValues.SUB.name}
      case mathOperationEnumValues.ADD.code:
        return {key: mathOperationEnumValues.ADD.code,   value: mathOperationEnumValues.ADD.code,   label: mathOperationEnumValues.ADD.name}
      default:
        return {key: mathOperationEnumValues.NONE.code,  value: mathOperationEnumValues.NONE.code,  label: mathOperationEnumValues.NONE.name}
    }
  }
});
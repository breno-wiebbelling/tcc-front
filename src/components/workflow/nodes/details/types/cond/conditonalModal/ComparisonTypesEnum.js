const compTypesEnumValues = {
  EQUAL: {
    code: "eq",
    name: "Igual"
  },
  MINOR:{
    code: "min",
    name: "Menor"
  },
  MAJOR: {
    code:"maj",
    name:"Maior"
  },
  MINEQ:{
    code: "mineq",
    name: "Menor ou Igual"
  },
  MAJEQ: {
    code: "majeq",
    name: "Maior ou Igual"
  },
  NONE: {
    code: "key",
    name: "Comparação"
  }
}

export default Object.freeze({
  ...compTypesEnumValues,
  getDropdownOptionByCode: (code) => {
    switch (code){
      case compTypesEnumValues.EQUAL.code:
        return {key: compTypesEnumValues.EQUAL.code,  value: compTypesEnumValues.EQUAL.code,  label: compTypesEnumValues.EQUAL.name}
      case compTypesEnumValues.MINOR.code:
        return {key: compTypesEnumValues.MINOR.code,   value: compTypesEnumValues.MINOR.code,   label: compTypesEnumValues.MINOR.name}
      case compTypesEnumValues.MAJOR.code:
        return {key: compTypesEnumValues.MAJOR.code,   value: compTypesEnumValues.MAJOR.code,   label: compTypesEnumValues.MAJOR.name}
      case compTypesEnumValues.MINEQ.code:
        return {key: compTypesEnumValues.MINEQ.code,   value: compTypesEnumValues.MINEQ.code,   label: compTypesEnumValues.MINEQ.name}
      case compTypesEnumValues.MAJEQ.code:
        return {key: compTypesEnumValues.MAJEQ.code,  value: compTypesEnumValues.MAJEQ.code,  label: compTypesEnumValues.MAJEQ.name}
      default:
        return {key: compTypesEnumValues.NONE.code,  value: compTypesEnumValues.NONE.code,  label: compTypesEnumValues.NONE.name}
    }
  },
  options: [
    {key: compTypesEnumValues.EQUAL.code,  value: compTypesEnumValues.EQUAL.code,  label: compTypesEnumValues.EQUAL.name},
    {key: compTypesEnumValues.MINOR.code,  value: compTypesEnumValues.MINOR.code,  label: compTypesEnumValues.MINOR.name},
    {key: compTypesEnumValues.MAJOR.code,  value: compTypesEnumValues.MAJOR.code,  label: compTypesEnumValues.MAJOR.name},
    {key: compTypesEnumValues.MINEQ.code,  value: compTypesEnumValues.MINEQ.code,  label: compTypesEnumValues.MINEQ.name},
    {key: compTypesEnumValues.MAJEQ.code,  value: compTypesEnumValues.MAJEQ.code,  label: compTypesEnumValues.MAJEQ.name}
  ],
  defaultOption: {key: compTypesEnumValues.NONE.code,  value: compTypesEnumValues.NONE.code,  label: compTypesEnumValues.NONE.name}

});
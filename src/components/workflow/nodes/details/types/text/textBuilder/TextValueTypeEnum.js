const textValueTypesOptions = {
  TEXT: {
    code:"text",
    name:"Valor em texto"
  },
  VARIABLE: {
    code: "var",
    name: "Valor em variável",
  },
}

const getByCode = (code) => {
  switch (code){
    case textValueTypesOptions.VARIABLE.code:
      return textValueTypesOptions.VARIABLE;
    default:
      return textValueTypesOptions.TEXT;
  }
}

export default Object.freeze({
  ...textValueTypesOptions,
  getByCode,
  getOptionByCode: (code)=> {
    let typeEnum = getByCode(code);
    return {key: typeEnum.code, value: typeEnum.code, label: typeEnum.name};
  }
});
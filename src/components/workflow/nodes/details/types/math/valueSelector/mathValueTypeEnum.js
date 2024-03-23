const mathValueTypesOptions = {
  NUMBER: {
    code:"num",
    name:"Número"
  },
  VARIABLE: {
    code: "var",
    name: "Variável",
  }
}

export default Object.freeze({
  ...mathValueTypesOptions,
  getByCode(code){
    if(String(code) === mathValueTypesOptions.VARIABLE.code){
      return mathValueTypesOptions.VARIABLE;
    }
    else{
      return mathValueTypesOptions.NUMBER;
    }
  }
});
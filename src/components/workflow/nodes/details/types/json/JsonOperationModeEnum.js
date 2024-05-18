const jsonOperationModeOptions = {
  GET: {
    key:"get",
    label:"Consultar",
    value:"Consultar chave e atribuir em variável"
  },
  EDIT: {
    key: "edit",
    label: "Editar",
    value: "Editar valores do Json",
  },
}

const getByCode = (code) => {
  switch (code){
    case jsonOperationModeOptions.GET.key:
      return jsonOperationModeOptions.GET;
    default:
      return jsonOperationModeOptions.EDIT;
  }
}

const dropdownOptions = [
  {key: jsonOperationModeOptions.EDIT.key, value: jsonOperationModeOptions.EDIT.value, label: jsonOperationModeOptions.EDIT.label},
  {key: jsonOperationModeOptions.GET.key , value: jsonOperationModeOptions.GET.value , label: jsonOperationModeOptions.GET.label }
]

export default Object.freeze({
  ...jsonOperationModeOptions,
  dropdownOptions: dropdownOptions,
  getByCode,
  getOptionByCode: (code)=> {
    let optionEnum = getByCode(code);
    return {key: optionEnum.key, value: optionEnum.value, label: optionEnum.label};
  }
});
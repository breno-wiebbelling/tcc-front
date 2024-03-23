const httpOperationEnumValues = {
  GET: {
    code: "get",
    name: "GET"
  },
  POST:{
    code: "post",
    name: "POST"
  },
}

const getHttpMethod = (code) => {
  switch (code){
    case httpOperationEnumValues.POST.code:
      return httpOperationEnumValues.POST;
    default:
      return httpOperationEnumValues.GET;
  }
}

export default Object.freeze({
  ...httpOperationEnumValues,
  getDropdownOptionByCode: (code) => {
    let httpMethod = getHttpMethod(code);
    return {key: httpMethod.code, value: httpMethod.code, label: httpMethod.name};
  },
  dropdownOptions: [
    {key: httpOperationEnumValues.POST.code, value: httpOperationEnumValues.POST.code, label: httpOperationEnumValues.POST.name},
    {key: httpOperationEnumValues.GET.code,  value: httpOperationEnumValues.GET.code,  label: httpOperationEnumValues.GET.name}
  ]
});
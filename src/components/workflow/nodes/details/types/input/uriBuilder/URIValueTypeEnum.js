import {getBezierPath} from "reactflow";

const uriValueTypesOptions = {
  PATH: {
    code:"path",
    name:"Path parameter"
  },
  QUERY: {
    code: "query",
    name: "Query parameter",
  },
  URI: {
    code: "uri",
    name: "Caminho URI",
  },
}

export default Object.freeze({
  ...uriValueTypesOptions,
  getByCode(code){
    switch (code){
      case uriValueTypesOptions.PATH.code:
        return uriValueTypesOptions.PATH;
      case uriValueTypesOptions.QUERY.code:
        return uriValueTypesOptions.QUERY;
      default:
        return uriValueTypesOptions.URI;
    }
  },
  dropdownOptions:[
    {key: uriValueTypesOptions.PATH.code,   value: uriValueTypesOptions.PATH.code,   label: uriValueTypesOptions.PATH.name},
    {key: uriValueTypesOptions.QUERY.code,  value: uriValueTypesOptions.QUERY.code,  label: uriValueTypesOptions.QUERY.name},
    {key: uriValueTypesOptions.URI.code,    value: uriValueTypesOptions.URI.code,    label: uriValueTypesOptions.URI.name}
  ],
  getOptionByCode: (code)=>{
    let typeEnum = this.getByCode(code);
    return {key: typeEnum.code, value: typeEnum.code, label: typeEnum.name};
  }
});
import URIValueTypeEnum from "./URIValueTypeEnum";

export const formatUriDisplay = (uriInfo) => {
  try{
    console.log(uriInfo)
    let uriType = (typeof uriInfo.type.key == "undefined" ? uriInfo.type : uriInfo.type.key);
    let displayValue = (typeof uriInfo.value.display == "undefined") ? "" : uriInfo.value.display; 

    switch (uriType) {
      case URIValueTypeEnum.QUERY.code:
        let querySeparator = (uriInfo.index > 0) ? "?" : "&";
        let variableName = (typeof uriInfo.value.variable.label == "undefined") ? "" : uriInfo.value.variable.label;

        return `${querySeparator}${displayValue}=<${variableName}>`;
      case URIValueTypeEnum.PATH.code:
        return `/{${displayValue}}`;
      default:
        return `/${displayValue}`;
    }
  }catch (e){
    console.log(e.message)
  }
}

export const formatURIInfo = (uriInfo, index) => {
  return {
    display: formatUriDisplay(uriInfo),
    raw: {...uriInfo, index: index}
  }
}
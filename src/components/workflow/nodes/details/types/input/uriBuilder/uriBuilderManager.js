import URIValueTypeEnum from "./URIValueTypeEnum";

export const formatUriDisplay = (uriInfo) => {
  try{
    let uriType = (typeof uriInfo.raw.type.key == "undefined" ? uriInfo.raw.type : uriInfo.raw.type.key);
    let displayValue = (typeof uriInfo.raw.value.label == "undefined") 
      ? ""  
      : uriInfo.raw.value.label; 

    switch (uriType) {
      case URIValueTypeEnum.QUERY.code:
        let variableName = (uriInfo.raw.value.variable == "") ? "" : uriInfo.raw.value.variable.label;

        return `&${displayValue}=<${variableName}>`;
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
    uiDisplay: formatUriDisplay(uriInfo),
    raw: {
      type: uriInfo.raw.type.value,
      value: formatUriValue(uriInfo),
    },
    index: index
  }
}

export const formatUriValue = (uriInfo) => {
  let variableValue = {}

  if(typeof uriInfo.raw.value != "undefined" && typeof uriInfo.raw.value.label != "undefined"){
    variableValue['label'] = uriInfo.raw.value.label ;
  }

  if(typeof uriInfo.raw.value != "undefined" && typeof uriInfo.raw.value.variable != "undefined" && typeof uriInfo.raw.value.variable.key != "undefined"){
    variableValue['variable'] = uriInfo.raw.value.variable.key;
  } 

  return variableValue;
}

export const getUrisByType = (uriElements, type) => {
  return uriElements
    .filter(ue => ue.raw.type === type)
    .sort((a, b) => a.index + b.index);
}

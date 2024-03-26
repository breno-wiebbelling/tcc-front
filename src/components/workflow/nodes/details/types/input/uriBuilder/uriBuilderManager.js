import URIValueTypeEnum from "./URIValueTypeEnum";

export const formatUri = (uriInfo) => {
  try{
    switch (uriInfo.type) {
      case URIValueTypeEnum.QUERY.code:
        let querySeparator = (uriInfo.index > 0) ? "?" : "&";
        return `${querySeparator}${uriInfo.value.display}=${uriInfo.value.variable}`;
      case URIValueTypeEnum.PATH.code:
        return `/{${uriInfo.value.display}}/`;
      default:
        return `/${uriInfo.value}`;
    }
  }catch (e){
    console.log(e.message)
  }
}

export const formatURIInfo = (uriInfo, index) => {
  return {
    display: formatUri(uriInfo),
    raw: {...uriInfo, index: index}
  }
}
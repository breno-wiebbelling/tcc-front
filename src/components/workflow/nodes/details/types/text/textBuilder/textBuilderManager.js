import TextValueTypeEnum from "./TextValueTypeEnum";

export const formatUriDisplay = (textInfo) => {
  switch(textInfo.type){
    case TextValueTypeEnum.VARIABLE.code:
      return `{${textInfo.value.label}}`
    default:
      return textInfo.value
  }
}

export const formatTextInfo = (textInfo) => {  
  let textType = textInfo.type.key;
  let formattedInfo = {
    ...textInfo,
    type: textType,
    value: formatTextValue(textInfo, textType),
  }

  return {
    ...formattedInfo,
    uiDisplay: formatUriDisplay(formattedInfo)
  }
}

export const formatTextValue = (textInfo, textType) => {
  return (TextValueTypeEnum.TEXT.code === textType)
    ? textInfo.value
    : { label: textInfo.value.label, variable: textInfo.value.key }
}
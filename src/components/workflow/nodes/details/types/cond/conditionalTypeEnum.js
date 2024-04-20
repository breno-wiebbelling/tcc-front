const typeDetailsValues = {
  BOOL: {
    code: "boolean",
    name: "Boolean"
  },
  SWITCH:{
    code: "switch",
    name: "Switch"
  }
}

const getOptionType = (code) => {
  switch (code){
    case typeDetailsValues.BOOL.code:
      return typeDetailsValues.BOOL
    case typeDetailsValues.SWITCH.code:
      return typeDetailsValues.SWITCH
  }
}

export default Object.freeze({
  ...typeDetailsValues,
  getDropdownOptionByCode : (code) => {
    let optionType = getOptionType(code);
    return { value: optionType.code, label: optionType.name, key: optionType.code } ;
  }
});
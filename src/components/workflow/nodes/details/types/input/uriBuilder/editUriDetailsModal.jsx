import React from 'react';
import { Modal, Box, IconButton, Button, setRef } from '@mui/material';
import PopperAlert from '../../../../../../alert/index';

import {smoke, smokeHover, smokeWhite, vividRed, vividRedHover, white} from "../../../../../../common/style";
import CloseIcon from '@mui/icons-material/Close';
import URIValueTypeEnum from "./URIValueTypeEnum";
import Dropdown from "../../../../../../form/dropdown";
import Input from "../../../../../../form/rawInput/index";
import {formatUriDisplay, formatURIInfo} from "./uriBuilderManager";
import { validateStringValue } from '../../../../../../form/formValidators';

const style = { width: '40%', minWidth: '500px', height: '80%', p: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", outline: "none" };

const handleVariableChange = (newVariable, setNewUriInfo) => {
  setNewUriInfo(latest =>{
    return {
      ...latest,
      raw: {
        ...latest.raw,
        value: {
          ...latest.raw.value,
          variable: newVariable
        }
      }
    };
  })
}

const handleLabelChange = (newDisplayValue, setNewUriInfo) => {
  setNewUriInfo(latest => {
    return {
      ...latest,
      raw: {
        ...latest.raw,
        value: {
          ...latest.raw.value,
          label: newDisplayValue
        }
      }
    };
  })
}

const setUriTypeAndValue = (newType, setNewUriInfo) => {
  setNewUriInfo(latest => {
    return {
      ...latest,
      raw: {
        ...latest.raw,
        type: newType,
        value: URIValueTypeEnum.getValuePresetByCode(newType.key),
      }
    };
  })
}

const setUiDisplay = (newDisplay, setNewUriInfo) => {
  setNewUriInfo(latest => {
    return { 
      ...latest,
      uiDisplay: newDisplay
    };
  })
}

const getVariableById = (uriInformation, variables) => {
  if(typeof uriInformation.raw.value.variable != "undefined"){
    let variableId = uriInformation.raw.value.variable;

    return variables.filter(v=>v['key'] == variableId)[0]
  }

  return ""
}

export default ({ isOpen, close, onComplete, onDelete, validateQueryElementName, uriInfo, variables, openVariableCreationModal, isNewUri, httpMethod }) => {
  const [newUriInfo, setNewUriInfo] = React.useState({ "uiDisplay": "/", "raw": { "value": { "label": "", "variable" : "" }, "type": "" } , "index": 0 });

  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }
  const setError = (errMsg) => { setAlertInfo({ mode: 'error', msg: errMsg }) }

  const validateQueryNameEligibility = (newName) => {
    if(
      ( isNewUri && !validateQueryElementName(newName) )
      ||
      ( !isNewUri && validateQueryElementName(newName, newUriInfo['index']) )
    )
    {
      return false;
    }

    return true;
  }

  const handleSubmit = () => { 
    if(
      (newUriInfo.raw.type == URIValueTypeEnum.QUERY.code || newUriInfo.raw.type.key == URIValueTypeEnum.QUERY.code)
      && !validateQueryNameEligibility(newUriInfo.raw.value.label)
    )
    {
      return
    }

    onComplete(formatURIInfo(newUriInfo, newUriInfo.index)); 
  }
  const handleDelete = () => { onDelete(newUriInfo.index) }

  const handleQueryUriDisplayChange = (newDisplayValue) => {
    newDisplayValue = String(newDisplayValue).toLowerCase();
    validateStringValue(newDisplayValue, setError, "Insira uma chave");
    handleLabelChange(newDisplayValue, setNewUriInfo);
    validateQueryNameEligibility(newDisplayValue);
  }
  
  const resetUriInfoFields = (newInfo) => {
    setNewUriInfo(latest=>{
      return {
        ...latest,
        uiDisplay: newInfo.uiDisplay,
        index:newInfo.index,
        raw: {
          ...latest.raw,
          type: URIValueTypeEnum.getOptionByCode(newInfo['raw']['type']),
          value: {
            ...latest.raw.value,
            label: newInfo.raw.value.label,
            variable: getVariableById(newInfo, variables)
          }
        }
      };
    })

    setUiDisplay(formatUriDisplay(newInfo), setNewUriInfo);
  }

  React.useEffect(()=>{
    resetUriInfoFields(uriInfo);
  },[uriInfo])

  React.useEffect(()=>{
    setUiDisplay(formatUriDisplay(newUriInfo), setNewUriInfo);
  }, [newUriInfo.raw.value])

  return (
    <div>
      {alertInfo.msg !== "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}
      <Modal open={isOpen} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" className='modal'>
        <Box sx={style}>
          <div style={{width: "100%", height: "10%"}}>
            <IconButton className='display_flex_center' onClick={close} sx={{width: "40px", height: "40px", backgroundColor: smokeWhite, borderRadius: "50%", color: white, cursor: "pointer", "&:hover": {backgroundColor: smoke}, "&:active": {backgroundColor: smokeHover} }}>
              <CloseIcon/>
            </IconButton>
          </div>
          <div className="content" style={{width: "60%", height: "90%"}}>
            <h3>Edição de URI</h3>
            <div style={{ height: "45px", marginTop: "10px" }}>
              <Dropdown className={'uri-type-selector-dropdown'} value={newUriInfo.raw.type} tooltipTitle={'Tipo de URI'} hasNewValueOption={false} options={URIValueTypeEnum.getOptionsByMethodHttp(httpMethod.key)} isEnabled={true} onChange={(newValue)=>{ setUriTypeAndValue(newValue, setNewUriInfo) }} />
            </div>
              {
                newUriInfo.raw.type.value === URIValueTypeEnum.URI.code &&
                (
                  <Input onChange={(event)=>{ handleLabelChange(event.target.value.split(" ").join(""), setNewUriInfo) }} value={newUriInfo.raw.value.label} type={"text"} tooltipTitle={"Valor do Caminho URI"} placeholder={"Valor do Caminho URI"}/>
                )
              }
              {
                newUriInfo.raw.type.value === URIValueTypeEnum.PATH.code &&
                (
                  <div>
                    <Input onChange={(event)=>{ handleLabelChange(event.target.value.split(" ").join(""), setNewUriInfo, setError) }} value={newUriInfo.raw.value.label} type={"text"} tooltipTitle={"Valor do path parameter"} placeholder={"Valor do path parameter"}/>
                    <div style={{ height: '45px', display: 'flex' }}>
                      <Dropdown options={variables} value={newUriInfo.raw.value.variable} placeholder={"Variável Destino"} tooltipTitle={"Variável Destino"} onChange={(selectedVariable)=>{ handleVariableChange(selectedVariable, setNewUriInfo) }} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => { openVariableCreationModal() }} isEnabled={true}  />
                    </div>
                  </div>
                )
              }
              {
                newUriInfo.raw.type.value === URIValueTypeEnum.QUERY.code &&
                (
                  <div>
                    <Input onChange={(event)=>{ handleQueryUriDisplayChange(event.target.value.split(" ").join("")) }} value={newUriInfo.raw.value.label} type={"text"} tooltipTitle={"Valor do query parameter"} placeholder={"Valor do query parameter"}/>
                    <div style={{ height: '45px', display: 'flex' }}>
                      <Dropdown options={variables} value={newUriInfo.raw.value.variable} placeholder={"Variável Destino"} tooltipTitle={"Variável Destino"} onChange={(selectedVariable)=>{ handleVariableChange(selectedVariable, setNewUriInfo) }} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => { openVariableCreationModal() }} isEnabled={true}  />
                    </div>
                  </div>
                )
              }
            <div style={{ marginTop: "5%" }}>
              URI final: { newUriInfo.uiDisplay }
            </div>
          </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "20px"}}>
            <Button type="submit" sx={{mt: 3, mb: 1, fontWeight: 600, letterSpacing: "2px", backgroundColor: smokeHover, "&:hover": {backgroundColor: smoke}}} variant="contained" onClick={handleSubmit} >
              Salvar
            </Button>
            {
              !isNewUri &&
              (
                <Button type="delete" sx={{mt: 3, mb: 1, fontWeight: 600, letterSpacing: "2px", backgroundColor: vividRed, "&:hover": {backgroundColor: vividRedHover}}} variant="contained" onClick={handleDelete} >
                  Deletar
                </Button>
              )
            }
          </div>
        </Box>
      </Modal>
    </div>
  )
}

import React from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import PopperAlert from '../../../../../../alert/index';

import {smoke, smokeHover, smokeWhite, vividRed, vividRedHover, white} from "../../../../../../common/style";
import CloseIcon from '@mui/icons-material/Close';
import URIValueTypeEnum from "./URIValueTypeEnum";
import {
  validateDangerousChars,
  validateStringValue,
  validateJSON,
  validateNumberValue
} from "../../../../../../form/formValidators";
import Dropdown from "../../../../../../form/dropdown";
import Input from "../../../../../../form/rawInput/index";
import {formatUri, formatURIInfo} from "./uriBuilderManager";

const style = { width: '40%', minWidth: '600px', height: '80%', p: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", outline: "none" };

const handlePathUriDisplayChange = (newDisplayValue, setNewUriInfo) => {
  setNewUriInfo(latest => {
    return {
      ...latest,
      value: {
        ... latest.value,
        display: newDisplayValue
      }
    };
  })
}

const handlePathUriVariableChange = (newVariable, setNewUriInfo) => {
  setNewUriInfo(latest =>{
    return {
      ...latest,
      value: {
        ...latest.value,
        variable: newVariable
      }
    }
  })
}

const setUriValue = (newValue, setNewUriInfo) => {
  setNewUriInfo( latest => {
    return {
      ...latest,
      value: newValue
    };
  })
}

const setUriType = (newType, setNewUriInfo) => {
  setNewUriInfo( latest => {
    return {
      ...latest,
      value: URIValueTypeEnum.getValuePresetByCode(newType.value),
      type: newType
    };
  })
}

const setUriIndex = (uriInfo, setNewUriInfo) => {
  setNewUriInfo(latest => {
    return {
      ...latest,
      index: uriInfo['raw']['index']
    }
  })
}

export default ({ isOpen, close, onComplete, onDelete, simulationId, uriInfo, variables, openVariableCreationModal, isNewUri }) => {
  const [newUriInfo, setNewUriInfo] = React.useState({ type: '', value: '', index: 0});
  const [uriValueError, setUriValueError] = React.useState('');
  const [formattedURI, setFormattedURI] = React.useState('');

  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }

  const handleSubmit = () => {
    onComplete(formatURIInfo(newUriInfo, newUriInfo.index));
  }

  const handleDelete = () => {
    onDelete(newUriInfo.index)
  }

  React.useEffect(() => {
    setFormattedURI(formatUri(newUriInfo));
  }, [newUriInfo])

  const resetUriInfoFields = () => {
    setUriType(URIValueTypeEnum.getOptionByCode(uriInfo['raw']['type']), setNewUriInfo);
    setUriValue(
      (
        ( typeof uriInfo['raw']['value'] == 'undefined')
          ? ''
          : uriInfo['raw']['value']
      ),
      setNewUriInfo
    );
    setUriIndex(uriInfo, setNewUriInfo)
  }

  React.useEffect(()=>{
    if(typeof uriInfo['raw'] != 'undefined'){
      resetUriInfoFields();
    }
  },[uriInfo])

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
              <Dropdown className={'uri-type-selector-dropdown'} value={newUriInfo.type} tooltipTitle={'Tipo de URI'} hasNewValueOption={false} options={URIValueTypeEnum.dropdownOptions} isEnabled={true} onChange={(newValue)=>{ setUriType(newValue, setNewUriInfo) }} />
            </div>
              {
                newUriInfo.type.value === URIValueTypeEnum.URI.code &&
                (
                  <Input onChange={(event)=>{ setUriValue(event.target.value.split(" ").join(""), setNewUriInfo) }} value={newUriInfo.value} type={"text"} tooltipTitle={"Valor do Caminho URI"} placeholder={"Valor do Caminho URI"} error={uriValueError} />
                )
              }
              {
                newUriInfo.type.value === URIValueTypeEnum.PATH.code &&
                (
                  <div>
                    <Input onChange={(event)=>{ handlePathUriDisplayChange(event.target.value.split(" ").join(""), setNewUriInfo) }} value={newUriInfo.value.display} type={"text"} tooltipTitle={"Valor do path parameter"} placeholder={"Valor do path parameter"} error={uriValueError} />
                    <div style={{ height: '45px', display: 'flex' }}>
                      <Dropdown options={variables} value={newUriInfo.value.variable} placeholder={"Variável Destino"} tooltipTitle={"Variável Destino"} onChange={(selectedVariable)=>{ handlePathUriVariableChange(selectedVariable, setNewUriInfo) }} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => { openVariableCreationModal() }} isEnabled={true}  />
                    </div>
                  </div>
                )
              }
            <div style={{ marginTop: "5%" }}>
              URI final: {formattedURI}
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

import React from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import PopperAlert from '../../../../../../alert/index';

import {smoke, smokeHover, smokeWhite, vividRed, vividRedHover, white} from "../../../../../../common/style";
import CloseIcon from '@mui/icons-material/Close';
import TextValueTypeEnum from "./TextValueTypeEnum";
import Dropdown from "../../../../../../form/dropdown";
import {formatTextInfo} from "./textBuilderManager";
import Textarea from "../../../../../../form/rawTextarea";

const style = { width: '40%', minWidth: '500px', height: '80%', p: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", outline: "none" };

const setUriType = (newType, setNewTextInfo) => {
  setNewTextInfo(latest => {
    return {
      ...latest,
      type: newType,
    };
  })
}

const setTextValue = (newValue, setNewTextInfo) => {
  setNewTextInfo(latest => {
    return {
      ...latest,
      value: newValue,
    };
  })
}

const getTextValue = (newInfo, type, variables) => {

  if( type.key === TextValueTypeEnum.VARIABLE.code){
    return variables.filter(v=>v['key'] === newInfo['value']['variable'])[0]
  }

  return newInfo.value;
}

const textOptions = [
  {key: TextValueTypeEnum.VARIABLE.code ,value: TextValueTypeEnum.VARIABLE.name  ,label: TextValueTypeEnum.VARIABLE.name  },
  {key: TextValueTypeEnum.TEXT.code     ,value: TextValueTypeEnum.TEXT.name      ,label: TextValueTypeEnum.TEXT.name      }
]

export default ({ isOpen, close, onComplete, onDelete, textInfo, variables, openVariableCreationModal }) => {
  const [newTextInfo, setNewTextInfo] = React.useState({ "uiDisplay": "", "type": "", "value": "", "isNew":false, "index": 0 });

  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }

  const handleSubmit = () => { onComplete(formatTextInfo(newTextInfo)); }
  const handleDelete = () => { onDelete(newTextInfo.index) }

  const resetTextInfoFields = (newInfo) => {

    setNewTextInfo(latest=> {
      let newType = TextValueTypeEnum.getOptionByCode(newInfo['type']);
      let newValue = getTextValue(newInfo, newType, variables);
      let formated = {
        type: newType,
        value: newValue,
        index: newInfo.index,
        isNew: newInfo.isNew,
        uiDisplay: newInfo.uiDisplay
      }
      return formated
    });
  }

  React.useEffect(()=>{
    resetTextInfoFields(textInfo);
  },[textInfo])

  return (
    <div>
      {alertInfo.msg !== "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}
      <Modal open={isOpen} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" className='modal'>
        <Box sx={style}>
          <div style={{width: "100%", height: "10%"}}>
            <IconButton className='display_flex_center' onClick={close} sx={{
              width: "40px",
              height: "40px",
              backgroundColor: smokeWhite,
              borderRadius: "50%",
              color: white,
              cursor: "pointer",
              "&:hover": {backgroundColor: smoke},
              "&:active": {backgroundColor: smokeHover}
            }}>
              <CloseIcon/>
            </IconButton>
          </div>
          <div className="content" style={{width: "60%", height: "90%"}}>
            <h3>Edição de Texto</h3>
            <div style={{height: "45px", marginTop: "10px"}}>
              <Dropdown className={'text-type-selector-dropdown'} value={newTextInfo.type} tooltipTitle={'Tipo de Texto'} hasNewValueOption={false} options={textOptions} isEnabled={true} onChange={(newValue) => { setUriType(newValue, setNewTextInfo) }}/>
            </div>
            {
              newTextInfo.type.key === TextValueTypeEnum.TEXT.code &&
              (
                <Textarea
                  value={newTextInfo.value}
                  onChange={(event)=>{ setTextValue(event.target.value, setNewTextInfo) }}
                  placeholder={"Valor em Texto"}
                />
              )
            }
            {
              newTextInfo.type.key === TextValueTypeEnum.VARIABLE.code &&
              (
                <div style={{ height: '45px', display: 'flex',  marginTop: "10px" }}>
                  <Dropdown options={variables} value={newTextInfo.value} placeholder={"Variável selecionada"} tooltipTitle={"Variável selecionada"} onChange={(selectedVariable)=>{ setTextValue(selectedVariable, setNewTextInfo) }} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => { openVariableCreationModal() }} isEnabled={true}  />
                </div>
              )
            }
          </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "20px"}}>
            <Button type="submit" sx={{
              mt: 3,
              mb: 1,
              fontWeight: 600,
              letterSpacing: "2px",
              backgroundColor: smokeHover,
              "&:hover": {backgroundColor: smoke}
            }} variant="contained" onClick={handleSubmit}>
              Salvar
            </Button>
            {
              newTextInfo.isNew == false &&
              (
                <Button type="delete" sx={{
                  mt: 3,
                  mb: 1,
                  fontWeight: 600,
                  letterSpacing: "2px",
                  backgroundColor: vividRed,
                  "&:hover": {backgroundColor: vividRedHover}
                }} variant="contained" onClick={handleDelete}>
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
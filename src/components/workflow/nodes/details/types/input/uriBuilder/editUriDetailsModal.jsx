import React from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import PopperAlert from '../../../../../../alert/index';

import {smoke, smokeHover, smokeWhite, white} from "../../../../../../common/style";
import CloseIcon from "@mui/icons-material/Close";
import URIValueTypeEnum from "./URIValueTypeEnum";
import Tooltip from "@mui/material/Tooltip";
import {
  validateDangerousChars,
  validateStringValue,
  validateJSON,
  validateNumberValue
} from "../../../../../../form/formValidators";
import Dropdown from "../../../../../../form/dropdown";

const style = { width: '40%', height: '80%', p: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", outline: "none" };

export default ({ isOpen, close, onCreate, simulationId, uriInfo }) => {

  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});
  const [uriValue, setUriValue] = React.useState({});
  const [uriType, setUriType] = React.useState(URIValueTypeEnum.getOptionByCode(''));

  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }
  const handleSubmit = () => {

  }

  React.useEffect(()=>{
    setUriType(URIValueTypeEnum.getOptionByCode(uriInfo['uriType']));
    setUriValue(uriInfo['uriValue']);
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
            <div className='uri-type-dropdown' style={{ height: "45px" }}>
              <Dropdown className={'uri-type-selector-dropdown'} value={uriType} tooltipTitle={'Typo de URI'} hasNewValueOption={false} options={URIValueTypeEnum.dropdownOptions} isEnabled={true} onChange={setUriType}/>
            </div>

          </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button type="submit" sx={{mt: 3, mb: 1, fontWeight: 600, letterSpacing: "2px", backgroundColor: smokeHover, "&:hover": {backgroundColor: smoke}}} variant="contained" onClick={handleSubmit} >
              Salvar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

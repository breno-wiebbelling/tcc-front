import { LoginStyled } from "./styled"
import { vividRed, vividRedHover, vividRedHoverActive, vividGreen, softGreen } from "../../../components/common/style";

import React, { useCallback } from 'react';
import _ from 'lodash';
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/header/index";
import FieldEdition from "./fieldEdition/index.jsx";
import PopperAlert from "../../../components/alert/index.jsx"

import { getUserImage, updateUserImage, getUserInfo, validateHostEligibility, updateUserInfo } from "../../../service/clients/userClient";
import { verifyUserAndEmailEligibility } from "../../../service/validators/userValidator.js";

import AvatarContainer from "./avatarLogo/index";

const displayCenter = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }
const popAlertError = (e, setAlertInfo) => {
  if (e.message) {
    setAlertInfo({ msg: (e.message ?? "Algo de errado aconteceu!"), mode: 'error' });
  }
  else {
    setAlertInfo({ msg: (e ?? "Algo de errado aconteceu!"), mode: 'error' });
  }
}

export default () => {
  const navigate = useNavigate();

  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: '' });
  const [userInfo, setUserInfo] = React.useState({ "username": "", "email": "", "host": "" });
  const [userImageUrl, setUserImageUrl] = React.useState("");
  
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: '' }); }
  const popError = (e) => { popAlertError(e, setAlertInfo); }
  const popSuccess = (message) => { resetErrorMessage(); setAlertInfo({ msg: message, mode: 'ok' }); }

  const fileInputRef = React.useRef(null);
  const handleOpenFileInput = () => { fileInputRef.current.click(); };

  React.useEffect(() => {
    getUserInfo()
      .then(user => { setUserInfo(user) });
    getUserImage()
      .then(data => { setUserImageUrl(data) });
  }, []);

  const handleFileChange = async (event) => {
    if (event.target.files[0]) {
      await updateUserImage(event.target.files[0])
      let image = await getUserImage()
      setUserImageUrl(image)
      popSuccess("Foto alterada com sucesso!")
    }
  };

  const handleValueChange = useCallback(_.debounce(async (newValue, valueName) => {
    newValue = newValue.trim();
    setUserInfo(latest => ({
      ...latest,
      [valueName]: newValue
    }));
  
    let validationResult;
    if(valueName === "username" || valueName === "email"){
      validationResult = await verifyUserAndEmailEligibility({ "username": userInfo['username'], "email": userInfo['email'] });
    }
    
    if(valueName === "host"){
      validationResult = { host: await validateHostEligibility(newValue) };
    }

    if(validationResult[valueName] == false){
      popError('Host já registrado')
    }
  }, 500), [userInfo, setUserInfo, popError, verifyUserAndEmailEligibility, validateHostEligibility]);

  const handleUpload = async () => {
    let validationResult;
    validationResult = await verifyUserAndEmailEligibility({ "username": userInfo['username'], "email": userInfo['email'] });

    if(validationResult['username'] !== ''){
      popAlertError(validationResult['username'], setAlertInfo);
      return
    }
    if(validationResult['email'] !== ''){
      popAlertError(validationResult['email'], setAlertInfo);
      return
    }
    
    validationResult['host'] = await validateHostEligibility(userInfo['host']);
    if(!validationResult['host']){
      popAlertError("Host já registrado", setAlertInfo);
      return
    }

    await updateUserInfo(userInfo['username'], userInfo['email'], userInfo['host'])
    popSuccess("Dados alterados com sucesso!")
  }

  return (
    <LoginStyled>
      {alertInfo.msg != "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}
      <Header />
      <Container sx={{ display: "flex", height: '92vh', ...displayCenter }}>
        <Box className="container" style={{ height: "92%" }} >
          <Container sx={{ justifyContent: "flex-start", height: "90%", margin: "30px 0px" }}>
            <Container sx={{ mb: '25px' }}>
              <AvatarContainer userInfo={userInfo} userImageUrl={userImageUrl} handleOpenFileInput={handleOpenFileInput} />
            </Container>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            
            <div style={{ marginTop: "20%" }}>
              <FieldEdition
                fieldName={'username'}
                fieldValue={userInfo['username']}
                handleValueChange={handleValueChange}
              />
              <FieldEdition
                fieldName={'email'}
                fieldValue={userInfo['email']}
                handleValueChange={handleValueChange}
              />
              <FieldEdition
                fieldName={'host'}
                fieldValue={userInfo['host']}
                handleValueChange={handleValueChange}
              />
            </div>
          </Container>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: "30px" }}>
            <Button
              type="submit"
              onClick={() => { handleUpload() }}
              sx={{
                mt: 3, mb: 1,
                fontWeight: 600, letterSpacing: "2px",
                width: '45%', backgroundColor: vividGreen,
                textWeight: 400,
                '&:hover': { backgroundColor: softGreen , },
                '&:active': { backgroundColor: softGreen, },
              }}
              variant="contained"
            >
              Enviar
            </Button>
          </div>
        </Box>
      </Container>
    </LoginStyled>
  );
}
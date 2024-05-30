import { LoginStyled } from "./styled"

import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PopperAlert from '../../../components/alert/index';
import { useNavigate } from 'react-router-dom';
import { login } from "../../../service/clients/userClient";
import { PassInput } from "../../../components/form/input/index";
import { validateLoginCredentials } from "../../../service/validators/userValidator";
import { logout } from "../../../service/authService";
import { LoadingConsumer } from '../../../context/loadingContext';

const popAlertError = (e, setAlertInfo) => {
  if (e.message) {
    setAlertInfo({ msg: (e.message ?? "Algo de errado aconteceu!"), mode: 'error' });
  }
  else {
    setAlertInfo({ msg: (e ?? "Algo de errado aconteceu!"), mode: 'error' });
  }
}

export default () => {
  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: '' });
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: '' }); }

  const navigate = useNavigate();
  const loadingService = LoadingConsumer()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setFormErrors] = useState({ email: '', password: '' });
  const popError = (e) => { popAlertError(e, setAlertInfo); }

  const verifyLoginFields = () => {
    let loginValidatorResult = validateLoginCredentials({ email: email, password: password })
    if (Object.values(loginValidatorResult).every(erro => erro === '')) return true;

    setFormErrors(loginValidatorResult);
    return false
  }

  const handleSubmit = (e) => {
    if (verifyLoginFields()) {
      loadingService.show();

      login(email, password)
        .then(loginResponse => {
          if (loginResponse === true) { 
            navigate('/'); 
            loadingService.hide();
          }
          else{
            popError("E-mail e senha não combindam.")
          }
        })
        .catch(e => {
          popError(e);
          loadingService.hide();
        });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  React.useEffect(() => {
    logout();
  }, []);

  return (
    <LoginStyled className="base_page">
      {alertInfo.msg !== "" && <PopperAlert message={alertInfo.msg} mode={'error'} resetMessage={resetErrorMessage} />}

      <Container component="main" maxWidth="xs" className="login" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: '30px' }} >
            Login
          </Typography>
          <Container sx={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}  >
            <TextField
              margin="normal"
              fullWidth
              error={!!loginErrors.email}
              helperText={loginErrors.email}
              label="E-mail"
              onChange={(e) => { setEmail(e.target.value) }}
              autoFocus
              onKeyDown={handleKeyDown}
            />
            <PassInput
              label="Senha"
              error={loginErrors.password}
              onChange={(e) => { setPassword(e.target.value) }}
              onKeyDown={handleKeyDown}
            />
            <Button variant="contained" className="button" onClick={handleSubmit} >
              Entrar
            </Button>
            <Link href="/registro" variant="body2"> {"Ainda não possue uma conta? Crie uma!"} </Link>
          </Container>
        </Box>
      </Container>
    </LoginStyled>
  );
}
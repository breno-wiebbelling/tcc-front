import { LoginStyled } from "./styled"
import { vividRed, vividRedHover, vividRedHoverActive, smoke } from "../../../components/common/style";

import React from 'react';
import {Typography, Box, Button, Avatar, Container} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/header/index";
import { getUserImage, getUserInfo } from "../../../service/clients/userClient";

const displayCenter = {
  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
}

export default () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({ "username": "", "email": "", "host": "" });
  const [userInfoErrors, setUserInfoErrors] = React.useState({ "username":"", "email": "", "host": "" });
  const [userImageUrl, setUserImageUrl] = React.useState("");

  React.useEffect(()=>{
    getUserInfo()
      .then(user => {
        setUserInfo(user)
      })
    getUserImage()
      .then( data => {
        setUserImageUrl(data)
      });
  },[]);

  return (
    <LoginStyled>
      <Header/>
      <Container sx={{ display: "flex", height: '92vh', ...displayCenter }}>
        <Box className="container">
          <Container>
            <Typography coponent="h1" variant="h5"sx={{ fontWeight: 'bold'}}>
              Perfil
            </Typography>
          </Container>
          <Container sx={{ height: '60%', ...displayCenter, justifyContent: "flex-start" }}>
            <Avatar alt={`${userInfo.username}`} src={userImageUrl} sx={{ width: 100, height: 100, mb: 2, border: `4px solid ${smoke}` }} />
          </Container>
          <Button
            type="submit"
            onClick={ () => { navigate('/login') }}
            sx={{ 
              mt: 3,            mb: 1,
              fontWeight: 600,  letterSpacing:"2px",
              width: '100%',    backgroundColor: vividRed,
              textWeight: 400,
              '&:hover':{   backgroundColor: vividRedHover, },
              '&:active':{  backgroundColor: vividRedHoverActive,},
            }}
            variant="contained"
          >
            Sair
          </Button>
              
        </Box>
      </Container>
    </LoginStyled>
  );
}
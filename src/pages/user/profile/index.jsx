import { LoginStyled } from "./styled"
import { vividRed, vividRedHover, vividRedHoverActive } from "../../../components/common/style";

import React from 'react';
import {Box, Button} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/header/index";

export default () => {
  const navigate = useNavigate();

  return (
    <LoginStyled>
      <Header/>
      <Container sx={{ display: "flex", height: '92vh', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box className="container">
          <Typography component="h1" variant="h5"sx={{ fontWeight: 'bold'}}>
            Perfil
          </Typography>
          <Container  sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Button
              type="submit"
              sx={{ 
                mt: 3, 
                mb: 1,
                fontWeight: 600,
                letterSpacing:"2px",
                width: '80%',  
                backgroundColor: vividRed,
                textWeight: 400,
                '&:hover':{
                  backgroundColor: vividRedHover,
                },
                '&:active':{
                  backgroundColor: vividRedHoverActive,
                },
              }}
              variant="contained"
            >
              Sair
            </Button>
              
          </Container>
        </Box>
      </Container>
    </LoginStyled>
  );
}
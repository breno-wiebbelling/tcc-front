import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import HeaderStyled from './styled'
import Box from '@mui/material/Box';
import logo from './Restmup.png';

export default () => {
  const navigate = useNavigate();

  return (
    <HeaderStyled> 
      <Box className="left_box">
        <div className="icon" style={{ marginLeft: '-30px', marginRight: '30px' }}>
          <img style={{height: '80%'}} src={logo} alt="Logo" />
        </div>
        <div className="links">
          <a href='/'> INÍCIO </a>
        </div>
      </Box>
      <Box className="rigth_box" onClick={ () => {navigate('/perfil')} }>
        <IconButton sx={{ maxHeight: "98%" }}>
          <Avatar src="/static/images/avatar/2.jpg" sx={{ height: "5vh", width: "5vh" }}/>
        </IconButton>
      </Box>
    </HeaderStyled>
  );
};

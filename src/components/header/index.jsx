import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import HeaderStyled from './styled'
import Box from '@mui/material/Box';

export default () => {
  return (
    <HeaderStyled> 
      <Box className="left_box">
        <div className="icon">
          <SettingsEthernetIcon />
        </div>
        <div className="links">
          <a href='/'> INÍCIO </a>
        </div>
      </Box>
      <Box className="rigth_box">
        <IconButton sx={{ maxHeight: "98%" }}>
          <Avatar src="/static/images/avatar/2.jpg" sx={{ height: "5vh", width: "5vh" }}/>
        </IconButton>
      </Box>
    </HeaderStyled>
  );
};

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import Link from '@mui/material/Link';

import { white, smokeBlack } from '../common/style';

const pages = ['Projetos', 'Variáveis', 'Simulações'];

function ResponsiveAppBar() {

  const headerHeight = '8vh';

  return (
    <AppBar 
      position="static"
      sx={{
        "backgroundColor": white,
        "color":smokeBlack,
        "boxShadow":"none"
      }}
      
      >
      <Container
        sx={{
          maxHeight: headerHeight,
          display: 'flex',
          alignItems: 'center'
        }}
      >

        <SettingsEthernetIcon />

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', margin: '0px 20px' } }}>
          {pages.map((page) => (
            <Link 
              key={page} 
              sx={{ 
                color: smokeBlack, 
                display: 'block', 
                fontWeight:"600",
                textDecoration:"none"
              }}
            
            >
              {page}
            </Link>
          ))}
        </Box>

        <Box>
          <IconButton sx={{ maxHeight: "98%" }}>
            <Avatar
              sx={{ height: "5vh", width: "5vh" }}
              src="/static/images/avatar/2.jpg"
            />
          </IconButton>
        </Box>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

import React from 'react';
import { Box, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoStyled from './styled';
import { smokeWhiteHover, smokeWhite, smoke, smokeWhiteLightHover } from "../../common/style/index"
import IconButton from '@mui/material/IconButton';

export default ({ isOpen, setIsOpen, children }) => {

  const closePanel = () => {
    setIsOpen(false);
  }

  return (
    <InfoStyled>
      <div
        style={{
          "width": (isOpen) ? "30vw" : "0vw",
          "minWidth": "500px",
          "height":"100%",
        }}
      >

        {isOpen &&
          <Container
            sx={{
              "height":"100%",
              "widht": "100%"
            }}
          >
            <IconButton 
              onClick={closePanel}
              sx={{ 
                "backgroundColor": smokeWhiteLightHover,
                "marginTop": "15px",
                "marginBottom": "15px",
                "&:hover": {
                  "backgroundColor": smokeWhiteHover,
                },
                "&:active": {
                  "backgroundColor": smoke,
                } 

              }}
            >
              <AddIcon
                sx={{
                  "width": "25px",
                  "height": "25px",
                  "transform": "rotate(45deg)"
                }}
              />
            </IconButton>
              
            <Box 
              sx={{
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center",
                "height":"80%",
              }}
            >
              {children}
            </Box>
          </Container>
        }
      </div>
    </InfoStyled>
  )
}
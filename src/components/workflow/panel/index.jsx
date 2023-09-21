import React from 'react';
import { Box, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoStyled from './index';
import { smoke, white, smokeWhite, smokeWhiteHover } from "../../style/index"
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
          "height":"100%",
          "overflow": "hidden" 
        }}
      >

        {isOpen &&
          <Container
            sx={{
              "height":"100%"
            }}
          >
            <IconButton 
              onClick={closePanel}
              sx={{ 
                "backgroundColor": smoke,
                "color": white,
                "marginTop": "15px",
                "marginBottom": "15px",
                "&:hover": {
                  "backgroundColor": smokeWhite,
                } 
              }}
            >
              <CloseIcon
                sx={{
                  "width": "20px",
                  "height": "20px"
                }}
              />
            </IconButton>
              
            <Box 
              sx={{
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center",
                "height":"80%",
                "backgroundColor": smokeWhite,
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
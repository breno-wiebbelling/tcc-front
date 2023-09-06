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
          "transition": ".40s", 
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
                "background-color": smoke,
                "color": white,
                "margin-top": "15px",
                "margin-bottom": "15px",
                "&:hover": {
                  "background-color": smokeWhite,
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
                "align-items": "center",
                "justify-content": "center",
                "height":"80%",
                "background-color": smokeWhite,
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
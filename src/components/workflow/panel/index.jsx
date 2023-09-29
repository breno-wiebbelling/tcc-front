import React from 'react';
import { Box, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoStyled from './index';
import { smokeWhiteHover, smokeWhite, smoke, smokeBlack } from "../../common/style/index"
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
                "backgroundColor": smokeWhite,
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
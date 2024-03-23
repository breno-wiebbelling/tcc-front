import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { smoke, vividRed, vividGreen } from "../common/style/index";

const PopperAlert = ({ message, mode, resetMessage }) => {
  const [open, setOpen] = useState(true);
  let alertColor;

  switch (mode){
    case 'error':
      alertColor = vividRed;
      break;
    case "ok":
      alertColor = vividGreen;
      break;
    default: 
      alertColor = smoke;
      break;
  }

  const handleClose = (event, reason) => {
    setOpen(false);
    resetMessage();
  };
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Box
        sx={{
          height:'40px',
          borderRadius:"6px",
          padding:"0px 10px",

          display:"flex",
          alignItems:"center",
          justifyContent:"space-evenly",
          
          backgroundColor: alertColor,
          color: '#e8fffa',
          fontFamily:"Montserrat",
          fontSize:"13px",
          fontWeight:"500",
          whiteSpace:"nowrap",
        }}
      >
        {
          mode === 'ok' && (
            <AddTaskIcon
              fontSize="inherit"
              sx={{
                fontSize:"20px",
                margin:"0% 6px",
              }}
            />
          )
        }
        {
          mode !== 'ok' && (
            <ErrorOutlineIcon
              fontSize="inherit"
              sx={{
                fontSize:"20px",
                margin:"0% 6px",
              }}
            />
          )
        }
        {message}
        <CloseIcon 
          onClick={handleClose}
          fontSize="inherit" 
          sx={{ 
            fontSize:"20px",
            margin:"0% 6px",
            padding:"4px",
            borderRadius:"50%",
            "&:hover": {
              backgroundColor: '#00000027'
            },
          }} 
        />
      </Box>
    </Snackbar>
  );
};

export default PopperAlert;

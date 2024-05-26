import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export const PassInput = ({ label, value, onChange, error }) => {

  const [passVisible, setPassVisible] = useState(false)
  const changeVisibility = () => { setPassVisible(!passVisible) }

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={(passVisible ? "text" : "password")}
      error={!!error}
      helperText={error}
      margin="normal"
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={changeVisibility} aria-label="toggle password visibility">
              {passVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

  );
}
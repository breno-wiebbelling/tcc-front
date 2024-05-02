import React from "react";
import {Avatar, Container} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { smoke, denseSmokeBlack } from "../../../../components/common/style/index";

import IconButton from "@mui/material/IconButton";

const displayCenter = {
  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
}

export default ({userInfo, userImageUrl, handleOpenFileInput}) => {
  return (
    <Container sx={{ height: '12vh', ...displayCenter, justifyContent: "flex-start", position: 'relative' }}>
      <Avatar alt={`${userInfo.username}`} src={userImageUrl} sx={{ width: '12vh', height: '12vh', mb: 2, border: `4px solid ${smoke}` }} />
      <IconButton 
        sx={{ 
          width: '12vh', height: '12vh', position: 'absolute', borderRadius: '50%', mt: '3px',...displayCenter, opacity: 0, transition: '.2s',
          "&:hover": { backgroundColor: '#a0a0a0cf', opacity: 1 },
          "&:active": { backgroundColor: '#333333ac' }
        }}
        onClick={handleOpenFileInput}
      >
        <EditIcon style={{ width: "100%", height: "100%", color: denseSmokeBlack}} />
      </IconButton>
    </Container>
  )
}
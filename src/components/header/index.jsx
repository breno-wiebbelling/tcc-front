import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import HeaderStyled from './styled'
import Box from '@mui/material/Box';
import logo from './Restmup.png';
import { getUserImage } from "../../service/clients/userClient";
import { smoke } from '../common/style';

import ClickOutsideWrapper from "../common/ClickOutsideElement";

export default () => {
  const navigate = useNavigate();
  const [userImageUrl, setUserImageUrl] = React.useState("/static/images/avatar/2.jpg");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    getUserImage().then(url => {
      setUserImageUrl(url)
    })
  }, [])

  return (
    <HeaderStyled>
      <Box className="left_box">
        <div className="icon" style={{ marginLeft: '-30px', marginRight: '30px' }}>
          <img style={{ height: '80%' }} src={logo} alt="Logo" />
        </div>
        <div className="links">
          <a href='/'> INÍCIO </a>
        </div>
      </Box>
      <Box className="rigth_box" onClick={() => { setIsDropdownOpen(true) }}>
        <ClickOutsideWrapper onOutsideClick={() => { if (isDropdownOpen) { setIsDropdownOpen(false); } }} >

          <IconButton sx={{ maxHeight: "5vh", }}>
            <Avatar src={userImageUrl} sx={{ height: "6vh", width: "6vh", borderRadius: "50%", border: `2px solid ${smoke}` }} />
          </IconButton>
          {isDropdownOpen && (
            <div style={{ position: 'absolute', top: '8vh', right: '30px', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', backgroundColor: 'white' }} >
              <div onClick={()=>{ navigate('/perfil') }} className='dropdownOption' style={{ borderBottom: `1px solid ${smoke}` }} >Perfil</div>
              <div onClick={()=>{ navigate('/login')  }} className='dropdownOption' style={{ borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px' }}>Sair</div>
            </div>
          )}
        </ClickOutsideWrapper>
      </Box>
    </HeaderStyled>
  );
};

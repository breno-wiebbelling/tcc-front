import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import HeaderStyled from './styled'
import Box from '@mui/material/Box';
import logo from './Restmup.png';
import { getUserImage } from "../../service/clients/userClient";
import { smoke, smokeWhiteLight, smokeWhiteLightHover } from '../common/style';

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
          <IconButton sx={{ maxHeight: "5vh", cursor: 'pointer' }}>
            <Avatar src={userImageUrl} sx={{ height: "6vh", width: "6vh", borderRadius: "50%", border: `2px solid ${smoke}` }} />
          </IconButton>
          {isDropdownOpen && (
            <div style={{ borderRadius: '6px', position: 'absolute', cursor: 'pointer', top: '9vh', right: '40px', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', backgroundColor: 'white', zIndex: 2, fontSize: '13px' }} className='header_dropdown_options' >
              <div onClick={()=>{ navigate('/perfil') }} className='dropdownOption' style={{ borderBottom: `1px solid ${smoke}`, borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }} >Perfil</div>
              <div onClick={()=>{ navigate('/login')  }} className='dropdownOption' style={{ borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px' }}>Sair</div>
            </div>
          )}
        </ClickOutsideWrapper>
      </Box>
    </HeaderStyled>
  );
};

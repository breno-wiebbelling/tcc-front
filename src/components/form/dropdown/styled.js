import styled from "styled-components";
import {
  white,
  smokeWhite,
  smokeHover,
  whiteLightHover,
  smokeWhiteLight,
  smokeWhiteLightHover,
  whiteHover
} from "../../common/style";

export default styled.div`
  position: relative;
  
  width: 100%;
  height: 100%;
  padding: 0px 10px 0px 10px;
  box-sizing: border-box;
  
  font-size: 16px;
  border: 1px solid ${smokeWhite};
  border-radius: 8px;
  background-color: white;
  
  .dropdown-label-display,
  .dropdown-lable-display .dropdown-buttons,
  .dropdown-options .dropdown-option{
    display: flex;
    align-items: center;
  }
  
  .dropdown-label-display .dropdown-add-icon, 
  .dropdown-label-display .dropdown-drop-icon{
    width: 25px;
    height: 25px;
    border-radius: 50px;
    
    background-color: ${smokeWhiteLightHover};
    color: ${smokeHover};
    
    justify-content: center;
  }
  
  .dropdown-label-display{
    width: 100%;
    height: 100%;
    justify-content: space-between;
  }

  .dropdown-label-display .dropdown-add-icon{
    margin-left: 5px;    
  }

  .dropdown-label-display .dropdown-drop-icon {
    padding-left: 6px;
    box-sizing: border-box;
  }

  .dropdown-label-display .dropdown-placeholder{
    color: ${smokeHover};
  }

  .dropdown-options{
    z-index: 5;
    position: absolute;
    top: 43px;
    
    width: 100%;
    margin-left: -11px;
    
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    border: 1px solid ${smokeWhite};
    border-top: none;
    box-shadow: 1px 10px 10px 3px ${whiteLightHover};
    background-color: white;
  }

  .dropdown-options .dropdown-option{
    width: 100%;
    height: 40px;

    justify-content: center;
    background-color: ${white};
    border: 0px;
    border-bottom: 1px solid ${whiteLightHover};
  }
  
  .dropdown-options .dropdown-option:hover{
    background-color: ${whiteHover};
  }

`;
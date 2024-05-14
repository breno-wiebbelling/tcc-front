import styled from "styled-components";
import {
  white,
  smokeWhite,
  smokeWhiteHover,
  smoke,
  smokeHover,
  whiteLightHover,
  smokeWhiteLightHover,
  whiteHover,
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

    .dropdown-label-display,
    .dropdown-label-display .dropdown-buttons,
    .dropdown-options .dropdown-option {
        display: flex;
        align-items: center;
    }
    
    .dropdown-label-display .dropdown-buttons{
        width: fit-content;    
    }

  .dropdown-label-display .dropdown-add-icon, 
  .dropdown-label-display .dropdown-drop-icon{
    border-radius: 50px;
    
    color: ${smokeHover};
    justify-content: center;
  }
    
  .dropdown-label-display{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .dropdown-placeholder{
    max-width: 75%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dropdown-label-display .dropdown-add-icon{
    margin-left: 5px;    
  }

  .dropdown-label-display .dropdown-drop-icon {
    box-sizing: border-box;
    display: flex;
  }

  .dropdown-drop-icon, .dropdown-add-icon{
    background-color: ${smokeWhiteHover};
  }

  .dropdown-drop-icon:hover, .dropdown-add-icon:hover{
    background-color: ${smoke};
  }
  
  .dropdown-drop-icon:active, .dropdown-add-icon:active{
    background-color: ${smokeWhiteLightHover};
  }
  
  .dropdown-label-display .dropdown-placeholder{
    color: ${smokeHover};
  }

  .dropdown-options{
    z-index: 5;
    position: absolute;
    top: 97%;
    
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

  .dropdown-options .no_options_available{
    color: ${smokeHover};
    background-color: ${smokeWhiteLightHover};
  }

  .dropdown-options {
    max-height: 185px; 
    overflow-x: auto; 
    border-radius: 5px; 
    margin-bottom: 30px;
  }

  .dropdown-options::-webkit-scrollbar {
    width: 5px;  
    border-radius: 5px;   
  }

  .dropdown-options::-webkit-scrollbar-track {
    background-color: ${whiteLightHover};
  }  

  .dropdown-options::-webkit-scrollbar-thumb {
    background-color: ${smokeHover};
    border-radius: 5px;   
    border: none;   
  }

`;
import styled from "styled-components";
import { smokeWhite,   smokeHover,
  whiteLightHover } from "../../common/style/index";

export default styled.div`
  
  height:100%;
  width: 100%;
  border-top: 2px solid ${smokeWhite};
  box-sizing: border-box;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;  
    border-radius: 5px;   
  }

  &::-webkit-scrollbar-track {
    background-color: ${whiteLightHover};
  }  

  &::-webkit-scrollbar-thumb {
    background-color: ${smokeHover};
    border-radius: 5px;   
    border: none;   
  }

  .dropdown-math-operation{
    height: 45px;
  }

`
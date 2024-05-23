import styled from "styled-components";
import { smokeWhiteLight, smokeWhiteHover, smokeWhiteLightHover } from "../../../components/common/style/index";

export const CreationStyled = styled.div`
  
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(126,255,195,1) 0%, rgba(225,239,244,1) 100%);
    
    width: 100%;
    height: 100vh;
    font-family: 'Montserrat';
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .creation{
        display: flex;
        flex-direction: row;

        height: 90%;
        width: 100%;
        margin: 3%;

        background-color: rgba(255,255,255,1);
        border-radius: 6px;
        -webkit-box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
        -moz-box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
        box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
    }

    .creation .form-items{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        width: 100%;
        height: 100%'';
    }

    .creation .form-items button{
        margin-top: 30px;
    }

    .back_button { 
        background-color: ${smokeWhiteLightHover}; 
        transform: rotate(90deg);
    }
    .back_button:hover  { background-color: ${smokeWhiteLight}; }
    .back_button:active { background-color: ${smokeWhiteHover}; }

`
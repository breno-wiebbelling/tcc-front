import styled from "styled-components";
import { smokeWhiteLight, smokeWhiteHover, smokeWhiteLightHover, easyNavy, denseLightBlue } from "../../../components/common/style/index";
import backgroundImage from "./images/register_background.png"

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

    .welcome{
        width: 65%;
        padding-right: 5%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        color: white;

        background-image:  url(${backgroundImage});
        background-size: cover; 
        background-position: right center; 
        background-repeat: no-repeat; 
    }

    .welcome h3{
        font-family: 'Montserrat', sans-serif;
        font-size: 23px;
        margin-bottom: 15px;
    }

    .welcome img{
        margin-bottom: 40px;
    }

    .welcome .before{
        color: #e8ff2c;
        font-weight: 1000;
        font-family: 'JetBrains Mono', monospace;
    }

    .welcome p{
        max-width: 45%;
        text-align: center;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        letter-spacing: 1.5px;
    }

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

    .creation .form-items .continueButton{
        margin-top: 30px;
        font-weight: 600; 
        letter-spacing: 2px;
        background-color: ${easyNavy};
    }

    .creation .form-items .continueButton:hover{
        background-color: ${denseLightBlue};
    }

    .back_button { 
        background-color: ${smokeWhiteLightHover}; 
        transform: rotate(90deg);
    }
    .back_button:hover  { background-color: ${smokeWhiteLight}; }
    .back_button:active { background-color: ${smokeWhiteHover}; }

`
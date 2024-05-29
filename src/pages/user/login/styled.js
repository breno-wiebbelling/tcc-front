import styled from "styled-components"; 
import {easyNavy, denseLightBlue} from "../../../components/common/style/index";

export const LoginStyled = styled.div`
  
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(126,223,255,1) 0%, rgba(225,239,244,1) 100%);
    
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    .login{
        background-color: rgba(255,255,255,1);
        border-radius: 6px;
        padding: 40px;
        -webkit-box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
        -moz-box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
        box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
    }

    .login .button{
        margin: 20px 0px 30px 0px;

        font-weight: 600; 
        letter-spacing: 2px;
        background-color: ${easyNavy};
        width: 50%;
    }

    .login .button:hover{
        background-color: ${denseLightBlue};
    }
`
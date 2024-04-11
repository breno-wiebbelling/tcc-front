import styled from "styled-components";
import {smokeWhiteHover} from "../../../components/common/style/index"

export const LoginStyled = styled.div`
  
    background-color: ${smokeWhiteHover};
    
    width: 100%;
    height: 100vh;

    .container{
        background-color: rgba(255,255,255,1);
        border-radius: 6px;
        -webkit-box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
        -moz-box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
        box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        height: 80%;
        width: 500px;
    }
`
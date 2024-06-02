import styled from "styled-components";
import { blueBayoux, smokeBlack, smokeWhiteLightHover, smokeHover, smokeWhite, smoke } from "../../../components/common/style/index"

export const LoginStyled = styled.div`
  
    background-color: ${blueBayoux};
    
    width: 100%;
    height: 100vh;

    .container{
        background-color: rgba(255,255,255,1);
        border-radius: 6px;
        -webkit-box-shadow: 0px 0px 28px -3px ${smokeBlack};
        -moz-box-shadow: 0px 0px 28px -3px ${smokeBlack};
        box-shadow: 0px 0px 28px -3px ${smokeBlack};

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        padding: 0px 6%;

        height: 90%;
        width: 500px;
        box-sizing: border-box;
    }

    .container .fieldName{
        display: flex;
        align-items: center;
    }

    .container .fieldName .title{
        font-weight: bold;
        margin-right: 10px;
    }

    .edit_field_name_icon{
        width: 18px; 
        height: 18px; 
        padding: 1.4px;
        box-sizing: 'border-box';

        border-radius: 4px; 
        background-color: ${smokeWhiteLightHover}; 
        color: ${smokeHover};
    }

    .edit_field_name_icon:hover{
        background-color: ${smokeWhite}
    }

    .edit_field_name_icon:active{
        background-color: ${smoke}
    }
`
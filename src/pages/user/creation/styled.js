import styled from "styled-components";

export const CreationStyled = styled.div`
  
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(126,255,195,1) 0%, rgba(225,239,244,1) 100%);
    
    width: 100%;
    height: 100vh;
    font-family: 'Montserrat';
    display: flex;
    align-items: center;
    justify-content: center;

    .creation{
        background-color: rgba(255,255,255,1);
        border-radius: 6px;
        margin: 0 5%;
        -webkit-box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
        -moz-box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
        box-shadow: 0px 0px 28px -3px rgba(153,153,153,1);
    }

    .creation .form-items{
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
    }

    .creation .form-items button{
        margin-top: 30px;
    }

`
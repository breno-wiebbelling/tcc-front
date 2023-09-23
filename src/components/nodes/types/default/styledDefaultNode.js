import styled from "styled-components";
import { softGreen, smokeBlack } from "../../../style";

export default styled.div`
    width: 200px;
    height: 60px;

    font-weight: bold;
    color: ${smokeBlack};

    display:flex;
    align-items: center;
    justify-content: center;

    .worker{
        width: 100%;
        height: 100%;

        position:relative;

        display:flex;
        align-items: center;
        justify-content: center;
        /* background: linear-gradient(to left, red 50%, blue 50%); */

        border-radius: 3%;
        background-color: ${softGreen};
        border: 1px solid ${smokeBlack};

        cursor: pointer;
    }

    .action_button{
        
        width: 50px;
        height: 50px;

        position:absolute;
        top:0;

        background-color: black;
        transition-duration: .5s;

        z-index: -1;
    }

    .left{ left:-70px; 
        top: ${ props => (props.border) ? "80px" : "0px" };
        left: 75px;}
    .rigth{ right:-70px; }
    
`
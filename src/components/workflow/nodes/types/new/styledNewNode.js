import styled from "styled-components";
import { denseLightBlue, smokeBlack } from "../../../../common/style";

export default styled.div`
    width: 200px;
    height: 60px;

    font-weight: bold;
    color: ${smokeBlack};

    display:flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    .worker{
        width: 100%;
        height: 100%;

        position: relative;

        display:flex;
        align-items: center;
        justify-content: center;
        /* background: linear-gradient(to left, red 50%, blue 50%); */

        border-radius: 6px;
        background-color: ${denseLightBlue};
        border: 1px solid ${smokeBlack};
        z-index: 2;

        cursor: pointer;
    }

    .action_button{
        width: 50px;
        height: 50px;

        position:absolute;
        top:10px;
        
        display: flex;
        justify-content: center;
        align-items: center;

        transition-duration: .5s;

        z-index: -1;
    }

    .action_button .action_button_element{
        width: 100%;
        height: 100%;
    }

    .action_button *{
        cursor: pointer;
    }
`
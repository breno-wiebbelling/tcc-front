import styled from "styled-components";
import { softGreen, smokeBlack } from "../../../../common/style";

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

        position: relative;

        display:flex;
        align-items: center;
        justify-content: center;
        /* background: linear-gradient(to left, red 50%, blue 50%); */

        border-radius: 6px;
        background-color: ${softGreen};
        border: 1px solid ${smokeBlack};

        z-index: 2;
    }

    .worker p{
        width: 70%;
        padding-left: 11%;
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
    }

    .action_button .action_button_element{
        width: 100%;
        height: 100%;
    }

    .add_above .arrow_action{
        transform: rotate(90deg);
        margin-bottom: 20px;
        height: 18px;
    }

    .add_above .add_action{
        margin-top: 13px;
    }
`
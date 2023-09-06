import styled from "styled-components";
import { smokeWhiteHover, smoke, smokeWhite, white } from "../../components/style/index";

export default styled.div`

  max-width: 100vw;
  max-height: 100vh;

  .container{
    width: 100vw;
    height: 92vh;
    display: flex;

    position:relative;
  }

  .openInfoPanel{
    width: 45px;
    height: 45px;
    border-radius: 50%;

    position: absolute;
    right: 30px;
    top:28px;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    background-color: ${smoke};
    color: ${white};
  }
  
  .react-flow__controls-button{
    background-color: ${smokeWhiteHover};
    border-radius: 4px;
    margin: 2px 0px;
  }

  .react-flow__controls-button:hover{
    background-color: ${smoke};
  }

  .react-flow__controls-button:active{
    background-color: ${smokeWhite};
  }

  .react-flow__controls-button svg{
    fill:smokeBlack;
  }

  * .react-flow__controls-interactive{
    display: none;
  }

`
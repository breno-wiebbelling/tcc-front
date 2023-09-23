import styled from "styled-components";
import { smokeWhite, smokeWhiteHover, smoke } from "../style";

export default styled.div`

  position: relative;
  background-color: ${smokeWhite};

  height: 92vh;
  width: 100%;
  padding: 1%;

  box-sizing: border-box;

  .react-flow__controls{
    box-shadow: none;
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

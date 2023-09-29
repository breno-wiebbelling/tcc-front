import styled from "styled-components";
import { smokeWhite, smokeWhiteHover, smoke } from "../common/style";

export default styled.div`

  position: relative;
  background-color: ${smokeWhite};

  height: 92vh;
  width: 100%;
  padding: 1%;

  box-sizing: border-box;

  .react-flow__controls{ box-shadow: none; }
  .react-flow__controls-button{
    background-color: ${smokeWhite};
    border-radius: 4px;
    margin: 2px 0px;
  }

  .react-flow__controls-button:hover { background-color: ${smokeWhiteHover}; }
  .react-flow__controls-button:active{ background-color: ${smoke}; }
  .react-flow__controls-button svg{ fill:smokeBlack; }
  * .react-flow__controls-interactive{ display: none; }

  .action_button_element .arrow_action{
    transform: rotate(-90deg);
    position: absolute;
    margin-top: 9px;
    height: 18px;
  }
  .action_button_element .add_action{
    position: absolute;
    margin-bottom: 8px;
  }

  .action_button .action_button_element{ background-color: ${smokeWhite}; }
  .action_button .action_button_element:hover{ background-color: ${smokeWhiteHover}; }
  .action_button .action_button_element:active{ background-color: ${smoke}; }
`

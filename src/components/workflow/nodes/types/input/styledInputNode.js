import styled from "styled-components";
import { smokeWhiteLightHover, smokeHover, smokeWhite, smokeBlack } from "../../../../common/style";

export default styled.div`
  
  width: 100px;
  height: 100px;
  margin-left: 50px;

  font-weight: bold;
  color: ${smokeBlack};

  display:flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  .worker{
    width: 100px;
    height: 100%;

    position: relative;

    display:flex;
    align-items: center;
    justify-content: center;
    /* background: linear-gradient(to left, red 50%, blue 50%); */

    border-radius: 50%;
    background-color: ${smokeWhiteLightHover};
    border: 1px solid ${smokeHover};

    cursor: pointer;
    z-index: 2;
  }

  .action_button{
    width: 50px;
    height: 50px;

    position:absolute;
    top:20px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    transition-duration: .5s;

    z-index: 1;
  }

  .action_button .action_button_element{
    background-color: ${smokeWhite};
    width: 100%;
    height: 100%;
  }

  .handle_bottom{
    margin-left: 25px;
  }
`
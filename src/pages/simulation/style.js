import styled from "styled-components";
import { smokeWhiteHover, smoke, smokeWhite, white } from "../../components/style/index";

export default styled.div`

  width: 100vw;
  height: 100vh;

  .container{
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
  
`
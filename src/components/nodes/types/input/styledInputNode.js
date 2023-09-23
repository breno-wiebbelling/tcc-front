import styled from "styled-components";
import { white, smokeWhite, smokeBlack } from "../../../style";

export default styled.div`
  
  width: 200px;
  height: 100px;

  font-weight: bold;
  color: ${smokeBlack};

  display:flex;
  align-items: center;
  justify-content: center;

  .worker{
    width: 100px;
    height: 100%;

    display:flex;
    align-items: center;
    justify-content: center;
    /* background: linear-gradient(to left, red 50%, blue 50%); */

    border-radius: 50%;
    background-color: ${smokeWhite};
    border: 1px solid ${smokeBlack};

    cursor: pointer;
  }
`
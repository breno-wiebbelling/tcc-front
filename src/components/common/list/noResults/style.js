import styled from "styled-components";
import { smokeBlack, smokeWhiteLight, smokeHover } from "../../style/index";

export default styled.div`

  height: 90%;
  margin-top: 2.5%;

  .top, .content, .top .icon{
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .top{
    height: 70%;
  }
  
  .top .icon{
    height: 200px;
    width: 200px;

    color: ${smokeBlack};

    border-radius: 50%;

    background-color: ${smokeWhiteLight} ;
  }

  .top .icon .iconElement{
    height: 60%;
    width: 60%;

    color: ${smokeHover} ;
  }

  .content{
    height: 13%;
  }
`
import styled from "styled-components";
import { smokeBlack, headerHeight } from "../common/style/index";

export default styled.div`

  height: ${headerHeight};
  width: 100%;
  padding: 0px 2.5%;
  box-sizing: border-box;

  display:flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  
  .left_box{
    width: 75%;
    height: 100%;
    display: flex;
    justify-content: start;
  }

  .left_box .links, .left_box .icon{
    display: flex;
    height: 100%;
    align-items: center;
  }

  .left_box .icon{
    margin-right: 2.5%;
  }

  .links *{
    text-decoration: none;
    font-weight: 700;
    color: ${smokeBlack};
    line-height: 0%;
    letter-spacing: 1.5px;
  }

  .links a:hover{
    color: navy;
    text-decoration: underline;
  }
`
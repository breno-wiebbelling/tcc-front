import styled from "styled-components";
import { denseLightBlue, white } from "../../../style/index"

export default styled.div`
  
  width: 200px;
  height: 160px;

  display:flex;
  align-items: center;
  justify-content: center;

  .worker {
    width: 100px;
    height: 100px; 

    cursor: pointer;
    font-weight: bold;
    color: white;
    border-radius: 7px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${denseLightBlue};
    transform: rotate(45deg); 
  }

  .worker p{
    transform: rotate(-45deg); 
  }

  .worker .handle_top{
    left:0%;
  }
`
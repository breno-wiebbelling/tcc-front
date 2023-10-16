import styled from "styled-components";
import { denseLightBlue } from "../../../../common/style/index"

export default styled.div`
  
  width: 200px;
  height: 160px;

  display:flex;
  align-items: center;
  justify-content: center;

  cursor:pointer;
  border-radius: 50%;

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

    position: relative;
  }

  .worker p{
    transform: rotate(-45deg); 
  }

  .action_button{
    width: 50px;
    height: 50px;

    position:absolute;
    top:50px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    transition-duration: .5s;

    z-index: -1;
    cursor: pointer;
  }

  .action_button .action_button_element{
    width: 100%;
    height: 100%;
  }

  .action_button *, .action_button_element *{
    cursor: pointer;
  }

`
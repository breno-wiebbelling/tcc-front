import styled from "styled-components";
import {smoke, smokeWhiteLightHover, whiteLight} from "../../../../../common/style"

export default styled.div`

  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  
  .dropdown-http-operation{
    margin-top: 10px;
    height: 45px;
  }
    
  .get-request-http-details{
      display: flex;
      flex-direction: row;
      
      min-height: 70px;
      border-radius: 8px;
      border: 1px solid ${smoke};
      background-color: ${smokeWhiteLightHover};
      
      box-sizing: border-box;
      padding: 8px;
  }
    
  .get-request-http-details .uri-element {
      background-color: ${whiteLight} ;
      width: fit-content;
      height: 18px;
      padding: 5px 7px;
      margin: 0px 5px;
      
      border-radius: 6px;
      
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      cursor:pointer;
  }

`;
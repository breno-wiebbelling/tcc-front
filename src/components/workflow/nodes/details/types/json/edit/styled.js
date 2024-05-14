import styled from "styled-components";
import { whiteLight, smokeWhiteLightHover, smokeWhite, smokeWhiteHover, whiteLightHover, smoke, smokeHover, denseLightBlue } from "../../../../../../common/style"

export default styled.div`

  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  .json-details, .json-details .json_line{
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .json-details{
    flex-wrap: wrap;
    gap: 10px;

    height: 27vh;
  width: 100%;
    
    border-radius: 8px;
    border: 1px solid ${smoke};
    background-color: ${smokeWhiteLightHover};
    overflow: auto;
    
    box-sizing: border-box;
    padding: 8px;
  }

  .json-element{
    width: 100%;
  }

  .json-details::-webkit-scrollbar {
    width: 5px;  
    border-radius: 5px;   
  }

  .json-details::-webkit-scrollbar-track {
    background-color: ${whiteLightHover};
  }  

  .json-details::-webkit-scrollbar-thumb {
    background-color: ${smokeHover};
    border-radius: 5px;   
    border: none;   
  }

  .json-details .json_ident{
    width: 20px;
    height: 10px;
  }

  .json-details .json_value{
    display: flex;
    align-items: center;
    padding-left: 0;
    cursor: pointer;
  }

  .json_info{
    display: flex;
    flex-direction: row;
  }

  .json-details .json_value p{
    padding: 2px 6px;
    margin: 2px;
    border-radius: 4px;

    font-size: 13px;
    background-color: ${smokeWhite};
  }

  .json-details .json_value p:hover{
    background-color: ${smokeWhiteHover} ;
  }
  

  .json-details .json_value p:active{
    background-color: ${smoke};
  }

  .json-details .json_not_defined{
    background-color: ${denseLightBlue};
    color: white;
  }
  
  input{
    border: 1px solid ${smokeWhite};
    border-radius: 5px;
    padding: 2px 10px;
    outline: none;
    max-width: 100px;
    height: 20px;
    letter-spacing: 1px;
  }

  input:focus, input:hover {
    border-color: ${whiteLightHover};
    background-color: ${whiteLight};
  }

`
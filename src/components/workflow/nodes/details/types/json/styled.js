import styled from "styled-components";
import {smoke, smokeWhiteLightHover, denseLightBlue} from "../../../../../common/style"

export default styled.div`

  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  .json-details, .json-details .json_line{
    display: flex;
    flex-direction: row;
  }

  .json-details{
    flex-wrap: wrap;
    gap: 10px;

    height: 27vh;
    
    border-radius: 8px;
    border: 1px solid ${smoke};
    background-color: ${smokeWhiteLightHover};
    
    box-sizing: border-box;
    padding: 8px;
  }

  .json-details .json_ident{
    width: 20px;
    height: 10px;
  }

  .json-details .json_value{
    padding: 2px 6px;
    margin: 2px;
    border-radius: 4px;

    font-size: 13px;
  }

  .json-details .json_not_defined{
    background-color: ${denseLightBlue};
    color: white;
  }

`
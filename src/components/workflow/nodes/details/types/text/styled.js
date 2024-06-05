import styled from "styled-components";
import {smoke, smokeWhiteLightHover} from "../../../../../common/style"

export default styled.div`

  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  .text-details{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    min-height: 80px;
    
    border-radius: 8px;
    border: 1px solid ${smoke};
    background-color: ${smokeWhiteLightHover};
    
    box-sizing: border-box;
    padding: 8px;
  }

  .text-details .text-element{
    cursor: url('/edit.svg') 16 16, auto;
  }

  .text-details .text-element p{
    padding: 2px 6px;
    margin: 2px;
    border-radius: 4px;
    cursor: url('/edit.svg') 16 16, auto;
  }

`
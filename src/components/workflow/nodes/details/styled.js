import styled from "styled-components";
import {smoke} from "../../../common/style";

export default styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .dropdown-nodetype{
    height: 45px;
  }
  
  .node-details-line{
    height: 2px;
    width: 80%;
    margin: 4% 10% 1% 10%;
    background-color: ${smoke};
  }
  
`;

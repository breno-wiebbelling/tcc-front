import styled from "styled-components";
import { smokeBlack } from "../../../../common/style/index";

export default styled.div`

  width: 100%;
  height: 100%;
  color: ${smokeBlack};

  .node_info_container{
    height: 100%;
    
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .node_info_container .input{
    min-height: 45px
  }

`
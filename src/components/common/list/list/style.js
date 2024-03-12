import styled from "styled-components";
import { 
  white, 
  whiteLight,
  whiteHover, 
  smokeWhiteLight, 
  smokeWhiteHover, 
  smoke, 
  smokeHover, 
  denseSmoke, 
  denseSmokeBlack,
  smokeBlack 
} from "../../style/index";
import { yellow } from "@mui/material/colors";

export default styled.div`

  width: 90%; 
  height: 90%;
  padding: 3%;
  box-sizing: border-box;
  border-radius: 50px;
  border: 1px solid ${smokeWhiteLight}; 

  background-color: ${white};

  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  box-shadow: 1px 10px 10px 3px ${denseSmokeBlack};

  .list_top, .list_elements{
    width: 100%;
    display: flex;
  }

  .list_top{
    height: 12%;
  }

  .list_display{
    height: 88%;
  }

  .list_top{
    border-bottom: 1px dashed ${smokeWhiteLight};
    
    justify-content: space-between;
    align-items: center;

    margin-top: -3%;
    padding: 2%;
    box-sizing: border-box;
  }

  .list_top h4{
    font-size: 20px;
    color: ${smokeBlack};
  }

  .list_top button{
    padding: 5px 8px 5px 5px;
    gap: 2px;
    
    border-radius: 40px;
    border: 1px solid ${smokeWhiteHover};
    font-weight: 700;

    background-color: ${white};
  }

  .list_top button:hover{
    background-color: ${whiteHover};
  }

  .list_top button:active{
    background-color: ${smokeWhiteLight};
  }

  .list_top button .add_icon{
    color: ${smokeHover};
  }

  .list_display, .list_display .list_elements{
    width: 100%;

    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .list_display .list_container{
    width: 100%;
    height: 100%;
  }

  .list_display .list_elements {
    height: 100%;
  }

  .list_display .list_pagination{
    height: 10%;
    width: 100%;
  }

  .list_display .list_elements .list_element{
    width: 100%;
    height: 10%;
    box-sizing: border-box;
    padding: 0px 10px;

    font-size: 13px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap:5px;

    border-bottom: 1px solid ${smokeWhiteLight};
  }

  .list_display .list_elements .list_element:hover{
    background-color: ${whiteLight};
  }

  .list_display .list_elements .list_element:active{
    background-color: ${smokeWhiteLight};
  }

  .list_display .list_elements .list_element .list_element_infos{
    height: 100%;

    display: flex;
    justify-content: start;
    align-items: center;

    font-weight: 700;
  }

  .list_display .list_elements .list_element .list_element_infos p{
    width: 100%;
    display: block;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    text-overflow: ellipsis;  
    color: ${denseSmoke};
  }

  .list_display .list_elements .list_element .list_element_infos .elementAction:hover{
    background-color: ${yellow};
  }

  .list_display .list_elements .list_header .header_info{
    font-weight: 700;
    color: ${smoke};
  }

  .list_display .list_elements .list_header:hover{
    background-color: ${white};
  }

  .list_display .list_elements .list_header:active{
    background-color: ${white};
  }

  .MuiPagination-root {
    button {
      color: red !important;
    }
  }

`
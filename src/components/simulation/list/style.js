import styled from "styled-components";

import { smokeHover, whiteLightHover, denseSmokeBlack, smokeWhiteLight, smokeBlack, smokeWhiteHover, white, whiteHover, smoke, smokeWhite, denseSmoke } from "../../common/style";

export default styled.div`

  width: 100%; 
  height: 100%;

  .simulationList{
    display: flex;
  }

  .simulationList{
    width: 90%; 
    height: 90%;
    padding: 3% 3% 15px 3%;
    box-sizing: border-box;
    border-radius: 50px;
    border: 1px solid ${smokeWhiteLight}; 

    background-color: ${white};

    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    box-shadow: 1px 10px 10px 3px ${denseSmokeBlack};
  }

  .simulationList .header_container{
    color: ${smokeHover};
    border-bottom: 1px solid ${smokeWhiteLight};
    font-weight: 700;
    
    font-size: 14px;
  }

  .simulationList .header .actions, .simulations .actions{
    height: 100%;
    width: 15%;
    box-sizing: border-box;

    justify-content: start;
    align-items: center;
  }

  .headers, 
  .simulations{
    height: 43px;
    width: 100%;
  }

  .headers .header_container,
  .simulations .simulation_container{
    height: 43px;
    width: 100%;

    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  .headers .header_container .header,
  .simulations .simulation_container .simulation{
    height: 100%;
    width: 90%;

    display: flex;
    flex-direction: row;
    justify-content: baseline;
    align-items: center;
  }

  .headers .header_container .header div,
  .simulations .simulation_container .simulation div{
    height: 43px;
    padding-left: 10px;

    display: flex;  
    align-items: center;

    box-sizing: border-box;
  }

  .simulationsInfo{
    height: 80px;
    width: 100%;
    margin-top: -3%;
    padding: 2%;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px dashed ${smokeWhiteLight};
  }

  .simulationsInfo h4{
    font-size: 20px;
    color: ${smokeBlack};
  }

  .simulationsInfo button{
    padding: 5px 8px 5px 5px;
    gap: 2px;
    
    border-radius: 40px;
    border: 1px solid ${smokeWhiteHover};
    font-weight: 700;

    background-color: ${white};
  }

  .simulationsInfo button:hover{
    background-color: ${whiteHover};
  }

  .simulationsInfo button:active{
    background-color: ${smokeWhiteLight};
  }

  .simulations{
    height: calc(100% - 40px - 80px);
    width: 100%;
    overflow-y: auto;
    font-weight: 300;
  }

  .simulations::-webkit-scrollbar {
    width: 5px;  
    border-radius: 5px;   
  }

  .simulations::-webkit-scrollbar-track {
    background-color: ${whiteLightHover};
  }  

  .simulations::-webkit-scrollbar-thumb {
    background-color: ${smokeHover};
    border-radius: 5px;   
    border: none;   
  }

  .simulations .simulation_container{
    border-bottom: 1px solid ${smokeWhiteLight};
    cursor: pointer;
  }

  .simulations .simulation_container:hover{
    background-color: ${whiteLightHover};
  }

  .simulations .simulation_container:hover .action{
    visibility: visible;
  }

  .simulations .simulation:active{
    background-color: ${smokeWhiteLight};
  }

  .simulations .simulation p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    font-size: 13px;
  }

  .simulation_container .actions{
    height: 100%;
    display: flex;
    align-items: center;
  }

  .actions .action{
    border-radius: 50%;
    padding: 5px;
    margin-right: 5px;
    color: ${smokeHover};
    background-color: ${smokeWhite};
    z-index: 1;
    height: 20px;
    width: 20px;

    visibility: hidden;
    cursor: pointer;
  }

  .actions .action:hover{
    background-color: ${smokeHover};
    color: ${smokeWhite}
  }

  .actions .action:active{
    background-color: ${denseSmoke};
  }

  .pagination{ 
    height: 40px;
    margin-top: 10px;
    width: 100%;
  }

  .MuiPagination-root {
    button {
      color: ${denseSmokeBlack} !important;
    }
  }

`
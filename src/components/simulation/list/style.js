import styled from "styled-components";

import { smokeHover, whiteLightHover, denseSmokeBlack, smokeWhiteLight, smokeBlack, smokeWhiteHover, white, whiteHover, smoke, smokeWhite, denseSmoke } from "../../common/style";

export default styled.div`

  width: 100%; 
  height: 100%;

  .simulationList, .simulationsInfo, .simulationList .header, .simulationList .header p, .simulations .simulation, .simulations .actions, .simulations p{
    display: flex;
  }

  .simulationList .header, .simulations .simulation{
    height: 43px;
    width: 100%;
  }

  .simulationList .header p, .simulations .simulation p{
    width: 100%;
    align-items: center;
    justify-content: left;
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

  .simulationList .header{
    color: ${smokeHover};
    border-bottom: 1px solid ${smokeWhiteLight};
    font-weight: 700;
  }

  .simulationList .header p{
    font-size: 14px;
    margin-right: 20px;
  }

  .simulationsInfo{
    height: 80px;
    width: 100%;
    margin-top: -3%;
    padding: 2%;
    box-sizing: border-box;

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
    overflow: auto;
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

  .simulations .simulation{
    width: 100%;
    box-sizing: border-box;

    font-size: 13px;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-bottom: 1px solid ${smokeWhiteLight};
    cursor: pointer;
  }

  .simulations .simulation:hover{
    background-color: ${whiteLightHover};
  }

  .simulations .simulation:hover .action{
    visibility: visible;
  }

  .simulations .simulation:active{
    background-color: ${smokeWhiteLight};
  }

  .simulations .simulation{
    display: flex;
    align-items: center;
  }

  .simulations .simulation p{
    display: block;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: content-box;

    padding: 0px 20px 0px 0px;
  }

  .simulationList .header .actions, .simulations .actions{
    height: 100%;
    width: 15%;
    box-sizing: border-box;

    justify-content: start;
    align-items: center;
  }

  .actions .action{
    border-radius: 50%;
    padding: 5px;
    margin-right: 5px;
    color: ${smokeHover};
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
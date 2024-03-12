import styled from "styled-components";
import { white, smokeHover, smokeWhiteLight } from "../../../../../../common/style";

export default styled.div`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  border-radius: 8px;
  padding: 4px;

  background-color: ${smokeWhiteLight};

  .variable-type-selector, .input, .dropdown-valuetype {
    width: 100%;
  }
  
  .dropdown-valuetype, .input{
    height: 65%;
  }

  .dropdown-valuetype * {
    border: none;
  }

  .dropdown-valuetype  .dropdown-options{
    margin-left: -10px;
  }

  .input{
    border: none;
    padding-left: 10px;
    appearance: textfield;
    box-sizing: border-box;
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  
  .variable-type-selector, 
  .variable-type-selector .variable-type-selector-names,
  .variable-type-selector .variable-type-selector-names .variable-type-selector-name,
  .variable-type-selector .variable-type-selector-indicator {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  .variable-type-selector{
    height: 30%;
    background-color: ${white};
    margin-top: 5px;
  }

  .variable-type-selector,
  .variable-type-selector-indicator
  {
    height: 35%;
    border-radius: 15px;
    box-sizing: border-box;
  }

  .variable-type-selector .variable-type-selector-names{
    width: 100%;
  }

  .variable-type-selector .variable-type-selector-names .variable-type-selector-name{
    width: 50%;
    justify-content: center;
  }  
  
  .variable-type-selector .variable-type-selector-indicator{
    justify-content: center;
    width: 55%;
    background-color: ${smokeHover};
    color: ${white};
  }
  
  //position ajustments
  .variable-type-selector .variable-type-selector-names{
    position: relative;
  }
  
  .variable-type-selector .variable-type-selector-indicator{
    position: absolute;
    width: 50%;
    height: 120%;
  }
`
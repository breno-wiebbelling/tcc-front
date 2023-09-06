import styled from "styled-components";

export const VariableListStyled = styled.div`

  width: 80%;
  height: 50%;

  box-sizing: border-box;

  padding: 18px;

  background-color: white;
  border-radius: 8px;

  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0em;
  color: #656565;

  .variable_container, .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 40px;
    border-bottom: 1px solid #EEEEEE;

    padding: 0px 2%;
  }

  .title {
    font-weight: 600;
    border-bottom: none;

    align-items: start;
    height: 30px;
  }

  .variable_container:hover {
    background-color: #f6f6f6;
    border-radius: 5px
  }

  .variable_container .variable_name, .title .variable_name {
    width: 40%;
  }

  .variable_container .variable_type, .title .variable_type {
    width: 30%;
  }

  .variable_container .variable_value, .title .variable_value {
    width: 35%;
  }
`
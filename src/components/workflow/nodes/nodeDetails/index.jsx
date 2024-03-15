import React from "react";
import StyledNodeDetailsTypeComponent from "./styled";
import {
  FormControl,
} from '@mui/material';
import Dropdown from "../../../form/dropdown/index"
import NodeDetailsTypeEnum from "./types/detailsTypeEnum";
import { MathDetailsComponent } from "./types/typeDetailsManager";

const TypeSelector = () => {
  // const [nodeType, setNodeType] = React.useState({ value: NodeDetailsTypeEnum.NONE.code, label: NodeDetailsTypeEnum.NONE.name, key: NodeDetailsTypeEnum.NONE.code });
  const [nodeType, setNodeType] = React.useState({ value: NodeDetailsTypeEnum.MATH.code, label: NodeDetailsTypeEnum.MATH.name, key: NodeDetailsTypeEnum.MATH.code });
  const [typeDetailsComponent, setTypeDetailsComponent] = React.useState(<></>);
  const options = [
    { value: NodeDetailsTypeEnum.MATH.code, label: NodeDetailsTypeEnum.MATH.name, key: NodeDetailsTypeEnum.MATH.code },
    { value: NodeDetailsTypeEnum.COND.code, label: NodeDetailsTypeEnum.COND.name, key: NodeDetailsTypeEnum.COND.code },
  ];

  const parseTypeAndReturnComponent = () => {
    switch (nodeType.value) {
      case NodeDetailsTypeEnum.MATH.code:
        return <MathDetailsComponent className="details-component"/>;
      default:
        return <div></div>; 
    }
  };

  const handleTypeChange = (event) => {
    setNodeType(event)
  };

  React.useEffect(() => {
    setTypeDetailsComponent(parseTypeAndReturnComponent());
  },[nodeType]);

  return (
    <StyledNodeDetailsTypeComponent>
      <FormControl className="form">
        <div className="dropdown-nodetype">
          <Dropdown options={options} value={nodeType} onChange={handleTypeChange} placeholder={NodeDetailsTypeEnum.NONE.name}/>
        </div>
        {
          nodeType !== "" &&
          typeDetailsComponent
        }
      </FormControl>
    </StyledNodeDetailsTypeComponent>
  );
}

export default TypeSelector;

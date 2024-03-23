import React, { useRef } from "react";
import StyledNodeDetailsTypeComponent from "./styled";
import Dropdown from "../../../form/dropdown/index"
import NodeDetailsTypeEnum from "./types/typeDetailsEnum";
import { MathDetailsComponent, InputDetailsComponent } from "./types/typeDetailsManager";

const options = [
  { value: NodeDetailsTypeEnum.MATH.code, label: NodeDetailsTypeEnum.MATH.name, key: NodeDetailsTypeEnum.MATH.code },
  // { value: NodeDetailsTypeEnum.COND.code, label: NodeDetailsTypeEnum.COND.name, key: NodeDetailsTypeEnum.COND.code },
];

const TypeSelector = ({ nodeInfo, setNodeDetails, setNodeType, nodeType, nodeDetails }) => {
  const [typeDetailsComponent, setTypeDetailsComponent] = React.useState(<></>);
  const [isTypeChangeAvailable, setIsTypeChangeAvailable] = React.useState(true);

  const handleTypeChange = (newType) => { setNodeType(newType); };
  const parseTypeAndReturnComponent = () => {
    const element = document.getElementById('TypeSelectorComponent');
    let DetailsComponent;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    switch (nodeType.key) {
      case NodeDetailsTypeEnum.MATH.code:
        DetailsComponent = MathDetailsComponent;
        break;
      case NodeDetailsTypeEnum.START.code:
        DetailsComponent = InputDetailsComponent;
        break;
      default:
        DetailsComponent = () => <div></div>;
        break;
    }

    return <DetailsComponent className="details-component" nodeInfo={nodeInfo} setNodeDetails={setNodeDetails} nodeDetails={nodeDetails} />

  };

  React.useEffect(() => {
    setTypeDetailsComponent(parseTypeAndReturnComponent());
    setIsTypeChangeAvailable((nodeType.key !== NodeDetailsTypeEnum.START.code))
  },[nodeType])

  return (
    <StyledNodeDetailsTypeComponent
      id={'TypeSelectorComponent'}
      style={{height: (nodeType.value !== undefined && nodeType.value === NodeDetailsTypeEnum.MATH.code) ? '520px' : '100%' }}
    >
      <div className="dropdown-nodetype">
        <Dropdown options={options} value={nodeType} onChange={handleTypeChange} placeholder={nodeType.label} isEnabled={isTypeChangeAvailable} tooltipTitle={"Tipo da Tarefa"}/>
      </div>
      {
        nodeType !== "" &&
        typeDetailsComponent
      }
    </StyledNodeDetailsTypeComponent>
  );
}

export default TypeSelector;

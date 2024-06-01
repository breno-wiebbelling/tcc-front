import React, { useRef } from "react";
import StyledNodeDetailsTypeComponent from "./styled";
import Dropdown from "../../../form/dropdown/index"
import NodeDetailsTypeEnum from "./types/typeDetailsEnum";
import {
  MathDetailsComponent,
  InputDetailsComponent,
  OutputDetailsComponent,
  TextDetailsComponent,
  CondDetailsComponent,
  JsonDetailsComponent
} from "./types/typeDetailsManager";

const options = [
  { value: NodeDetailsTypeEnum.MATH.code, label: NodeDetailsTypeEnum.MATH.name, key: NodeDetailsTypeEnum.MATH.code },
  { value: NodeDetailsTypeEnum.TEXT.code, label: NodeDetailsTypeEnum.TEXT.name, key: NodeDetailsTypeEnum.TEXT.code },
  { value: NodeDetailsTypeEnum.COND.code, label: NodeDetailsTypeEnum.COND.name, key: NodeDetailsTypeEnum.COND.code },
  { value: NodeDetailsTypeEnum.JSON.code, label: NodeDetailsTypeEnum.JSON.name, key: NodeDetailsTypeEnum.JSON.code },
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
      case NodeDetailsTypeEnum.END.code:
        DetailsComponent = OutputDetailsComponent;
        break;
      case NodeDetailsTypeEnum.TEXT.code:
        DetailsComponent = TextDetailsComponent;
        break;
      case NodeDetailsTypeEnum.COND.code:
        DetailsComponent = CondDetailsComponent;
        break;
      case NodeDetailsTypeEnum.JSON.code:
        DetailsComponent = JsonDetailsComponent;
        break;
      default:
        DetailsComponent = () => <div></div>;
        break;
    }

    return <DetailsComponent className="details-component" nodeInfo={nodeInfo} setNodeDetails={setNodeDetails} nodeDetails={nodeDetails} />
  };

  React.useEffect(() => {
    setTypeDetailsComponent(parseTypeAndReturnComponent());
    setIsTypeChangeAvailable(![NodeDetailsTypeEnum.START.code, NodeDetailsTypeEnum.END.code].includes(nodeType.key))
  },[nodeType])

  React.useEffect(() => {
    console.log(nodeDetails)
  }, [nodeDetails])

  return (
    <StyledNodeDetailsTypeComponent
      id={'TypeSelectorComponent'}
      style={{height: (nodeType.value !== undefined && nodeType.value === NodeDetailsTypeEnum.MATH.code) ? '520px' : '100%' }}
    >
      <div style={{ height: '45px' }}>
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

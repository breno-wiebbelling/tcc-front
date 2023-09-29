import { Handle, Position } from 'reactflow';
import ConditionalNodeStyled from "./ConditionalNodeStyled"
import ClickOutsideWrapper from '../ClickOutsideElement'; 
import React  from 'react';

export default ({ data }) => {
  const [border, setBorder] = React.useState(false);

  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setBorder(false); } }>
      <ConditionalNodeStyled>
        <Handle type="target" position={Position.Top} />
        <div
          className="worker"
          style={{ border: border ? '3px solid black' : '1px solid black' }}
          onClick={ () => { setBorder(true); }}
        >
          <p>{data.label}</p>
        </div>
        <Handle type="source" position={Position.Bottom} />
        <Handle type="source" position={Position.Right} />
        <Handle type="source" position={Position.Left} />
      </ConditionalNodeStyled>
    </ClickOutsideWrapper>
  );
}


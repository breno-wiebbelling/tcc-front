import { Handle, Position } from 'reactflow';
import InputNodeStyled from "./styledInputNode"
import React  from 'react';

export default ({ data }) => {
  
  return (
    <InputNodeStyled>
      <div className="worker">
        <p>{data.label}</p>
      </div>
      <Handle className="handle_bottom" type="source" position={Position.Bottom} />
    </InputNodeStyled>
  );
}


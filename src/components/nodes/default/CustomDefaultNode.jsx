import { Handle, Position } from 'reactflow';
import DefaultNodeStyled from "./styledDefaultNode"
import React  from 'react';

export default ({ data }) => {

  return (
    <DefaultNodeStyled>
      <Handle className="handle_bottom" type="target" position={Position.Top} />
      <div className="worker">
        <p>{data.label}</p>
      </div>
      <Handle className="handle_bottom" type="source" position={Position.Bottom} />
    </DefaultNodeStyled>
  );
}


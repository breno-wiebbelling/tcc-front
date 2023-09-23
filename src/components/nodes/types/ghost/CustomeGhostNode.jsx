import { Handle, Position } from 'reactflow';
import GhostNodeStyled from "./GhostNodeStyled"
import React  from 'react';

export default ({ data }) => {

  return (
    <GhostNodeStyled>
      <Handle className="handle_bottom" type="target" position={Position.Top} />
      <Handle className="handle_bottom" type="source" position={Position.Bottom} />
    </GhostNodeStyled>
  );
}

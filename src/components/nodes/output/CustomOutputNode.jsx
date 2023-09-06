import { Handle, Position } from 'reactflow';
import CustomeOutputStyled from "./styledOutputNode"
import React  from 'react';

export default ({ data }) => {
  
  return (
    <CustomeOutputStyled>
      <Handle type="target" position={Position.Top} className='handle_top'/>
      <div className="worker">
        <p>{data.label}</p>
      </div>
    </CustomeOutputStyled>
  );
}


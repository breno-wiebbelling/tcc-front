import { Handle, Position } from 'reactflow';
import CustomeOutputStyled from "./styledOutputNode"
import ClickOutsideWrapper from '../ClickOutsideElement'; 
import React  from 'react';

export default ({ data }) => {
  const [border, setBorder] = React.useState(false);
  
  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setBorder(false); } }>
      <CustomeOutputStyled>
        <Handle type="target" position={Position.Top} className='handle_top'/>
        <div
          className="worker"
          style={{ border: border ? '3px solid black' : '1px solid black' }}
          onClick={ () => { setBorder(true); }}
        >
          <p>{data.label}</p>
        </div>
      </CustomeOutputStyled>
    </ClickOutsideWrapper>
  );
}


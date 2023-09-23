import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import InputNodeStyled from './styledInputNode';
import ClickOutsideWrapper from '../ClickOutsideElement'; 

const YourComponent = ({ data }) => {
  const [border, setBorder] = React.useState(false);

  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setBorder(false); } }>
      <InputNodeStyled>
        <div
          className="worker"
          style={{ border: border ? '3px solid black' : '1px solid black' }}
          onClick={ () => { setBorder(true); }}
        >
          <p>{data.label}</p>
        </div>
      <Handle className="handle_bottom" type="source" position={Position.Bottom} />
      </InputNodeStyled>
    </ClickOutsideWrapper>
  );
};

export default YourComponent;

import { Handle, Position } from 'reactflow';
import DefaultNodeStyled from "./styledDefaultNode"
import ClickOutsideWrapper from '../ClickOutsideElement'; 
import React  from 'react';

export default ({ data, currentNodeSelected }) => {
  const [border, setBorder] = React.useState(false);

  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setBorder(false); } }>
      <DefaultNodeStyled>
        <Handle className="handle_bottom" type="target" position={Position.Top} />
        <div
          className="worker"
          style={{ border: border ? '3px solid black' : '1px solid black' }}
          onClick={ () => { setBorder(true); }}
        >
          <p>{data.label}</p>
        </div>

        <div>
          <div 
            className='action_button left' 
            style={{
              "left": (border) ? "-80px" : "0px" ,
            }}
          >
            
          </div>
          <div 
            className='action_button center'
            style={{
              "top": (border) ? "80px" : "0px" ,
              "left": "75px"
            }}
          >

          </div>

          <div 
            className='action_button rigth'
            style={{
              "right": (border) ? "-75px" : "0px" ,
            }}
          >
          </div>
        </div>
        <Handle className="handle_bottom" type="source" position={Position.Bottom} />
      </DefaultNodeStyled>
    </ClickOutsideWrapper>
  );
}


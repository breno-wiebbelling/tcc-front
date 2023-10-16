import React  from 'react';
import { Handle, Position } from 'reactflow';
import DefaultNodeStyled from "./styledNewNode"
import ClickOutsideWrapper from '../ClickOutsideElement'; 
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default ({ data }) => {
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);

  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setIsOptionsVisible(false); } }>
      <DefaultNodeStyled>
        <Handle className="handle_bottom" type="target" position={Position.Top} />
        <div
          className="worker"
          style={{ border: isOptionsVisible ? '2px solid black' : '1px solid black' }}
          onClick={ () => { setIsOptionsVisible(true); }}
        >
          <p onClick={ () => { setIsOptionsVisible(true); }}> {data.label} </p>
        </div>
        <div onClick={ () => { setIsOptionsVisible(false); }} >
         
          <div  
            className='action_button rigth'
            onClick={ () => { data.click.deleteNode(data) } }  style={{ "right": (isOptionsVisible) ? "-70px" : "0px" }}
          >
            <IconButton className='action_button_element'>
              <DeleteIcon/>
            </IconButton>
          </div>
        </div>
        <Handle className="handle_bottom" type="source" position={Position.Bottom} />
      </DefaultNodeStyled>
    </ClickOutsideWrapper>
  );
}


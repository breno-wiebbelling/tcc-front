import { Handle, Position } from 'reactflow';
import DefaultNodeStyled from "./styledDefaultNode"
import ClickOutsideWrapper from '../ClickOutsideElement'; 
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import React  from 'react';

export default ({ data, currentNodeSelected }) => {
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);

  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setIsOptionsVisible(false); } }>
      <DefaultNodeStyled>
        <Handle className="handle_bottom" type="target" position={Position.Top} />
        <div
          className="worker"
          style={{ border: isOptionsVisible ? '3px solid black' : '1px solid black' }}
          onClick={ () => { setIsOptionsVisible(true); }}
        >
          <p 
            onClick={ () => { setIsOptionsVisible(true); }}
          >
            {data.label}
          </p>
        </div>

        <div>
          <div 
            className='action_button left' 
            onClick={data.click.addNode}
            style={{
              "left": (isOptionsVisible) ? "-70px" : "0px" ,
            }}
          >
            <IconButton className='action_button_element'>
              <AddIcon/>
            </IconButton>
          </div>
          <div 
            className='action_button center'
            onClick={data.click.editNode}
            style={{
              "top": (isOptionsVisible) ? "80px" : "0px" ,
              "left": "75px"
            }}
          >
            <IconButton className='action_button_element'>
              <EditIcon/>
            </IconButton>
          </div>

          <div 
            className='action_button rigth'
            onClick={data.click.deleteNode}
            style={{
              "right": (isOptionsVisible) ? "-70px" : "0px" ,
            }}
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


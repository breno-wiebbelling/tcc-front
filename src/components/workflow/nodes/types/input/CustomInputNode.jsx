import React from 'react';
import { Handle, Position } from 'reactflow';
import InputNodeStyled from './styledInputNode';
import ClickOutsideWrapper from '../../../../common/ClickOutsideElement'; 
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { nodeCRUDOperations } from '../../../managers/nodeManager';

const YourComponent = ({ data }) => {
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);

  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setIsOptionsVisible(false); } }>
      <InputNodeStyled>
        <div
          className="worker"
          style={{border: isOptionsVisible ? '2px solid black' : '1px solid black'}}
          onClick={() => {
            setIsOptionsVisible(true);
          }}
        > 
          <Tooltip title={data.label} disableInteractive>
            <p onClick={() => {setIsOptionsVisible(true);}}>
              {data.label}
            </p>
          </Tooltip>
        </div>

        <div
          className='action_button left'
          onClick={() => { data.click.editNode(data)  }}
          style={{"left": (isOptionsVisible) ? "-5px" : "50px"}}
        >
          <IconButton className='action_button_element'>
            <EditIcon/>
          </IconButton>
        </div>

        <div onClick={() => {
          setIsOptionsVisible(false);
        }}>
          <div
            className='action_button left'
            onClick={() => {
              data.click.addNode(nodeCRUDOperations.ADD_BELOW, data)
            }}
            style={{"top": (isOptionsVisible) ? "110px" : "0px", "left": "75px"}}
          >
            <IconButton className='action_button_element'>
              <AddIcon className='add_action'/>
              <ArrowBackIosIcon className='arrow_action'/>
            </IconButton>
          </div>
        </div>
        <Handle className="handle_bottom" type="source" position={Position.Bottom}/>
      </InputNodeStyled>
    </ClickOutsideWrapper>
  );
};

export default YourComponent;

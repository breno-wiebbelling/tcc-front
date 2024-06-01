import React  from 'react';
import { Handle, Position } from 'reactflow';
import CustomeOutputStyled from "./styledOutputNode"
import ClickOutsideWrapper from '../../../../common/ClickOutsideElement'; 
import {IconButton, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { nodeCRUDOperations } from '../../../managers/nodeManager';

export default ({ data }) => {
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);
  
  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setIsOptionsVisible(false); } }>
      <CustomeOutputStyled>
        <Handle type="target" position={Position.Top} className='handle_top'/>
        <div
          className="worker"
          style={{ border: isOptionsVisible ? '2px solid black' : '1px solid black' }}
          onClick={ () => { setIsOptionsVisible(true); }}
        > 
          <Tooltip title={data.label} disableInteractive>
            <p onClick={ () => { setIsOptionsVisible(true); }} >{data.label}</p>
          </Tooltip>
        </div>
        <div onClick={() => {
          setIsOptionsVisible(false);
        }}>
          <div
            className='action_button left'
            onClick={() => { data.click.editNode(data) }}
            style={{"left": (isOptionsVisible) ? "-7px" : "50px"}}
          >
            <IconButton className='action_button_element'>
              <EditIcon/>
            </IconButton>
          </div>

          <div
            className='action_button left'
            onClick={() => {
              data.click.addNode(nodeCRUDOperations.ADD_ABOVE, data)
            }}
            style={{"top": (isOptionsVisible) ? "-60px" : "0px", "left": "75px"}}
          >
            <IconButton className='action_button_element'>
              <AddIcon className='add_action'/>
              <ArrowBackIosIcon className='arrow_action'/>
            </IconButton>
          </div>
        </div>
      </CustomeOutputStyled>
    </ClickOutsideWrapper>
  );
}
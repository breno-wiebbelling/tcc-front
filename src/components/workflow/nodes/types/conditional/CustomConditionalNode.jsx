import React  from 'react';
import { Handle, Position } from 'reactflow';
import ConditionalNodeStyled from "./ConditionalNodeStyled"
import ClickOutsideWrapper from '../../../../common/ClickOutsideElement'; 

import {IconButton, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { nodeCRUDOperations } from "../../../managers/nodeManager";
import CallSplitIcon from '@mui/icons-material/CallSplit';

export default ({ data }) => {
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);
  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setIsOptionsVisible(false); } }>
      <ConditionalNodeStyled>
        <Handle type="target" position={Position.Top} />
        <div
          className="worker"
          style={{ border: isOptionsVisible ? '2px solid black' : '1px solid black' }}
          onClick={ () => { setIsOptionsVisible(true); }}
        >
          <Tooltip title={data.label} disableInteractive> 
            <p onClick={ () => { setIsOptionsVisible(true); }}> {data.label} </p>
          </Tooltip>
        </div>
        <div onClick={ () => { setIsOptionsVisible(false); }} >
          {/* <div 
            className='action_button left' 
            onClick={ () => { data.click.addNode(nodeCRUDOperations.CONDITIONAL_KEY, data) } } 
            style={{ "top": (isOptionsVisible) ? "170px" : "50px" , "left": "75px" }} 
          >
            <IconButton className='action_button_element'>
              <CallSplitIcon style={{ transform: "rotate(180deg)"}}/>
            </IconButton>
          </div> */}
          <div 
            className='action_button center'
            onClick={()=>{ data.click.editNode(data) }}
            style={{ "left": (isOptionsVisible) ? "-30px" : "50px" }}
          >
            <IconButton className='action_button_element'>
              <EditIcon/>
            </IconButton>
          </div>

          <div  
            className='action_button rigth'
            onClick={ () => { data.click.deleteNode(data) } }  style={{ "right": (isOptionsVisible) ? "-30px" : "50px" }}
          >
            <IconButton className='action_button_element'>
              <DeleteIcon/>
            </IconButton>
          </div>
          <div 
            className='action_button top'
            onClick={ () => { data.click.addNode(nodeCRUDOperations.ADD_ABOVE, data) } }
            style={{ "top": (isOptionsVisible) ? "-50px" : "30px" , "left": "75px" }} 
          >
            <IconButton className='action_button_element add_above'>
              <AddIcon className='add_action'/>
              <ArrowBackIosIcon className='arrow_action'/>
            </IconButton>
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} />
      </ConditionalNodeStyled>
    </ClickOutsideWrapper>
  );
}


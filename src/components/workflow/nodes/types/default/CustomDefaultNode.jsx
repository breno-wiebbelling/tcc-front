import React  from 'react';
import { Handle, Position } from 'reactflow';
import DefaultNodeStyled from "./styledDefaultNode"
import ClickOutsideWrapper from '../../../../common/ClickOutsideElement'; 
import {IconButton, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { nodeCRUDOperations } from "../../../managers/nodeManager";
import mathSymbol from "./function-mathematical-symbol.png"

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
          <Tooltip title={data.label}> 
            <p onClick={ () => { setIsOptionsVisible(true); }}> {data.label} </p>
          </Tooltip>
          <img style={{height: '45%', padding: '5% 5%'}} src={mathSymbol} alt="Logo" />
        </div>
        <div onClick={ () => { setIsOptionsVisible(false); }} >
          <div 
            className='action_button left' 
            onClick={()=>{ data.click.editNode(data) }}
            style={{ "left": (isOptionsVisible) ? "-70px" : "0px" }}
          >
            <IconButton className='action_button_element'>
              <EditIcon/>
            </IconButton>
          </div>
          <div 
            className='action_button center'
            onClick={ () => { data.click.addNode(nodeCRUDOperations.ADD_BELOW, data) } }
            style={{ "top": (isOptionsVisible) ? "80px" : "0px" , "left": "75px" }} 
          >
            <IconButton className='action_button_element'>
              <AddIcon className='add_action'/>
              <ArrowBackIosIcon className='arrow_action'/>
            </IconButton>
          </div>
          <div 
            className='action_button center'
            onClick={ () => { data.click.addNode(nodeCRUDOperations.ADD_ABOVE, data) } }
            style={{ "top": (isOptionsVisible) ? "-75px" : "0px" , "left": "75px" }} 
          >
            <IconButton className='action_button_element add_above'>
              <AddIcon className='add_action'/>
              <ArrowBackIosIcon className='arrow_action'/>
            </IconButton>
          </div>
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
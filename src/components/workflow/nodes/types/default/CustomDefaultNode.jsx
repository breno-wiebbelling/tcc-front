import React from 'react';
import { Handle, Position } from 'reactflow';
import DefaultNodeStyled from "./styledDefaultNode"
import ClickOutsideWrapper from '../../../../common/ClickOutsideElement';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { nodeCRUDOperations, nodeKeys } from "../../../managers/nodeManager";
import mathSymbol from "./function-mathematical-symbol.png"
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

export default ({ data }) => {
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);

  return (
    <ClickOutsideWrapper onOutsideClick={() => { setIsOptionsVisible(false); }}>
      <DefaultNodeStyled>
        <Handle className="handle_bottom" type="target" position={Position.Top} />
        <Tooltip title={data.label} arrow>
          <div
            className="worker"
            style={{ border: isOptionsVisible ? '2px solid black' : '1px solid black' }}
            onClick={() => { setIsOptionsVisible(true); }}
          >
            <p onClick={() => { setIsOptionsVisible(true); }}> {data.label} </p>
            <div style={{ height: '40%', opacity: 0.7 }}>
              {
                data.type === nodeKeys.TEXT_KEY &&
                (
                  <FormatAlignLeftIcon style={{ opacity: 0.7 }} />
                )
              }
              {
                data.type === nodeKeys.MATH_KEY &&
                (
                  <img style={{ height: '100%' }} src={mathSymbol} alt="Logo" />
                )
              }
              {
                data.type === nodeKeys.JSON_KEY &&
                (
                  <>{"{}"}</>
                )
              }
            </div>
          </div>
        </Tooltip>
        <div onClick={() => { setIsOptionsVisible(false); }} >
          <div
            className='action_button left'
            onClick={() => { data.click.editNode(data) }}
            style={{ "left": ((isOptionsVisible) ? "-60px" : "0px") }}
          >
            <IconButton className='action_button_element'>
              <EditIcon />
            </IconButton>
          </div>
          <div
            className='action_button center'
            onClick={() => { data.click.addNode(nodeCRUDOperations.ADD_BELOW, data) }}
            style={{ "top": (isOptionsVisible) ? "70px" : "0px", "left": "75px" }}
          >
            <IconButton className='action_button_element'>
              <AddIcon className='add_action' />
              <ArrowBackIosIcon className='arrow_action' />
            </IconButton>
          </div>
          <div
            className='action_button center'
            onClick={() => { data.click.addNode(nodeCRUDOperations.ADD_ABOVE, data) }}
            style={{ "top": (isOptionsVisible) ? "-60px" : "0px", "left": "75px" }}
          >
            <IconButton className='action_button_element add_above'>
              <AddIcon className='add_action' />
              <ArrowBackIosIcon className='arrow_action' />
            </IconButton>
          </div>
          <div
            className='action_button rigth'
            onClick={() => { data.click.deleteNode(data) }} style={{ "right": (isOptionsVisible) ? "-60px" : "0px" }}
          >
            <IconButton className='action_button_element'>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <Handle className="handle_bottom" type="source" position={Position.Bottom} />
      </DefaultNodeStyled>
    </ClickOutsideWrapper>
  );
}
import React  from 'react';
import { Handle, Position } from 'reactflow';
import DefaultNodeStyled from "./styledNewNode"
import ClickOutsideWrapper from '../../../../common/ClickOutsideElement'; 
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default ({ data }) => {
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);
  const openOptionsAndNodeInfo = () => { setIsOptionsVisible(true); }

  return (
    <ClickOutsideWrapper onOutsideClick={ () => { setIsOptionsVisible(false); } }>
      <DefaultNodeStyled>
        <Handle className="handle_bottom" type="target" position={Position.Top}/>
        <div className="worker" onClick={openOptionsAndNodeInfo}>
          <p onClick={openOptionsAndNodeInfo}> {data.label} </p>
        </div>
        <div
          className='action_button left'
          onClick={()=>{ data.click.editNode(data) }}
          style={{"left": (isOptionsVisible) ? "-60px" : "0px"}}
        >
          <IconButton className='action_button_element'>
            <EditIcon/>
          </IconButton>
        </div>
        <div
          className='action_button rigth'
          onClick={() => { data.click.deleteNode(data) }}
          style={{"right": (isOptionsVisible) ? "-60px" : "0px"}}
        >
          <IconButton className='action_button_element'>
            <DeleteIcon/>
          </IconButton>
        </div>
        <Handle className="handle_bottom" type="source" position={Position.Bottom}/>
      </DefaultNodeStyled>
    </ClickOutsideWrapper>
  );
}


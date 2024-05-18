import React from 'react';
import { denseSmoke, denseSmokeBlack, smokeWhite, smokeBlack, smoke, smokeWhiteHover, vividGreen, vividRed } from "../../../../../../common/style/index";
import JsonDetailsStyled from "./styled";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from "@mui/material";
import Dropdown from '../../../../../../form/dropdown';
import DeleteIcon from '@mui/icons-material/Delete';

const DEFAULT_KEY_NAME = "chave";
const DEFAULT_NEW_JSON_VALUE = { key: 'key', label: 'valor', value: 'Não definido' }
const DEFAULT_NEW_JSON_OPERATION = { key: DEFAULT_KEY_NAME, value: DEFAULT_NEW_JSON_VALUE }

export default ({ nodeInfo, setNodeDetails, variables, jsonVariable, openVariableCreationModal, setWarning, setError }) => {

  const [editModeOn, setEditModeOn] = React.useState(false);
  const [addModeOn, setAddModeOn] = React.useState(false);
  const [jsonOperations, setJsonOperations] = React.useState([]);
  const [newJsonOperation, setNewJsonOperation] = React.useState(DEFAULT_NEW_JSON_OPERATION);

  const loadJsonDetails = async (nodeInfo) => {
    if (typeof nodeInfo['details']['jsonOperations'] === 'undefined') {
      setJsonOperations([])
    }
    else {
      setJsonOperations(nodeInfo['details']['jsonOperations']);
    }
    setNewJsonOperation(DEFAULT_NEW_JSON_OPERATION);
  }

  const handleNewJsonOperationValue = (newValue) => {
    setNewJsonOperation(latest => {
      return {
        ...latest,
        value: newValue
      }
    })
  }

  const handleNewKeyChange = (newKey) => {
    setNewJsonOperation(latest => {
      return {
        ...latest,
        key: newKey
      }
    })
  }

  const handleEditModeChange = () => {
    if (editModeOn && addModeOn) {
      if (newJsonOperation['key'] === DEFAULT_KEY_NAME) {
        setWarning('Insira uma chave!')
        return;
      }

      if(jsonOperations.find(jo => jo.key === newJsonOperation['key'])){
        setError('Chave já registrada!')
        return
      }

      if (newJsonOperation['value']['key'] === DEFAULT_NEW_JSON_OPERATION['value']['key']) {
        setWarning('Insira um valor!')
        return;
      }

      setAddModeOn(false)
      setJsonOperations(latest => {
        return [
          ...latest,
          ({ key: newJsonOperation['key'], value: { variableId: newJsonOperation['value']['key'], label: newJsonOperation['value']['label'] } })
        ];
      })

      return
    }

    setNodeDetails(latestDetails => {
      latestDetails['jsonOperations'] = jsonOperations;
      return latestDetails;
    });

    setEditModeOn(!editModeOn);
  }

  const editJsonOperation = (jsonOperation) => {
    if(editModeOn){
      setNewJsonOperation(latest => {
        return {
          key: jsonOperation['key'],
          value: (variables.find(v => v['key'] === jsonOperation['value']['variableId']))
        };
      });
      setAddModeOn(true)
    }
  }

  const popJsonOperation = (index) => {
    setJsonOperations(latest => {
      return latest.filter((op, i) => i!==index);
    })
  }

  const handleAddModeChange = () => {
    setAddModeOn(latest => !latest);
    setNewJsonOperation(DEFAULT_NEW_JSON_OPERATION);
  }

  React.useEffect(() => {
    loadJsonDetails(nodeInfo)
  }, [nodeInfo])

  return (
    <JsonDetailsStyled>
      <div className={"json-details"}>
        <div className={"json-element"} >
          <p> {'{'} </p>
          <div className='json_line'>
            <div className="json_ident"></div>
            <p className='json_value json_not_defined' style={{ paddingLeft: '4px' }}>...{jsonVariable['label']}</p>,
          </div>
          {
            jsonOperations.map((jsonOperation, i) => {
              return (
                <div className='json_line' key={jsonOperation['key'] + " - " + i}>
                  <div className="json_ident"></div>
                  <div className='json_value'>
                    <div className='json_info' onClick={() => { editJsonOperation(jsonOperation) }}><p>{jsonOperation['key']}</p> : <p>{jsonOperation['value']['label']}</p></div>
                    {
                      editModeOn &&
                      (
                        <IconButton onClick={() => { popJsonOperation(i) }} sx={{ width: "22px", height: "22px", marginLeft: "7px", color: denseSmoke, backgroundColor: smokeWhite, "&:hover": { backgroundColor: smokeWhiteHover }, "&:active": { backgroundColor: smoke } }}>
                          <DeleteIcon style={{ color: denseSmokeBlack, width: "18px", height: "18px" }} />
                        </IconButton>
                      )
                    }
                    ,
                  </div>
                </div>
              )
            })
          }
          {
            (editModeOn && addModeOn) &&
            (
              <div className='json_line'>
                <div className="json_ident"></div>
                <div style={{ minHeight: '18px', display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <input type="text" value={String(newJsonOperation.key)} onChange={(event) => { handleNewKeyChange(event.target.value) }} style={{ textAlign: 'center' }} placeholder='chave' />
                  :
                  <div style={{ height: '28px', width: '200px' }}>
                    <Dropdown options={variables} value={newJsonOperation.value} onChange={handleNewJsonOperationValue} placeholder={newJsonOperation.value.label} hasNewValueOption={true} onNewValueOptionClick={openVariableCreationModal} iconSizes={{ height: '18px', width: '18px' }} />
                  </div>
                </div>
                ,
              </div>
            )
          }
          <p> {'}'} </p>

        </div>
      </div>
      <div style={{ position: "relative", width: '100%' }}>
        <IconButton className={`display_flex_center`} onClick={handleEditModeChange} sx={{ width: "25px", height: "25px", borderRadius: "50%", color: denseSmoke, position: "absolute", zIndex: 1, bottom: '20px', right: '10px', backgroundColor: (editModeOn) ? vividGreen : smoke, "&:hover": { backgroundColor: smokeWhiteHover }, "&:active": { backgroundColor: smokeBlack } }}>
          {!editModeOn && <EditIcon sx={{ width: "17px", height: "17px", color: smokeBlack }} />}
          {editModeOn && <CheckIcon sx={{ width: "17px", height: "17px", color: smokeBlack }} />}
        </IconButton>
        <IconButton onClick={() => { handleAddModeChange() }} className={`display_flex_center`} sx={{ width: "25px", height: "25px", transition: ".3s", borderRadius: "50%", color: denseSmoke, position: "absolute", transform: (addModeOn) ? "rotate(48deg)" : "rotate(0deg)", bottom: '20px', right: (editModeOn) ? '40px' : '10px', backgroundColor: smoke, "&:hover": { backgroundColor: smokeWhiteHover }, "&:active": { backgroundColor: smokeBlack } }}>
          <AddIcon sx={{ width: "17px", height: "17px", color: smokeBlack }} />
        </IconButton>
      </div>
    </JsonDetailsStyled>
  )
}
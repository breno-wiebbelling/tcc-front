import React from 'react';
import SimulationInfoStyled from "./styled";
import { smoke, smokeHover } from "../../../../common/style/index.js";
import { Container, Button } from '@mui/material';
import Tooltip from "@mui/material/Tooltip";

import NodeDetailsComponent from "../../details/index.jsx";
import Input from "../../../../form/rawInput/index";

import { validateStringValue } from "../../../../form/formValidators";
import { updateNode } from "../../../../../service/clients/nodeClient";
import { validateNodeInformation } from "../../../../../service/validators/nodeInformation";
import NodeDetailsTypeEnum from "../../details/types/typeDetailsEnum";

export default ({ nodeInfo, setIsInfoPanelOpen, setAlertInfo }) => {

  const [nodeName, setNodeName] = React.useState("");
  const [nodeDetails, setNodeDetails] = React.useState({});
  const [nodeType, setNodeType] = React.useState({});

  const setError = (errorMessage) => { setAlertInfo({ msg: errorMessage, mode: 'error' }) }
  const [nodeNameError, setNodeNameError] = React.useState("");

  const handleNodeNameChange = (newName) => {
    validateStringValue(newName, setNodeNameError, 'Adicione um nome');
    setNodeName(newName);
  }

  const handleSubmit = async () => {
    nodeInfo = {
      ...nodeInfo,
      "name":nodeName,
      "title":nodeName,
      "simulationId": nodeInfo["simulationId"],
      "type": nodeType.key,
      "details": nodeDetails,
    };

    if (await validateNodeInformation(nodeInfo, setError)) {
      try{
        updateNode(nodeInfo).then((any) => {
          nodeInfo.reload();
          setAlertInfo({msg: 'Tarefa alterada com sucesso!', mode: 'ok'});
          setIsInfoPanelOpen(false);
        })
      }
      catch(e){
        setAlertInfo({ msg:e, mode: 'error' })
      }
    }
  }

  React.useEffect(() => {
    setNodeName(String(nodeInfo.label) === 'Nova tarefa!' ? "" : nodeInfo.label);
    setNodeType(NodeDetailsTypeEnum.getDropdownOptionByCode(nodeInfo.type));
    setNodeDetails((typeof nodeInfo.details != 'undefined') ? nodeInfo.details : {});

    setNodeNameError('');
  }, [nodeInfo])

  return (
    <SimulationInfoStyled>
      <Container className='node_info_container'>
        <Input
          className="input"
          placeholder="Nome"
          tooltipTitle="Nome"
          value={nodeName}
          type={'text'}
          error={nodeNameError}
          onChange={(event)=>{ handleNodeNameChange(event.target.value) }}
        />
        <NodeDetailsComponent nodeInfo={nodeInfo} setNodeDetails={setNodeDetails} nodeDetails={nodeDetails} nodeType={nodeType} setNodeType={setNodeType}/>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
          <Button
            type="submit"
            sx={{ mt: 3, mb: 5, fontWeight: 600, letterSpacing: "2px", backgroundColor: smokeHover, "&:hover": { backgroundColor: smoke } }}
            variant="contained"
            onClick={ handleSubmit }
          >
            Salvar
          </Button>
        </div>
      </Container>
    </SimulationInfoStyled>
  );
}
import React from 'react';
import SimulationInfoStyled from "./styled";
import {
  Container,
} from '@mui/material';
import { validateNodeInformation } from "../../../../../service/validators/nodeInformation";
import NodeDetailsComponent from "../../nodeDetails/index.jsx";

export default ({ nodeInfo }) => {

  const [nodeLabel, setNodeLabel] = React.useState(nodeInfo.label);
  let nodeDetails = {};

  return (
    <SimulationInfoStyled>
      <Container className='node_info_container'>
        <input
          className="input"
          placeholder="Título"
        />
        <NodeDetailsComponent />
      </Container>
    </SimulationInfoStyled>
  );
}
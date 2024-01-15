import React  from 'react';
import SimulationInfoStyled from "./style"
import { Container, Typography } from '@mui/material';

export default ({ setSelectedNode, updateAfterFinish  }) => {

  let show = () => {
    setSelectedNode(selectedNode => {
      
      selectedNode.data.label = "newNodeAdjusted";
      updateAfterFinish();

      return selectedNode;
    })
  }

  return (
    <SimulationInfoStyled>

      <Container onClick= { show }>
        <Typography>
          a
        </Typography>
      </Container>
     
    </SimulationInfoStyled>
  )
}
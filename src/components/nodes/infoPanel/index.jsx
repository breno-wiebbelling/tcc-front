import React  from 'react';
import SimulationInfoStyled from "./style"
import { Container, Typography } from '@mui/material';

export default ({ nodeInfo  }) => {

  console.log(nodeInfo)

  return (
    <SimulationInfoStyled>

      <Container>
        <Typography>
          {nodeInfo.id}
        </Typography>
      </Container>
     
    </SimulationInfoStyled>
  )
}
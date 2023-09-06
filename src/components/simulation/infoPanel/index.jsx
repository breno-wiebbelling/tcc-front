import React  from 'react';
import SimulationInfoStyled from "./style"
import { Container, Typography } from '@mui/material';

export default ({ simulationInfo  }) => {

  return (
    <SimulationInfoStyled>

      <Container>
        <Typography>
          Registro
        </Typography>
      </Container>
     
    </SimulationInfoStyled>
  )
}
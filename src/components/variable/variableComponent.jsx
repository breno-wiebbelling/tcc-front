import { VariableStyled } from "./variableStyled";
import React  from 'react';

import { VariableListComponent } from './list/variableListComponent'

export const VariableComponent = ({listOfVariables}) => {

    return (
        <VariableStyled>
            <VariableListComponent listOfVariables={listOfVariables}/>
        </VariableStyled>
    );

}
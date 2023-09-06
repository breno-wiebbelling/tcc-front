import {VariableListStyled} from './variableListStyled'
import React  from 'react';

export const VariableListComponent = ({ listOfVariables }) => {

    return (
        <VariableListStyled>

            <div className={'title'}>
                <div className={'variable_name'} >Nome</div>
                <div className={'variable_type'} >Tipo</div>
                <div className={'variable_value'}>Valor</div>
            </div>
            {listOfVariables.map( variable => {
                return (
                    <div className={'variable_container'}>
                        <div className={'variable_name'} >  {variable.name }  </div>
                        <div className={'variable_type'} >  {variable.type }  </div>
                        <div className={'variable_value'}>  {variable.value}  </div>
                    </div>
                )
            })}
        </VariableListStyled>
    )
}
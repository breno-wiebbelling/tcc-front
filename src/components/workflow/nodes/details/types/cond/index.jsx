import React from 'react';
import InputDetailsStyled from "./styled";
import { user_host_key } from "../../../../../../service/authService";
import { creamWhite } from "../../../../../common/style/index";
import Dropdown from "../../../../../form/dropdown";

import VariableCreationModal from "../../../../../variable/creation/variableCreationModal";
import ConditionalTypeEnum from "./conditionalTypeEnum";
import BooleanConditionalModal from "./conditonalModal/BooleanConditionModal";

import { getVariablesByUserAndSimulationId } from "../../../../../../service/clients/variableClient";
import { getNextNodesAvailable } from "../../../../../../service/clients/simulationClient"

const loadUserVariables = async (simulationId, setVariables) => {
  let userVariables = await getVariablesByUserAndSimulationId(0, simulationId)
  let filteredVariables = userVariables.list.map(v => {
    return {key: v['_id'], label:v['name'], value:v['value']}
  });

  setVariables(filteredVariables)

  return filteredVariables;
}

const conditionalTypeOptions = [
  {key: ConditionalTypeEnum.BOOL.code,   value: ConditionalTypeEnum.BOOL.code,   label: ConditionalTypeEnum.BOOL.name  },
  {key: ConditionalTypeEnum.SWITCH.code, value: ConditionalTypeEnum.SWITCH.code, label: ConditionalTypeEnum.SWITCH.name},
]

const defaultBooleanComparison = { "name": "Não definida" }

export default ({ nodeInfo, setNodeDetails, nodeDetails }) => {
  const [variables, setVariables] = React.useState([]);
  const [conditionalType, setConditionalType] = React.useState(conditionalTypeOptions[0])
  const [comparisonDetails, setComparisonDetails] = React.useState(defaultBooleanComparison);
  const [optionsDetails, setOptionsDetails] = React.useState([]);
  const [optionsAvailable, setOptionsAvailables] = React.useState([])

  const [variableCreationModalOpen, setVariableCreationModalOpen] = React.useState(false);
  const [booleanCreationModalOpen, setBooleanCreationModalOpen] = React.useState(false);

  const handleVariableCreation = () => {
    loadUserVariables(nodeInfo['simulationId'], setVariables)
      .then(() => {
        setVariableCreationModalOpen(false);
      });
  }

  const handleBooleanDetailsCreation = (booleanDetails) => {
    setComparisonDetails((latest) => {
      let newComparisonDetails =  { ...latest, ...booleanDetails };
      setNodeDetails(latestNodeDetails => {
        return {
          ...latestNodeDetails,
          conditionalDetails: {
            comparisonDetails: newComparisonDetails,
            type: conditionalType.key
          }
        }
      })

      return newComparisonDetails
    })

    setBooleanCreationModalOpen(false)
  }

  const setOptionByCase = (caseName, newValue) => {
    setOptionsDetails(optDetails => {
      optDetails = optDetails.map(optDetail => {
        if(optDetail.case === caseName){
          return { ...optDetail, option: newValue }
        }

        return optDetail;
      });

      setNodeDetails(nodeDetails => {
        return {
          ...nodeDetails,
          conditionalDetails:{
            ...nodeDetails.conditionalDetails,
            options: optDetails.map(optD => {
              return { case: optD.case, option: optD.option.key};
            })
          }
        }
      });

      return optDetails;
    });
  }

  React.useEffect(()=> {
    loadUserVariables(nodeInfo['simulationId'], setVariables)
    getNextNodesAvailable(nodeInfo['simulationId'], nodeInfo['id']).then(availableNodes => {
      availableNodes.push({ id: 'temp', name: "Tarefa temporária"});

      setOptionsAvailables((latest)=>{
        return availableNodes.map(aNode => {
          return { key: aNode.id, value: aNode.id, label: aNode.name}
        })
      });
    });
    //TODO: if conditionalType not defined
    handleBooleanDetailsCreation(nodeInfo['details'])
  },[nodeInfo])

  React.useEffect(()=>{
    if(conditionalType.value === ConditionalTypeEnum.BOOL.code){
      setOptionsDetails([
        {
          case: "true",
          option: { key: "", value: "", label: `Node caso true`}
        },
        {
          case: "false",
          option: { key: "", value: "", label: `Node caso false`}
        }
      ])
    }
  }, [conditionalType]);

  return (
    <InputDetailsStyled>
      <div className="node-details-line"></div>
      <h3>Detalhes de Saída</h3>
      <div style={{ height: '45px' }}>
        <Dropdown placeholder="Tipo de Comparação" tooltipTitle={"Tipo de Comparação"} options={conditionalTypeOptions} value={conditionalType} onChange={setConditionalType} isEnabled={true}/>
      </div>
      {
        conditionalType.value === ConditionalTypeEnum.BOOL.code &&
        ( 
          <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
              Condição:
              <p onClick={() => {setBooleanCreationModalOpen(true)}} style={{backgroundColor: creamWhite, padding: "2px 7px", borderRadius: "5px", marginLeft: "10px", cursor: "pointer"}}>
                  { comparisonDetails.name }
              </p>
            </div>
            <div>
              {
                optionsDetails.map(option => {
                  return (
                    <div style={{ display: 'flex', height: '45px',  marginTop: '10px', gap: '10px', alignItems: 'center' }} key={option.case}>
                      <p>{option.case}</p>
                      <Dropdown options={optionsAvailable} value={option.option} placeholder={`Node caso ${option.case}`} tooltipTitle={`Node caso ${option.case}`} onChange={(selectedOption)=>{ setOptionByCase(option.case, selectedOption) }} hasNewValueOption={false} isEnabled={true}/>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
      <BooleanConditionalModal
        isOpen={booleanCreationModalOpen}
        close={() => {setBooleanCreationModalOpen(false) }}
        onCreate={ handleBooleanDetailsCreation }
        comparisonDetails={ comparisonDetails }
        setComparisonDetails={ setComparisonDetails }
        simulationId={nodeInfo['simulationId']}
        variables={variables}
        setVarCreationModal={setVariableCreationModalOpen}
      />
      <VariableCreationModal
        isOpen={variableCreationModalOpen}
        close={() => {setVariableCreationModalOpen(false) }}
        onCreate={handleVariableCreation}
        simulationId={nodeInfo['simulationId']}
      />
    </InputDetailsStyled>
  )
}
import React from 'react';
import InputDetailsStyled from "./styled";
import { user_host_key } from "../../../../../../service/authService";
import { creamWhite, denseSmoke, smoke, smokeHover, smokeWhite, smokeWhiteLight, white, whiteHover } from "../../../../../common/style/index";
import Dropdown from "../../../../../form/dropdown";
import HttpOperationEnum from "./HttpOperationEnum";
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@mui/material";
import EditUriDetailsModal from "./uriBuilder/editUriDetailsModal";
import { getVariablesByUserAndSimulationId } from "../../../../../../service/clients/variableClient";
import VariableTypeEnum from "../../../../../variable/VariableTypeEnum";
import VariableCreationModal from "../../../../../variable/creation/variableCreationModal";
import {formatURIInfo} from "./uriBuilder/uriBuilderManager";

const HTTP_METHOD_KEY = 'httpMethod';
const URI_ELEMENT_CLASS = "uri-element-close-icon-button";

const obtainHttpMethod = (nodeDetails) => {
  return ( typeof nodeDetails[HTTP_METHOD_KEY] != 'undefined')
    ? HttpOperationEnum.getDropdownOptionByCode(nodeDetails[HTTP_METHOD_KEY])
    : HttpOperationEnum.getDropdownOptionByCode(HttpOperationEnum.GET.code) ;
}
const getUserHost = ()=>{ return sessionStorage.getItem(user_host_key); }
const setOpacity = (state, document, index) => { document.getElementById(`${URI_ELEMENT_CLASS}${index}`).style.opacity = (state) ? 1 : 0; }

const loadUserVariables = (simulationId, setVariables) => {
  getVariablesByUserAndSimulationId(0, simulationId)
    .then(userVariables => {
      let filteredVariables = userVariables.list.map(v => {
        return {key: v['_id'], label:v['name'], value:v['value']}
      });

      setVariables(filteredVariables)
      return filteredVariables;
    })
}

export default ({ nodeInfo, setNodeDetails, nodeDetails }) => {
  const [httpMethod, setHttpMethod] = React.useState(obtainHttpMethod(nodeDetails));
  const [uriElements, setUriElements] = React.useState([]);
  const [variables, setVariables] = React.useState([]);

  const [isUriEditModalOpen, setIsUriEditModalOpen] = React.useState(false);
  const [isNewUri, setIsNewUri] = React.useState(true);

  const closeUriEditModalOpen = () => { setIsUriEditModalOpen(false); }
  const [newUriInfo, setNewUriInfo] = React.useState({})
  const [variableCreationModalOpen, setVariableCreationModalOpen] = React.useState(false);
  const handleVariableCreation = () => {
    setVariableCreationModalOpen(false);
    loadUserVariables(nodeInfo['simulationId'], setVariables);
    setIsUriEditModalOpen(true);
  }
  const openUriEditModal = (uriInfo, isNew) => {
    setIsNewUri(isNew);
    setIsUriEditModalOpen(true);
    setNewUriInfo(uriInfo);
  }
  const handleUriEdit = (newUriInfo) => {
    let newUriIndex = newUriInfo['raw']['index'];

    setNodeDetails(latest => {
      let simpleUriInfo = latest['uriInfo'];

      if(newUriIndex === simpleUriInfo.length){
        simpleUriInfo.push({type: newUriInfo['raw']['type']['value'], value: newUriInfo['raw']['value'] });
      }
      else{
        simpleUriInfo = simpleUriInfo.map((uriElement, index) => {
          return (index === newUriIndex)
            ? {type: newUriInfo['raw']['type']['value'], value: newUriInfo['raw']['value'] }
            : uriElement;
        })
      }

      latest['uriInfo'] = simpleUriInfo;
      return latest;
    });

    uriElements[newUriIndex] = newUriInfo;
    closeUriEditModalOpen();
  }

  const handleUriDelete = (index) => {
    setNodeDetails(latest => {
      latest['uriInfo'].splice(index, 1);
      return latest;
    });

    uriElements.splice(index, 1)
    closeUriEditModalOpen();
  }

  const openVariableCreationModal = () => {
    setVariableCreationModalOpen(true);
    setIsUriEditModalOpen(false);
  }

  const closeVariableCreationModal = () => {
    setVariableCreationModalOpen(false);
    setIsUriEditModalOpen(true);
  }

  React.useEffect(() => {
    loadUserVariables(nodeInfo['simulationId'], setVariables);
  }, [nodeInfo['simulationId']]);

  React.useEffect(()=> {
    setHttpMethod(obtainHttpMethod(nodeDetails));
    setUriElements(nodeInfo['details']['uriInfo'].map((uriInfo, index) => {
      return formatURIInfo(uriInfo , index)
    }));
  },[nodeInfo])

  React.useEffect(() => {
    setNodeDetails(latestDetails => {
      return {
        ...latestDetails,
        "httpMethod": httpMethod.value
      }
    });
  }, [httpMethod])

  return (
    <InputDetailsStyled>
      <div className="node-details-line"></div>
      <h3>Detalhes de Entrada</h3>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <p style={{backgroundColor: creamWhite, padding: "2px 7px", borderRadius: "5px", marginRight: "10px"}}>
          Seu host é:
        </p>
        <a href={getUserHost()} target={"_blank"} style={{fontSize: "15px"}}>
          {getUserHost()}
        </a>
      </div>
      <div className="dropdown-http-operation">
        <Dropdown placeholder="Método HTTP" tooltipTitle={"Método HTTP recebido"} options={HttpOperationEnum.dropdownOptions} value={httpMethod} onChange={setHttpMethod} isEnabled={true}/>
      </div>
      {
        httpMethod.value === HttpOperationEnum.GET.code &&
        (
          <div className={"get-request-http-details"} style={{ position: "relative" }}>
            {
              uriElements.map((uriElement, index) => {
                return (
                  <div className={"uri-element"}  onMouseEnter={() => setOpacity(true, document, index)} onMouseLeave={() => setOpacity(false, document, index)} key={index}>
                    <p>{ uriElement.display }</p>
                    <IconButton className={`display_flex_center`} id={`${URI_ELEMENT_CLASS}${index}`} onClick={()=>{ openUriEditModal(uriElement, false) }} sx={{ width: "20px",  height: "20px",  backgroundColor: smokeWhite,  borderRadius: "50%",  color: white,  opacity: 0,  "&:hover": {backgroundColor: smoke},  "&:active": {backgroundColor: smokeHover} }}>
                      <MoreHorizIcon sx={{width: "15px", height: "16px"}} className={"closeicon-uri-element"}/>
                    </IconButton>
                  </div>
                );
              })
            }
            <IconButton className={`display_flex_center`} onClick={()=>{ openUriEditModal({ raw: { index: uriElements.length } }, true) }} sx={{ width: "25px",  height: "25px", borderRadius: "50%",  color: denseSmoke, position: "absolute", bottom: '10px', right: '10px', backgroundColor: white, "&:hover": {backgroundColor: whiteHover}, "&:active": {backgroundColor: smokeWhiteLight} }}>
              <AddIcon sx={{width: "18px", height: "18px"}} />
            </IconButton>
          </div>
        )
      }
      <div className="node-details-line"></div>
      <VariableCreationModal
        isOpen={variableCreationModalOpen}
        close={() => { closeVariableCreationModal(false) }}
        onCreate={handleVariableCreation}
        simulationId={nodeInfo['simulationId']}
      />
      <EditUriDetailsModal
        isOpen={isUriEditModalOpen}
        close={closeUriEditModalOpen}
        onComplete={handleUriEdit}
        onDelete={handleUriDelete}
        simulationId={nodeInfo['simulationId']}
        uriInfo={newUriInfo}
        isNewUri={isNewUri}
        variables={variables}
        openVariableCreationModal={openVariableCreationModal}
      />
    </InputDetailsStyled>
  )
}
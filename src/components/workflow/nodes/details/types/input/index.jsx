import React from 'react';
import { creamWhite, denseSmoke, smoke, smokeHover, smokeWhite, smokeWhiteLight, white, whiteHover } from "../../../../../common/style/index";
import InputDetailsStyled from "./styled";
import Dropdown from "../../../../../form/dropdown";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import PopperAlert from '../../../../../alert/index';
import {IconButton} from "@mui/material";
import VariableCreationModal from "../../../../../variable/creation/variableCreationModal";
import EditUriDetailsModal from "./uriBuilder/editUriDetailsModal";
import URIValueTypeEnum from './uriBuilder/URIValueTypeEnum';
import HttpOperationEnum from "./HttpOperationEnum";
import { user_host_key } from "../../../../../../service/authService";
import { getVariablesByUserAndSimulationId } from "../../../../../../service/clients/variableClient";
import { validateNewUriInfo } from "../../../../../../service/clients/nodeClient"
import { getUrisByType } from "./uriBuilder/uriBuilderManager";
import VariableTypeEnum from '../../../../../variable/VariableTypeEnum';

const HTTP_METHOD_KEY = 'httpMethod';
const URI_ELEMENT_CLASS = "uri-element-close-icon-button";

const obtainHttpMethod = (nodeDetails) => {
  return ( typeof nodeDetails[HTTP_METHOD_KEY] != 'undefined')
    ? HttpOperationEnum.getDropdownOptionByCode(nodeDetails[HTTP_METHOD_KEY])
    : HttpOperationEnum.getDropdownOptionByCode(HttpOperationEnum.GET.code) ;
}

const getUserHost = ()=>{
  return localStorage.getItem(user_host_key);
}
const setOpacity = (state, document, index) => { document.getElementById(`${URI_ELEMENT_CLASS}${index}`).style.opacity = (state) ? 1 : 0; }

const loadUserVariables = (simulationId, setVariables, setJsonVariables) => {
  getVariablesByUserAndSimulationId(0, simulationId)
    .then(userVariables => {
      let filteredVariables = userVariables.list.map(v => {
        return {key: v['_id'], label:v['name'], value:v['value']}
      });

      let filteredJsonVariables = userVariables.list
        .filter((v)=>{ return v.type == VariableTypeEnum.JSON.code })
        .map((v)=>{ return {key: v['_id'], label:v['name'], value:v['value']} });

      setJsonVariables(filteredJsonVariables)
      setVariables(filteredVariables)
      return filteredVariables;
    })
}

const formatEndUri = (uriElements) => {
  let formatedUri = "";

  uriElements.forEach(ue => {
    formatedUri+=ue.uiDisplay;
  })

  return formatedUri;
}

const mapFirstQuery = (uriElements) => {

  if(uriElements.length > 0 && uriElements[0]['uiDisplay'].includes('&')){
    let firstDisplay = uriElements[0]['uiDisplay'].split('&');
    firstDisplay[0] = "?";
    uriElements[0]['uiDisplay'] = firstDisplay.join('')
  }

  return uriElements;
}

const sortUriElements = (uriElements) => {
  let queryElements = getUrisByType(uriElements, URIValueTypeEnum.QUERY.code);
  queryElements = mapFirstQuery(queryElements);

  let sortedUris = [
    ...getUrisByType(uriElements, URIValueTypeEnum.URI.code),
    ...getUrisByType(uriElements, URIValueTypeEnum.PATH.code),
  ];
  let lastUriOrPathElementIndex = sortedUris.length;
  sortedUris = [ ...sortedUris, ...queryElements]

  for(let i = lastUriOrPathElementIndex; i< sortedUris.length; i++){
    sortedUris[i]['index'] = i;
  }

  sortedUris.sort((a, b) => a.index - b.index);

  return sortedUris;
}

export default ({ nodeInfo, setNodeDetails, nodeDetails }) => {
  const [httpMethod, setHttpMethod] = React.useState(obtainHttpMethod(nodeDetails));
  const [uriElements, setUriElements] = React.useState([]);
  const [endURI, setEndUri] = React.useState("");
  const [variables, setVariables] = React.useState([]);
  const [jsonVariables, setJsonVariables] = React.useState([]);
  const [postInputVariable, setPostInputVariable] = React.useState({});

  const [isUriEditModalOpen, setIsUriEditModalOpen] = React.useState(false);
  const [isNewUri, setIsNewUri] = React.useState(true);

  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }
  const setError = (errMsg) => { setAlertInfo({ mode: 'error', msg: errMsg }) }
  const setWarning = (wrnMsg) => { setAlertInfo({ mode: 'warn', msg: wrnMsg }) }

  const closeUriEditModalOpen = () => { setIsUriEditModalOpen(false); }
  const [newUriInfo, setNewUriInfo] = React.useState({ "uiDisplay": "/", "raw": { "value": { "label": "", "variable" : "" }, "type": "" }, "index": 0 })
  const [variableCreationModalOpen, setVariableCreationModalOpen] = React.useState(false);

  const handleVariableCreation = () => {
    setVariableCreationModalOpen(false);
    loadUserVariables(nodeInfo['simulationId'], setVariables, setJsonVariables);
    // setIsUriEditModalOpen(true);
  }

  const handleInputVariableChange = (newVariable) => {
    setPostInputVariable(newVariable);
    setNodeDetails(latest => {
      return {
        ...latest,
        details:{
          ...latest.details,
          inputVariable: newVariable
        }
      }
    })
  }

  const openUriEditModal = (uriInfo, isNew) =>{
    setNewUriInfo(uriInfo);
    setIsNewUri(isNew);
    setIsUriEditModalOpen(true);
  }

  const openUriEditModalNew = () => {
    setNewUriInfo(latest => {
      return {
        ...latest,
        "uiDisplay": "/", 
        "raw": { 
          "value": { "label": "", "variable" : "" }, 
          "type": "" 
        },
        index: uriElements.length
      }
    })
    setIsNewUri(true);
    setIsUriEditModalOpen(true);
  }

  const changeUriElements = (newUriElements) => {
    if(httpMethod.key === HttpOperationEnum.POST.code){
      newUriElements = getUrisByType(newUriElements, URIValueTypeEnum.URI.code);
    }

    let sortedUriElements = sortUriElements(newUriElements);
    setUriElements(sortedUriElements)
    setEndUri(formatEndUri(sortedUriElements));
  }

  const handleUriEdit = async (newUriInfo) => {
    let newUriIndex = newUriInfo['index'];
    let tempNode;

    setNodeDetails(latest => {
      let simpleUriInfo = latest['uriInfo'];
      if(newUriIndex === simpleUriInfo.length){
        simpleUriInfo.push(newUriInfo);
      }
      else{
        simpleUriInfo = simpleUriInfo.map((uriElement, index) => {
          return (index === newUriIndex)
            ? newUriInfo
            : uriElement;
        })
      } 
      latest['uriInfo'] = simpleUriInfo;
      changeUriElements(simpleUriInfo)

      tempNode = {
        ...nodeInfo,
        details: latest
      }

      return latest;
    });

    if(!(await validateNewUriInfo(tempNode))){
      setWarning("Essa URI já existe em outra simulação!");
    }

    closeUriEditModalOpen();
  }

  const handleUriDelete = (index) => {
    uriElements.splice(index, 1);
    uriElements.forEach((ue, i)=> ue.index = i);

    setNodeDetails(latest => {
      latest['uriInfo']=uriElements;
      return latest;
    });
    changeUriElements(uriElements)

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

  const validateNewQueryElement = (newUriElement) => {
    let localQueryElementNames = getUrisByType(uriElements, URIValueTypeEnum.QUERY.code).map(qe => qe.raw.value.label);

    if(localQueryElementNames.includes(newUriElement)){
      setError('Nome da query path já cadastrado!')
      return false;
    }

    return true;
  }

  React.useEffect(() => {
    loadUserVariables(nodeInfo['simulationId'], setVariables, setJsonVariables);
  }, [nodeInfo['simulationId']]);

  React.useEffect(()=> {
    setHttpMethod(obtainHttpMethod(nodeDetails));
    changeUriElements(nodeInfo['details']['uriInfo'])
  },[nodeInfo])

  React.useEffect(() => {
    setNodeDetails(latestDetails => {
      let newUriDetails = uriElements;

      return {
        ...latestDetails,
        "httpMethod": httpMethod.value,
        "uriInfo": newUriDetails
      }
    });
  }, [httpMethod])

  return (
    <InputDetailsStyled>
      {alertInfo.msg !== "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}
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
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <p style={{backgroundColor: creamWhite, padding: "2px 7px", borderRadius: "5px", marginRight: "10px"}}>
          URI:
        </p>
        <a href={getUserHost()+endURI} target={"_blank"} style={{fontSize: "15px"}}>
          {endURI}
        </a>
      </div>
      <div className="dropdown-http-operation">
        <Dropdown placeholder="Método HTTP" tooltipTitle={"Método HTTP recebido"} options={HttpOperationEnum.dropdownOptions} value={httpMethod} onChange={setHttpMethod} isEnabled={true}/>
      </div>
      {
        httpMethod.key === HttpOperationEnum.POST.code
        && (
          <div style={{ height: '45px', display: 'flex' }}>
            <Dropdown options={jsonVariables} value={postInputVariable} placeholder={"Payload de Entrada (JSON)"} tooltipTitle={"Variável JSON que irá armazenar as informações recebidas via POST"} onChange={(selectedVariable)=>{ handleInputVariableChange(selectedVariable) }} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => { openVariableCreationModal() }} isEnabled={true}  />
          </div>
        )
      }
      <div className={"get-request-http-details"} style={{ position: "relative" }}>
        {
          uriElements.map((uriElement, index) => {
            return (
              <div className={"uri-element"}  onMouseEnter={() => setOpacity(true, document, index)} onMouseLeave={() => setOpacity(false, document, index)} key={index}>
                <p>{ uriElement.uiDisplay }</p>
                <IconButton className={`display_flex_center`} id={`${URI_ELEMENT_CLASS}${index}`} onClick={()=>{ openUriEditModal(uriElement, false) }} sx={{ width: "20px",  height: "20px",  backgroundColor: smokeWhite,  borderRadius: "50%",  color: white,  opacity: 0,  "&:hover": {backgroundColor: smoke},  "&:active": {backgroundColor: smokeHover} }}>
                  <MoreHorizIcon sx={{width: "15px", height: "16px"}} className={"closeicon-uri-element"}/>
                </IconButton>
              </div>
            );
          })
        }
        <IconButton className={`display_flex_center`} onClick={()=>{ openUriEditModalNew() }} sx={{ width: "25px",  height: "25px", borderRadius: "50%",  color: denseSmoke, position: "absolute", bottom: '10px', right: '10px', backgroundColor: white, "&:hover": {backgroundColor: whiteHover}, "&:active": {backgroundColor: smokeWhiteLight} }}>
          <AddIcon sx={{width: "18px", height: "18px"}} />
        </IconButton>
      </div>
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
        validateNewQueryElement={validateNewQueryElement}
        uriInfo={newUriInfo}
        isNewUri={isNewUri}
        variables={variables}
        httpMethod={httpMethod}
        openVariableCreationModal={openVariableCreationModal}
      />
    </InputDetailsStyled>
  )
}
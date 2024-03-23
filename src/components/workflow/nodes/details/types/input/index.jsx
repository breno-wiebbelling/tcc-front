import React from 'react';
import InputDetailsStyled from "./styled";
import { user_host_key } from "../../../../../../service/authService";
import { creamWhite, denseSmoke, smoke, smokeHover, smokeWhite, smokeWhiteLight, white, whiteHover } from "../../../../../common/style/index";
import Dropdown from "../../../../../form/dropdown";
import HttpOperationEnum from "./HttpOperationEnum";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@mui/material";
import EditUriDetailsModal from "./uriBuilder/editUriDetailsModal";

const HTTP_METHOD_KEY = 'httpMethod';
const URI_ELEMENT_CLASS = "uri-element-close-icon-button";

const obtainHttpMethod = (nodeDetails) => {

  return ( typeof nodeDetails[HTTP_METHOD_KEY] != 'undefined')
    ? HttpOperationEnum.getDropdownOptionByCode(nodeDetails[HTTP_METHOD_KEY])
    : HttpOperationEnum.getDropdownOptionByCode(HttpOperationEnum.GET.code) ;
}
const getUserHost = ()=>{ return sessionStorage.getItem(user_host_key); }
const setOpacity = (state, document, index) => { document.getElementById(`${URI_ELEMENT_CLASS}${index}`).style.opacity = (state) ? 1 : 0; }

export default ({ nodeInfo, setNodeDetails, nodeDetails }) => {
  const [httpMethod, setHttpMethod] = React.useState(obtainHttpMethod(nodeDetails));
  const [uriElements, setUriElements] = React.useState([]);

  const [isUriEditModalOpen, setIsUriEditModalOpen] = React.useState(true);
  const closeUriEditModalOpen = () => { setIsUriEditModalOpen(false); }
  const [newUriInfo, setNewUriInfo] = React.useState({})

  const handleUriEdit = () => {
    closeUriEditModalOpen();
    // loadUserVariables();
  }

  const openUriEditModal = (uriInfo) => {
    setNewUriInfo(uriInfo);
    setIsUriEditModalOpen(true);
  }

  React.useEffect(()=> {
    setHttpMethod(obtainHttpMethod(nodeDetails));
    setUriElements([1, 2]);
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
                    <p onClick={()=>{ openUriEditModal(uriElement) }}>/dfsdfd</p>
                    <IconButton className={`display_flex_center`} id={`${URI_ELEMENT_CLASS}${index}`} sx={{ width: "20px",  height: "20px",  backgroundColor: smokeWhite,  borderRadius: "50%",  color: white,  opacity: 0,  "&:hover": {backgroundColor: smoke},  "&:active": {backgroundColor: smokeHover} }}>
                      <CloseIcon sx={{width: "15px", height: "16px"}} className={"closeicon-uri-element"}/>
                    </IconButton>
                  </div>
                );
              })
            }
            <IconButton className={`display_flex_center`} onClick={()=>{ openUriEditModal(null) }} sx={{ width: "25px",  height: "25px", borderRadius: "50%",  color: denseSmoke, position: "absolute", bottom: '10px', right: '10px', backgroundColor: white, "&:hover": {backgroundColor: whiteHover}, "&:active": {backgroundColor: smokeWhiteLight} }}>
              <AddIcon sx={{width: "18px", height: "18px"}} />
            </IconButton>
          </div>
        )
      }
      <div className="node-details-line"></div>
      <EditUriDetailsModal isOpen={isUriEditModalOpen} close={closeUriEditModalOpen} onCreate={handleUriEdit} simulationId={nodeInfo['simulationId']} uriInfo={newUriInfo} />
    </InputDetailsStyled>
  )
}
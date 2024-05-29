import React from 'react';
import { denseSmoke, smokeWhiteLight, white, whiteHover, smokeWhiteHover, lightVividGreen } from "../../../../../common/style/index";
import TextDetailsStyled from "./styled";
import AddIcon from '@mui/icons-material/Add';
import PopperAlert from '../../../../../alert/index';
import { IconButton } from "@mui/material";
import Dropdown from "../../../../../form/dropdown";
import VariableCreationModal from "../../../../../variable/creation/variableCreationModal";
import TextValueModal from "./textBuilder/textValueDetailsModal";
import { getVariablesByUserAndSimulationId } from "../../../../../../service/clients/variableClient";
import TextValueTypeEnum from "./textBuilder/TextValueTypeEnum";

export default ({ nodeInfo, setNodeDetails, nodeDetails }) => {

  const [variables, setVariables] = React.useState([]);
  const [variableCreationModalOpen, setVariableCreationModalOpen] = React.useState(false);
  const [textEditModalOpen, setTextEditModalOpen] = React.useState(false);

  const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: '' });
  const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: '' }); }

  const [textElements, setTextElements] = React.useState([]);
  const [newTextInfo, setNewTextInfo] = React.useState({ "uiDisplay": "", "type": "", "value": "", "isNew": true, "index": 0 });
  const [resultVariable, setResultVariable] = React.useState({});

  const loadUserVariables = () => {
    getVariablesByUserAndSimulationId(0, nodeInfo['simulationId'])
      .then(userVariables => {
        let filteredVariables = userVariables.list.map(v => {
          return { key: v['_id'], label: v['name'], value: v['value'] }
        });

        setVariables(filteredVariables)
        return filteredVariables;
      })
  }

  const handleVariableCreation = () => {
    setVariableCreationModalOpen(false);
    loadUserVariables(nodeInfo['simulationId']);
  }
  const openVariableCreationModal = () => { setVariableCreationModalOpen(true); }
  const closeVariableCreationModal = () => { setVariableCreationModalOpen(false); }
  const closeTextEditModalOpen = () => {
    setTextEditModalOpen(false);
    setNewTextInfo(latest => {
      return {
        ...latest,
        "uiDisplay": "", "type": "", "value": "", "isNew": true, "index": 0
      }
    });
  }
  const openTextEditModalOpen = (textElement) => {
    setNewTextInfo(latest => {
      return {
        ...latest,
        ...textElement
      }
    })
    setTextEditModalOpen(true);
  }

  const openTextModalCreation = () => {
    setNewTextInfo(latest => {
      return {
        ...latest,
        value: "",
        type: "",
        index: textElements.length
      }
    })
    setTextEditModalOpen(true);
  }

  const handleTextEdition = (newText) => {
    textElements[newText.index] = newText;
    closeTextEditModalOpen();
  }
  const handleTextDeletion = (index) => {
    textElements.splice(index, 1);
    closeTextEditModalOpen();
  }
  const handleResultVariable = (resultVariable) => {
    setResultVariable(resultVariable);
  }

  React.useEffect(() => {
    loadUserVariables(nodeInfo['simulationId']);
  }, [nodeInfo['simulationId']]);

  React.useEffect(() => {
    setTextElements(typeof nodeInfo['details']['textElements'] != "undefined" ? nodeInfo['details']['textElements'] : []);

    getVariablesByUserAndSimulationId(0, nodeInfo['simulationId'])
      .then(userVariables => {
        let filteredVariables = userVariables.list.map(v => {
          return { key: v['_id'], label: v['name'], value: v['value'] }
        });

        setVariables(filteredVariables)
        return filteredVariables;
      })
      .then((filteredVariables) => {
        setResultVariable(filteredVariables.filter(v => v['key'] == nodeInfo['details']['resultVariable'])[0])

        return filteredVariables;
      })

  }, [nodeInfo])

  React.useEffect(() => {
    setNodeDetails(latestDetails => {
      return {
        ...latestDetails,
        textElements: textElements,
        resultVariable: (typeof resultVariable != "undefined") ? resultVariable['key'] : ""
      }
    })
  }, [textElements, resultVariable])

  return (
    <TextDetailsStyled>
      <div className="node-details-line"></div>

      {alertInfo.msg !== "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}
      <h3>Detalhes de Texto</h3>
      <div className={"text-details"} style={{ position: "relative" }}>
        {
          textElements.map((textElement, index) => {
            return (
              <div
                className={"text-element"} key={index}
                onClick={() => { openTextEditModalOpen(textElement) }}
              >
                <p style={{ backgroundColor: (textElement.type == TextValueTypeEnum.TEXT.code) ? smokeWhiteHover : lightVividGreen }} >
                  {textElement.uiDisplay}
                </p>
              </div>
            );
          })
        }
        <IconButton
          className={`display_flex_center`}
          onClick={openTextModalCreation}
          sx={{ width: "25px", height: "25px", borderRadius: "50%", color: denseSmoke, position: "absolute", bottom: '10px', right: '10px', backgroundColor: white, "&:hover": { backgroundColor: whiteHover }, "&:active": { backgroundColor: smokeWhiteLight } }}
        >
          <AddIcon sx={{ width: "18px", height: "18px" }} />
        </IconButton>
      </div>
      <div style={{ height: '45px', display: 'flex', marginTop: "10px" }}>
        <Dropdown options={variables} value={resultVariable} placeholder={"Variável destino"} tooltipTitle={"Variável selecionada"} onChange={handleResultVariable} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={openVariableCreationModal} isEnabled={true} />
      </div>
      <div className="node-details-line"></div>
      <TextValueModal
        isOpen={textEditModalOpen}
        close={closeTextEditModalOpen}
        onComplete={handleTextEdition}
        onDelete={handleTextDeletion}
        textInfo={newTextInfo}
        variables={variables}
        openVariableCreationModal={openVariableCreationModal}
      />
      <VariableCreationModal
        isOpen={variableCreationModalOpen}
        close={() => { closeVariableCreationModal(false) }}
        onCreate={handleVariableCreation}
        simulationId={nodeInfo['simulationId']}
      />
    </TextDetailsStyled>
  )
}
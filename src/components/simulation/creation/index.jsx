import * as React from 'react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import CreationModalStyled from "./styled";
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Input from "../../form/rawInput/index";

import { createSimulation } from "../../../service/clients/simulationClient";
import { white, smokeWhite, smoke, smokeHover, denseLightBlue } from '../../common/style';

const style = {
  width: '40%',
  minWidth: '500px',
  height: '80%',
  p: 4,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "15px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

export default ({ open, setOpen, reload, setErrorMessage }) => {

  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = () => {
    if(name!=="" && name.trim() !== ""){
      return createSimulation({ 
        name: name, 
        description: description,
      })
      .then(new_simulations => {
        reload();
        setOpen(false);
      })
      .catch(e => {
        setErrorMessage(e);
      });
    }else{
      setNameError("Este campo é obrigatório");
    }
  }

  return (
    <CreationModalStyled>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" className='modal'>
        <Box sx={style}>
          <div style={{ width: "100%", height: "10%" }} >
            <IconButton 
              onClick={ handleClose }
              className='display_flex_center' 
              sx={{
                width: "40px",
                height: "40px",
                backgroundColor:smokeWhite,
                borderRadius: "50%",
                color:white,
                cursor:"pointer",
                "&:hover": {
                  backgroundColor:smoke
                },
                "&:active": {
                  backgroundColor:smokeHover
                }
              }}
            >
              <CloseIcon/>
            </IconButton>
          </div>
          <div
            className="content"
            style={{
              width: "60%",
              height: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h3 style={{ marginBottom: "20px" }} >Criação de Simulação</h3>

            <div style={{ width: '100%' }}>
              <Input
                error={nameError}
                label="Nome"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                placeholder={"Nome"}
              />
            </div>
            <textarea
              placeholder="Descrição da simulação"
              onChange={(event) => { setDescription(event.target.value) }}
              value={description}
              style={{
                width: "100%",
                height: "50%",
                fontSize: "15px",
                padding: "15px",
                boxSizing: "border-box",
                resize: "none",
                marginTop: '5px',

                border: `2px solid ${smoke}`,
                borderRadius: "5px",
              }}
            >
            </textarea>

            <Button
              type="submit"
              sx={{
                mt: 3,
                mb: 1,
                fontWeight: 600,
                letterSpacing: "2px",
                backgroundColor: denseLightBlue
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          </div>
        </Box>
      </Modal>
    </CreationModalStyled>
  );
}
import React from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PopperAlert from '../../../../../../alert/index';
import Input from "../../../../../../form/rawInput";
import ComparisonTypesEnum from "./ComparisonTypesEnum"

import { smoke, smokeHover, smokeWhite, white } from "../../../../../../common/style/index";
import Dropdown from "../../../../../../form/dropdown";
const style = { width: '40%', height: '80%', p: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", outline: "none" };

const getComparisonName = (comparisonDetails, setName) => {
	if(typeof comparisonDetails.name != "undefined"){
		if(comparisonDetails.name === "Não definida"){
			setName("Nome da Comparação")
		}else{
			setName(comparisonDetails.name)
		}
	}
}

const formatComparison = (name, firstVariable, comparison, secondVariable) => {
	return {
		name: name,
		firstVariable: firstVariable.key,
		comparison: comparison.key,
		secondVariable: secondVariable.key
	}
}

export default ({ isOpen, close, onCreate, comparisonDetails, variables, setVarCreationModal }) => {

	const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});
	const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }

	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState("");
	const [firstVariable, setFirstVariable] = React.useState("")
	const [comparison, setComparison] = React.useState(ComparisonTypesEnum.defaultOption);
	const [secondVariable, setSecondVariable] = React.useState("")

	React.useEffect(()=>{
		getComparisonName(comparisonDetails, setName)
		setFirstVariable(comparisonDetails['firstVariable'])
		setComparison(comparisonDetails['comparison'])
		setSecondVariable(comparisonDetails['secondVariable'])
	}, [isOpen])

	const handleSubmit = async () => {
		if (validateFields(setAlertInfo)) {
			try{
				onCreate(formatComparison(name, firstVariable, comparison, secondVariable));
			}
			catch(e){
				setAlertInfo({ msg:e, mode: 'error' })
			}
		}
	}

	const validateFields = (setAlertInfo) => {

		if(name === "Não definida" || name === "Nome da Comparação"){
			setAlertInfo({ msg:"Insira um nome!", mode: 'error' })
			return false;
		}

		if(firstVariable === ""){
			setAlertInfo({ msg:"Insira a primeira variável!", mode: 'error' })
			return false;
		}

		if(comparison.key === "none"){
			setAlertInfo({ msg:"Insira a comparação!", mode: 'error' })
			return false;
		}

		if(secondVariable === ""){
			setAlertInfo({ msg:"Insira a segunda variável!", mode: 'error' })
			return false;
		}

		return true
	}

	return (
		<div>
			{alertInfo.msg !== "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}

			<Modal
				open={isOpen}
				onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
				className='modal'
			>
				<Box sx={style}>
					<div style={{ width: "100%", height: "10%" }}>
						<IconButton
							className='display_flex_center'
							onClick={close}
							sx={{ width: "40px", height: "40px", backgroundColor: smokeWhite, borderRadius: "50%", color: white, cursor: "pointer", "&:hover": { backgroundColor: smoke }, "&:active": { backgroundColor: smokeHover } }}
						>
							<CloseIcon />
						</IconButton>
					</div>
					<div className="content" style={{width: "60%", height: "90%"}}>
						<h3>Detalhes de Condição</h3>

						<div style={{width: "90%"}}>
							<Input
								value={name}
								onChange={(event) => setName(event.target.value)}
								placeholder="Nome da Comparação"
								error={nameError}
								tooltipTitle={"Nome da Comparação"}
							/>
							<div style={{height: '45px'}}>
								<Dropdown options={variables} value={firstVariable} placeholder={"Primeira Variável"} tooltipTitle={"Primeira Variável"} onChange={setFirstVariable} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => {setVarCreationModal(true)}} isEnabled={true}/>
							</div>
							<div style={{height: '45px', marginTop: '10px'}}>
								<Dropdown options={ComparisonTypesEnum.options} value={comparison} placeholder={"Tipo de Comparação"} tooltipTitle={"Tipo de Comparação"} onChange={setComparison} hasNewValueOption={false} isEnabled={true} />
							</div>
							<div style={{height: '45px', marginTop: '10px'}}>
								<Dropdown options={variables} value={secondVariable} placeholder={"Segunda Variável"} tooltipTitle={"Segunda Variável"} onChange={setSecondVariable} hasNewValueOption={true} className="dropdown" onNewValueOptionClick={() => {setVarCreationModal(true)}} isEnabled={true}/>
							</div>
						</div>

						<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
							<Button
								type="submit"
								sx={{
									mt: 3,
									mb: 1,
									fontWeight: 600,
									letterSpacing: "2px",
									backgroundColor: smokeHover,
									"&:hover": {backgroundColor: smoke}
								}}
								variant="contained"
								onClick={handleSubmit}
							>
								Salvar
							</Button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	)
}

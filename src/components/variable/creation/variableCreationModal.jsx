import React from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PopperAlert from '../../../components/alert/index';
import Dropdown from '../../form/dropdown';

import { smoke, smokeHover, smokeWhite, white } from "../../common/style/index";
import { createVariable } from "../../../service/clients/variableClient";
import Input from "../../form/rawInput/index";
import Textarea from "../../form/rawTextarea/index";
import VariableTypeEnum from '../VariableTypeEnum';

import { 
	validateDangerousChars,
	validateStringValue,
	validateJSON,
	validateNumberValue
} from "../../form/formValidators";

const style = { width: '40%', height: '80%', p: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", outline: "none" };
const variableTypesOptions = [{ key: VariableTypeEnum.JSON.code, value: VariableTypeEnum.JSON.code, label: VariableTypeEnum.JSON.name }, { key: VariableTypeEnum.NUMBER.code, value: VariableTypeEnum.NUMBER.code, label: VariableTypeEnum.NUMBER.name }, { key: VariableTypeEnum.TEXT.code, value: VariableTypeEnum.TEXT.code, label: VariableTypeEnum.TEXT.name }];

const validateTypeError = (type, setTypeError) => {
	if (type.key === VariableTypeEnum.NONE.code) {
		setTypeError("selecione um tipo");
		return false;
	}

	return true;
}

const validateVariableValue = (value, type, setValueError) => {
	switch (type.key) {
		case VariableTypeEnum.NUMBER.code:
			return validateNumberValue(value, setValueError, "Número inválido");
			break;
		case VariableTypeEnum.TEXT.code:
			return validateStringValue(value, setValueError, "Insira um valor");
			break;
		case VariableTypeEnum.JSON.code:
			return validateJSON(value, setValueError, "JSON inválido");
			break;
		default:
			break;
	}

	return;
}

const getInputType = (type) => {
	switch (type.key) {
		case VariableTypeEnum.NUMBER.code:
			return "number";
		default:
			return "text";
	}
}

export default ({ isOpen, close, onCreate, simulationId }) => {

	const [name, setName] = React.useState("");
	const [type, setType] = React.useState({ key: VariableTypeEnum.NONE.code, value: VariableTypeEnum.NONE.code, label: VariableTypeEnum.NONE.name });
	const [value, setValue] = React.useState("");
	const [description, setDescription] = React.useState("");

	const [nameError, setNameError] = React.useState("");
	const [typeError, setTypeError] = React.useState("");
	const [valueError, setValueError] = React.useState("");
	const [descriptionError, setDescriptionError] = React.useState("");
	const [alertInfo, setAlertInfo] = React.useState({ msg: '', mode: ''});

	const handleValueChange = (event) => { setValue(event.target.value); }
	const resetErrorMessage = () => { setAlertInfo({ msg: '', mode: ''}); }

	const handleSubmit = async () => {
		if (validateFields()) {
			try{
				await createVariable({ "name": name, "type": type.value, "value": value, "description": description, "simulationId": simulationId });
				setAlertInfo({ msg:'Variável criada com sucesso!', mode: 'ok' })
				onCreate();
			}
			catch(e){
				setAlertInfo({ msg:e, mode: 'error' })
			}
		}
	}

	const validateFields = () => {
		return (
			validateStringValue(name, setNameError, "Insira um nome") &&
			validateTypeError(type, setTypeError) &&
			validateVariableValue(value, type, setValueError) &&
			validateDangerousChars(description, setDescriptionError, "Descrição inválida")
		);
	}

	return (
		<div>
			{alertInfo.msg != "" && <PopperAlert message={alertInfo.msg} mode={alertInfo.mode} resetMessage={resetErrorMessage} />}	

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
					<div className="content" style={{ width: "60%", height: "90%" }}>
						<h3>Criação de Variável</h3>
						<Input
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Nome"
							error={nameError}
						/>
						<div className="dropdown-variable-type" style={{ height: "45px", marginBottom: "8px" }}>
							<Dropdown placeholder="Tipo de Variável" options={variableTypesOptions} value={type} onChange={setType} isEnabled={true} />
						</div>
						{
							type.key !== VariableTypeEnum.NONE.code &&
							(type.key !== VariableTypeEnum.JSON.code )&&
							(
								<Input
									value={value}
									onChange={handleValueChange}
									type={getInputType(type)}
									placeholder="Valor da variável"
									error={valueError}
								/>
							)
						}
						{
							type.key === VariableTypeEnum.JSON.code &&
							(
								<Textarea
									value={value}
									onChange={handleValueChange}
									placeholder="Valor da variável"
									error={valueError}
								/>
							)
						}
						{value !== "" && (
							<Textarea
								value={description}
								onChange={(event) => setDescription(event.target.value)}
								placeholder="Descrição da simulação"
								error={descriptionError}
							/>
						)}

						<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
							<Button
								type="submit"
								sx={{ mt: 3, mb: 1, fontWeight: 600, letterSpacing: "2px", backgroundColor: smokeHover, "&:hover": { backgroundColor: smoke } }}
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

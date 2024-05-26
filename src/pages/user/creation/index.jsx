import { CreationStyled } from "./styled"

import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';
import { PassInput } from "../../../components/form/input/index";
import { createUser, validateHostEligibility } from "../../../service/clients/userClient";
import { verifyUserAndEmailEligibility, validateAndComparePasswords } from "../../../service/validators/userValidator"
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/KeyboardArrowDown';

import backgroundImage from "./images/register_background.png"
import restmupWelcomeLogo from "./images/1-cutout.png"

export default () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [formStep, setFormStep] = useState(1);
	const [host, setHost] = useState("");

	const [formErrors, setFormErrors] = useState({ name: '', email: '', password: '', passwordConfirmation: '', host: '' });

	const setValidationResult = (result) => {
		if (Object.values(result).every(erro => erro === '')) return true;

		setFormErrors(result);
		return false;
	}

	const validateFirstStep = async () => {
		let validationResult = await verifyUserAndEmailEligibility({ "username": username, "email": email });
		return setValidationResult(validationResult);
	};

	const validateSecondStep = async () => {
		let validationResult = await validateAndComparePasswords({
			"password": password,
			"passwordConfirmation": passwordConfirmation
		});

		return setValidationResult(validationResult);
	}

	const handleFirstStep = async (e) => {
		e.preventDefault();
		setFormStep(2);
		// if (await validateFirstStep()) setFormStep(2);
	};

	const handleSecondStep = async (e) => {
		e.preventDefault();
		setFormStep(3)

		// if (await validateSecondStep()) {
		// 	setFormStep(3)
		// }
	};

	const handleThirdStep = async () => {
		if (!(await validateHostEligibility(host))) {
			setFormErrors(latest => {
				return {
					...latest,
					"host": "Host não disponível"
				}
			})
			return
		}

		let userCreationResponse = await createUser({
			"username": username,
			"email": email,
			"password": password,
			"host": host
		});

		if (userCreationResponse == true) {
			navigate('/');
		}
		else {
			alert(userCreationResponse)
		}
	}

	return (
		<CreationStyled className="base_page">
			<div className="creation">
				<div className="welcome">
					<h3>Bem-vindo ao</h3>
					<img
						style={{ width: '45%' }}
						src={restmupWelcomeLogo}
					/>
					<p>Simulações de rotas REST.</p>
					<p>Garanta a funcionalidade dos seus endpoints <span className="before">antes</span> do desenvolvimento.</p>
				</div>

				<Container
					sx={{
						width: '40%',
						height: '100%',
						boxSizing: 'border-box',
						padding: '5% 0%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div style={{ width: '70%', marginBottom: '20px', display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
						<div style={{ height: '30px', width: '30px' }}>
							{
								formStep > 1 &&
								<IconButton className="back_button" onClick={() => { setFormStep(ls => --ls) }} style={{ height: '30px', width: '30px' }}>
									<ArrowBackIosIcon />
								</IconButton>
							}
						</div>
						<Typography sx={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '1.4px', fontWeight: "600" }} >
							{formStep === 1 && 'Registro'}
							{formStep === 2 && 'Defina sua senha'}
							{formStep === 3 && 'Host'}
						</Typography>
						<div style={{ height: '30px', width: '30px' }}>
						</div>
					</div>

					<Box sx={{ mt: '30px', width: '100%' }} >
						{
							formStep === 1 &&
							(
								<div className="form-items">
									<TextField
										label="Nome"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										error={!!formErrors.username}
										helperText={formErrors.username}
										margin="normal"
										sx={{ width: "70%" }}
									/>
									<TextField
										label="Email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										error={!!formErrors.email}
										helperText={formErrors.email}
										margin="normal"
										sx={{ width: "70%" }}
									/>
									<Button onClick={handleFirstStep} variant="contained" className="continueButton" color="primary">
										Avançar
									</Button>
								</div>
							)
						}
						{
							formStep === 2 &&
							(
								<div className="form-items">
									<div style={{ width: "70%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
										<PassInput
											label="Senha"
											error={formErrors.password}
											onChange={(e) => { setPassword(e.target.value) }}
										/>
										<PassInput
											label="Confirmar Senha"
											error={formErrors.passwordConfirmation}
											onChange={(e) => { setPasswordConfirmation(e.target.value) }}
										/>
									</div>

									<Button onClick={handleSecondStep} className="continueButton" variant="contained" color="primary">
										Avançar
									</Button>
								</div>
							)
						}
						{
							formStep === 3 &&
							(
								<div className="form-items">
									<Tooltip title={"Este será o subdmínio das suas simulações"}>
										<TextField
											label="Host"
											type="text"
											value={host}
											onChange={(e) => setHost(e.target.value)}
											error={!!formErrors.host}
											helperText={formErrors.host}
											margin="normal"
											sx={{ width: "70%" }}
										/>
									</Tooltip>
									<div>

									</div>
									<Button onClick={handleThirdStep} className="continueButton" variant="contained" color="primary">
										Concluir
									</Button>
								</div>
							)
						}
					</Box>
				</Container>
			</div>
		</CreationStyled>
	);
}
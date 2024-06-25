export const validateDangerousChars = (value, setError) => {
	const dangerousChars = ['<', '>', '/', '?', '%', '#', '&', "*", "$","!", "{", "}", "!", "#", "$", "¨¨", "(", ")", "-", "+", "+", "=", "[", "]"];
	setError("");

	if (dangerousChars.some(char => value.includes(char))) {
		setError("Caracteres inválidos");
		return false;
	}

	return true;
}

export const validateStringValue = (value, setError, errorMessage) => {
	if (typeof value === 'undefined' || value === "" || value.trim() === "" ) {
		setError(errorMessage);
		return false;
	}

	return validateDangerousChars(value, setError);
}

export const validateJSON = (jsonString, setError, errorMessage) => {
	setError("");

	try {
		JSON.parse(jsonString);
		return true
	} catch (error) {
		setError(errorMessage);
		return false;
	}

	return true;
};

export const validateNumberValue = (value, setError, errorMessage) => {
	setError("");

	if (isNaN(value)) {
		setError(errorMessage);
		return false
	}

	return true;
};
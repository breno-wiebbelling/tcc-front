import { validateNameAndEmailEligibility, verifyUserCredential } from "../clients/userClient";

const validateEmail = (email) => {
    if (email === '') return 'O email é obrigatório.'
    if (!/\S+@\S+\.\S+/.test(email)) return 'O email não é válido.'

    return '';
}

export const validateLoginCredentials = (payload) => {
    let newLoginErrors = { email: '', password: ' ' }

    newLoginErrors.email = validateEmail(payload.email);
    newLoginErrors.password = (payload.password.length === 0) ? "Insira sua senha" : '';

    return newLoginErrors;
}

export const verifyUserAndEmailEligibility = async (payload) => {
    let errors = {};

    errors.username = (payload.username === '') ? 'O nome é obrigatório.' : '';
    errors.email = validateEmail(payload.email);

    let userAndEmailEligibilityResult = await validateNameAndEmailEligibility(payload.username, payload.email);

    if (!Object.values(userAndEmailEligibilityResult).every(result => result == '')) {
        errors.email = userAndEmailEligibilityResult.email;
        errors.username = userAndEmailEligibilityResult.username;
    };

    return errors;
}

export const validateAndComparePasswords = async (payload) => {
    let errors = {};

    errors.password = (payload.password === '') ? 'A senha é obrigatória.' : '';
    errors.password = (payload.password.length < 6) ? 'A senha deve ter pelo menos 6 caracteres.' : '';

    if (errors.password != '') {
        return errors;
    }

    if (payload.password !== payload.passwordConfirmation) {
        errors.passwordConfirmation = 'As senhas devem ser iguais';
    }

    return errors;
} 

export const verifyCredentialEligibility = async (value, valueName) => {
    return verifyUserCredential(value, valueName);
}
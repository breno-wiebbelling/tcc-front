import baseClient from "./baseClient";

const variableURI = 'variable';
const pageURI = 'page';
const simulationIdURI = 'simulationId';
const typeURI = 'type';

export const createVariable = async (variable) => {
  return (
    await baseClient.post(`/${variableURI}`, { "variable": variable })
  ).data;
}

export const getVariablesByUser = async (page) => {
  return (
    await baseClient.get(`/${variableURI}/${pageURI}=${page}`)
  ).data;
}

export const getVariablesByUserAndSimulationId = async (page, simulationId) => {
  return (
    await baseClient.get(`/${variableURI}/${simulationIdURI}=${simulationId}&${pageURI}=${page}&`)
  ).data;
}

export const getVariablesByUserAndTypeAndSimulationId = async (page, simulationId, type) => {
  return (
    await baseClient.get(`/${variableURI}/${simulationIdURI}=${simulationId}&${typeURI}=${type}&${pageURI}=${page}`)
  ).data;
}
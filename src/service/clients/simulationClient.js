import baseClient from "./baseClient";

const simulationURI = '/simulation';

export const getSimulationsByUser = async (page) => {
  return (await baseClient.get(`${simulationURI}/${parseInt(page)-1}`)).data;
}

export const createSimulation = async (simulation) => {
  return (
    await baseClient.post(`${simulationURI}`, { "simulation": simulation })
  ).data;
}
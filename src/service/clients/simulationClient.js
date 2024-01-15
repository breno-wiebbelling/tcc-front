import baseClient from "./baseClient";

const simulationURI = 'simulation';
const byUserURI = 'byUser';
const byIdURI = 'byId'

export const getSimulationsByUser = async (page) => {
  return (await baseClient.get(`/${simulationURI}/${byUserURI}/${parseInt(page)-1}`)).data;
}

export const createSimulation = async (simulation) => {
  return (
    await baseClient.post(`/${simulationURI}`, { "simulation": simulation })
  ).data;
}

export const deleteSimulationById = async (simulation_id) => {

  return (
    await baseClient.delete(
      `/${simulationURI}`,
      { data: { 'simulation_id':simulation_id }}
    )
  ).data;
}

export const getSimulationById = async (simulationId) => {
  return (await baseClient.get(`/${simulationURI}/${byIdURI}/${simulationId}`)).data;
}
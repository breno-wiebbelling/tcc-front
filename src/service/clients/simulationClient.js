import baseClient from "./baseClient";

const simulationURI = 'simulation';
const pageURI = 'page';
const nodesURI = 'nodes'

export const getSimulationsByUser = async (page) => {
  return (await baseClient.get(`/${simulationURI}/${pageURI}=${parseInt(page)-1}`)).data;
}

export const getInitialNodesBySimulationId = async (simulationId) => {
  return (
    (
      await baseClient.get( `/${simulationURI}/${simulationId}/${nodesURI}` )
    )["data"]
  );
}

export const createSimulation = async (simulation) => {
  return (
    await baseClient.post(`/${simulationURI}`, { "simulation": simulation })
  ).data;
}

export const deleteSimulationById = async (simulationId) => {
  return (
    await baseClient.delete(`/${simulationURI}/${simulationId}`)
  ).data;
}

export const getNextNodesAvailable = async (simulationId, nodeId) => {
  return (
    await baseClient.get(`/${simulationURI}/${simulationId}/${nodesURI}/${nodeId}/conditionalOptions`)
  ).data;
}

export const getSimulationById = async (simulationId) => {
  return (await baseClient.get(`/${simulationURI}/${simulationId}`)).data;
}
import baseClient from "./baseClient";

const nodeURI = 'node';
const nodesBySimulationId = "simulation"

export const create = async (new_node) => {
  return (await baseClient.post(
    nodeURI, 
    { "node":new_node }
  ))["data"];
}

export const getInitialNodesBySimulationId = async (simulationId) => {
  return (
    (
      await baseClient.get( `/${nodeURI}/${nodesBySimulationId}/${simulationId}` )
    )["data"]
  );
}
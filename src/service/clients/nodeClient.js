import baseClient from "./baseClient";

const nodeURI = 'node';

export const create = async (new_node) => {
  return (await baseClient.post(
    nodeURI, 
    { "node":new_node }
  ))["data"];
}

export const updateNextNode = async (currentNodeId, newNextNode, previousNodeId) => {
  return (
    (
      await baseClient.patch(
        `/${nodeURI}/nextNode`,
        {
          'currentNodeId': currentNodeId,
          'newNextNode': newNextNode,
          'previousNodeId': previousNodeId
        }
      )
    )["data"]
  );
}

export const deleteById = async (nodeId) => {
  return (
    await baseClient.delete(`/${nodeURI}/${nodeId}`)
  ).data;
}
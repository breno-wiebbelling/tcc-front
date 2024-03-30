import { idGenerator } from "../../../common/idManager";
import {
  nodeKeys,
  isNodeIdPresentOnNextNode,
  reprocessNextNodePosition,
  reprocessNodeColumns,
  updateNodesPositions,
  updateGhostPositions,
} from "../nodeManager";
import {
  create,
  updateNextNode,
  deleteById
} from "../../../../service/clients/nodeClient";

const processNewNode = async (previousNode, mainManager) => {

  let baseNode = await create({
    name: "Nova tarefa!",
    simulation_id: mainManager.simulation_id,
    type: nodeKeys.NEW_KEY,
    details: {
      nextNode: previousNode.details.nextNode
    }
  });

  return {
    ...baseNode,
    column: previousNode.column,
    line: mainManager.lineManagerInstance.process(previousNode.line),
    data: {
      label: baseNode.name,
      id: baseNode['_id'],
      simulationId: mainManager.simulation_id,
      click: mainManager.nodeManagerInstance.nodeClickEvents,
      details: baseNode.details,
      reload: mainManager.reload
    }
  }
}

export const addNodeBelow = async (fromNodeInformation, mainManager) => {
  let localNodes = []
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    localNodes = latestNodes;
    return latestNodes;
  })

  let currentNode = localNodes.find(node => node.id === fromNodeInformation.id);
  let newNodeBelow = await processNewNode(currentNode, mainManager)
  newNodeBelow.id = newNodeBelow._id;

  localNodes = await Promise.all(localNodes.map(async node => {
    if (node.id === fromNodeInformation.id) {
      node.details.nextNode = await updateNextNode(node.id, newNodeBelow.id);
      node.details.nextNode = newNodeBelow.id;
    }
    return node;
  }));

  localNodes = [...localNodes, newNodeBelow];
  localNodes = reprocessNextNodePosition(currentNode, localNodes, mainManager);

  mainManager.edgeManagerInstance.updateSource(currentNode.id, newNodeBelow.details.nextNode, newNodeBelow.id);
  mainManager.edgeManagerInstance.create(currentNode.id, newNodeBelow.id)
  mainManager.nodeManagerInstance.setNodes(localNodes);

  updateGhostPositions(mainManager)
  updateNodesPositions(mainManager)
  // mainManager.nodeManagerInstance.nodeClickEvents.editNode(newNode['data']);

  return localNodes;
}

export const addNodeAbove = async (fromNodeInformation, mainManager) => {
  let localNodes = [];
  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    localNodes = latestNodes;
    return latestNodes;
  });

  let currentNode = localNodes.find(node => node.id === fromNodeInformation.id);
  let newNode = await processNewNode({ ...currentNode, details: { nextNode: currentNode.id } }, mainManager)
  newNode.id = newNode._id;

  if (currentNode.type === nodeKeys.FINAL_KEY) {
    let baseLine = mainManager.lineManagerInstance.getBaseLine(currentNode.line);
    newNode.line = mainManager.lineManagerInstance.process(baseLine.baseLine);
  } else {
    let baseLine = mainManager.lineManagerInstance.getBaseLine(currentNode.line);
    newNode.line = mainManager.lineManagerInstance.process(baseLine.name);
    // currentNode.line = mainManager.lineManagerInstance.process(currentNode.line);
  } 

  localNodes.map(async node => {
    if (isNodeIdPresentOnNextNode(currentNode.id, node)) {
      if (node.type === nodeKeys.CONDITIONAL_KEY) {
        //TODO p1: add logic for conditional
        let indexOfNextNode = node.details.nextNode.indexOf(currentNode.id);
        node.details.nextNode[indexOfNextNode] = newNode.id;
        return node;
      }
      else {
        await updateNextNode(node.id, newNode.id);
        node.details.nextNode = newNode.id;
      }
    }

    return node;
  })

  localNodes = [...localNodes, newNode];
  localNodes = reprocessNextNodePosition(newNode, localNodes, mainManager);
  // mainManager.edgeManagerInstance.create(newNode.id, currentNode.id);

  mainManager.nodeManagerInstance.setNodes(localNodes);

  updateGhostPositions(mainManager)
  updateNodesPositions(mainManager)
  // mainManager.nodeManagerInstance.nodeClickEvents.editNode(newNode['data']);
}

export const addConditionalLeg = (fromNodeInformation, mainManager) => {

  mainManager.nodeManagerInstance.setNodes(latestNodes => {
    latestNodes = latestNodes.filter(node => !node.type.includes(nodeKeys.GHOST))
    latestNodes = latestNodes.filter(node => !node.type.includes(nodeKeys.CONDITIONAL_GHOST))

    let final_node = latestNodes.find(node => node.type === nodeKeys.FINAL_KEY);
    let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);
    let newNodeId = idGenerator();
    //TODO
    let newNode = { id: newNodeId, type: nodeKeys.NEW_KEY, data: { label: newNodeId, id: newNodeId, click: mainManager.nodeManagerInstancenodeClickEvents }, details: { nextNode: final_node.id }, line: mainManager.lineManagerInstance.process(currentNode.line) }

    currentNode.details.nextNode.push(newNode.id);
    latestNodes.push(newNode)
    mainManager.edgeManagerInstance.create(currentNode.id, newNode.id)
    latestNodes = reprocessNodeColumns(mainManager.initialNode, latestNodes);

    return latestNodes;
  })
}

export const deleteNode = async (nodeInformation, mainManager) => {
  let currentNodes;

  mainManager.nodeManagerInstance.setNodes((latestNodes) => {
    currentNodes = latestNodes;

    return latestNodes;
  });
  nodeInformation = currentNodes.filter(node => node.id === nodeInformation.id)[0];
  let parentNode = currentNodes.filter(node => isNodeIdPresentOnNextNode(nodeInformation.id, node))[0]

  await deleteById(nodeInformation.id);

  await updateNextNode(parentNode.id, nodeInformation.details.nextNode, nodeInformation.id);
  await mainManager.reload();
}

export const findNodeFrequencies = (given_nodes) => {
  let processedNodes = [];
  let nodeFrequencyRegistrator = [];

  let nodeWasNotProcessed = false;
  let nodeIsNotOnNodeFrequency = false;

  const verifyAndProcessNodeFrequency = (nodeId) => {
    nodeWasNotProcessed = !processedNodes.includes(nodeId)
    nodeIsNotOnNodeFrequency = !nodeFrequencyRegistrator.includes(nodeId);

    if (nodeWasNotProcessed) {
      processedNodes.push(nodeId);
      return;
    }

    if (nodeIsNotOnNodeFrequency) {
      nodeFrequencyRegistrator.push(nodeId);
      return;
    }
  }

  given_nodes.forEach(node => {

    if ([nodeKeys.CONDITIONAL_GHOST, nodeKeys.GHOST].includes(node.type)) { return }

    if (node.type === nodeKeys.CONDITIONAL_KEY) {
      node.details.nextNode.forEach(nextNodeId => { verifyAndProcessNodeFrequency(nextNodeId) });

      return;
    }

    verifyAndProcessNodeFrequency(node.details.nextNode)
  });

  return nodeFrequencyRegistrator;
}

export const updateAfterFinish = (mainManager) => {
  mainManager.nodeManagerInstance.setNodes(latestNodes => {

    latestNodes = latestNodes.map(node => {
      if (node.type === nodeKeys.NEW_KEY) {
        node.type = nodeKeys.TASK_KEY;
      }

      return node
    })

    return latestNodes;
  })

  updateNodesPositions(mainManager);

  return
}
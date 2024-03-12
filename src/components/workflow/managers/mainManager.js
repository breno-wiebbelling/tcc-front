import NodeManager from "./nodeManager"
import ColumnManager from "./columnManager"
import LineManager from "./lineManager";
import EdgeManager from "./edgeManager";
import { reloadNodesAndAddGhostNodes } from "./nodeManager";

export default (initialNode, initialNodes, nodeEventClicks, simulationId, searchInicialNodes) => {

  let mainManagerLibrary = {};

  mainManagerLibrary.simulation_id = simulationId;
  mainManagerLibrary.initialNode = initialNode;

  mainManagerLibrary.columnManagerInstance = ColumnManager() 
  mainManagerLibrary.edgeManagerInstance = EdgeManager()
  mainManagerLibrary.lineManagerInstance = LineManager()
  mainManagerLibrary.nodeManagerInstance = NodeManager(initialNodes, mainManagerLibrary, nodeEventClicks)

  mainManagerLibrary.loadNodes = async () => {
    await mainManagerLibrary.nodeManagerInstance.processNode(initialNode, mainManagerLibrary) 
    reloadNodesAndAddGhostNodes(mainManagerLibrary);
  }

  mainManagerLibrary.reload = async () => {
    let newInitialNodes = await searchInicialNodes()

    await mainManagerLibrary.columnManagerInstance.reset();
    await mainManagerLibrary.edgeManagerInstance.reset();
    await mainManagerLibrary.lineManagerInstance.reset();
    await mainManagerLibrary.nodeManagerInstance.reset(newInitialNodes, mainManagerLibrary);

  }

  return mainManagerLibrary;
}
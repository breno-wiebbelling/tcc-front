import NodeManager from "./nodeManager"
import ColumnManager from "./columnManager"
import LineManager from "./lineManager";
import EdgeManager from "./edgeManager";

export default (initialNode, initialNodes, nodeEventClicks) => {

  let mainManagerLibrary = {};

  mainManagerLibrary.initialNode = initialNode;
  mainManagerLibrary.columnManagerInstance = ColumnManager() 
  mainManagerLibrary.edgeManagerInstance = EdgeManager()
  mainManagerLibrary.lineManagerInstance = LineManager()
  mainManagerLibrary.nodeManagerInstance = NodeManager(initialNodes, mainManagerLibrary, nodeEventClicks)

  return mainManagerLibrary;
}
import ConditionalNode from '../../nodes/conditional/CustomConditionalNode'; 
import InputNode from '../../nodes/input/CustomInputNode'; 
import DefaultNode from '../../nodes/default/CustomDefaultNode'; 
import OutputNode from '../../nodes/output/CustomOutputNode';

const nodeKeys = {
  FINAL_KEY:"final",
  TASK_KEY:"task",
  START_KEY:"start",
  CONDITIONAL_KEY:"conditional"
}

export { nodeKeys };

export const nodeTypes = { 
  conditional:ConditionalNode, 
  start:InputNode, 
  task:DefaultNode,
  final:OutputNode, 
};

export const onNodeClick = (event, node) => alert(JSON.stringify(node));

export const reloadNodesPosition = (setNodes, columnManagerInstance) => {
  setNodes(latest => {
    return latest.map(node => {
      node.position.x = columnManagerInstance.getColumnPosition(node.column, columnManagerInstance.columns);
      return node;
    })
  })
}

import ConditionalNode from '../nodes/types/conditional/CustomConditionalNode'; 
import InputNode from '../nodes/types/input/CustomInputNode'; 
import DefaultNode from '../nodes/types/default/CustomDefaultNode'; 
import OutputNode from '../nodes/types/output/CustomOutputNode';
import GhostNode from '../nodes/types/ghost/CustomeGhostNode'

export const nodeKeys = {
  GHOST:"ghost",
  FINAL_KEY:"final",
  TASK_KEY:"task",
  START_KEY:"start",
  CONDITIONAL_KEY:"conditional",
  CONDITIONAL_GHOST:"conditional_ghost"
};

export const nodeTypes = { 
  conditional:ConditionalNode, 
  start:InputNode, 
  task:DefaultNode,
  final:OutputNode, 
  ghost:GhostNode,
  conditional_ghost:GhostNode
};

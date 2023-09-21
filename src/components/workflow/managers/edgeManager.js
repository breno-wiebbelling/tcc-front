import {MarkerType } from 'reactflow';

export default ( edges ) => {
  const edgesLibrary = {};

  edgesLibrary.create = (currentNodeId, parentNodeId) => {
    if(parentNodeId !== "0"){
      edges.push(
        {
          id: `e${currentNodeId}-${parentNodeId}`,
          type: "step",
          source: currentNodeId, target: parentNodeId,
          makerEnd: {type: MarkerType.Arrow}, animated:false,
          style: {
            strokeWidth: 2,
            stroke: '#00000052',
          }
        }
      )
    }
  }

  return edgesLibrary;
}
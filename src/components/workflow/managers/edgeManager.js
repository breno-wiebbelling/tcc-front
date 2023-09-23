import {MarkerType } from 'reactflow';
import {useState} from 'react';

export default () => {
  const edgesLibrary = {};
  const [edges, setEdges] = useState([]);

  edgesLibrary.edges = edges;
  edgesLibrary.setEdges = setEdges

  edgesLibrary.create = (currentNodeId, parentNodeId) => {
    if(parentNodeId !== "0"){
      edgesLibrary.edges.push(
        {
          id: `e${currentNodeId}-${parentNodeId}`,
          type: "straight",
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

  edgesLibrary.updateTarget = (source, old_target, new_target) => {
    edgesLibrary.setEdges(latest_edges => {
      return latest_edges.map(edge => {

        if(edge.source == source && edge.target == old_target){
          edge.target = new_target;
        }

        return edge;
      })
    });
  }

  return edgesLibrary;
}
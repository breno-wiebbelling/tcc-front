import {MarkerType, useEdgesState} from 'reactflow';

export default () => {
  const edgesLibrary = {};
  const [edges, setEdges] = useEdgesState([]);

  edgesLibrary.edges = edges;
  edgesLibrary.setEdges = setEdges

  edgesLibrary.create = (sourceNodeId, targetNodeId) => {
    //todo: remove this if
    if(targetNodeId !== "0"){
      setEdges(latestEdges => {
        return [...latestEdges, {
          id: `e${sourceNodeId}-${targetNodeId}`,
          type: "straight",
          source: sourceNodeId, target: targetNodeId,
          makerEnd: {type: MarkerType.Arrow}, animated:false,
          data: {
            label: 'edge label',
          },
          style: {
            strokeWidth: 2,
            stroke: '#00000052',
          }
        }]
      })
    }
  }

  edgesLibrary.remove = (sourceNodeId, targetNodeId) => {
    edgesLibrary.setEdges(latestEdges => {
      let currentEdge = latestEdges.findIndex(edge => edge.source === sourceNodeId && edge.target === targetNodeId);

      if( currentEdge ){ 
        latestEdges.splice(currentEdge, 1); 
      }

      return latestEdges;
    })
  }

  edgesLibrary.updateTarget = (source, target, new_target) => {
    edgesLibrary.setEdges(latestEdges => {
      return latestEdges.map(edge => {

        if(edge.source == source && edge.target == target){
          edge.target = new_target;
        }

        return edge;
      })
    });
  }

  edgesLibrary.updateSource = (source, target, new_source) => {
    edgesLibrary.setEdges(latestEdges => {

      return latestEdges.map(edge => {

        if(edge.source == source && edge.target == target){
          edge.source = new_source;
        }

        return edge;
      })

    });
  }

  edgesLibrary.reset = async () => {
    setEdges([]);
  }

  return edgesLibrary;
}
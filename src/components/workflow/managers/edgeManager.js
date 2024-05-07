import {MarkerType} from 'reactflow';
import { useEffect, useState } from 'react';
import CustomEdge from '../edge/CustomEdge';
import DefaultEdge from "../edge/DefaultEdge";

export default () => {
  const edgesLibrary = {};
  const [edges, setEdges] = useState([]);

  edgesLibrary.edgeTypes = { custom: CustomEdge, default: DefaultEdge };
  edgesLibrary.edges = edges;
  edgesLibrary.setEdges = setEdges

  useEffect(() => {
    if(edgesLibrary.edges.length === 1){
      if(typeof edgesLibrary.edges[0]['resolve'] == 'function'){
        edgesLibrary.edges[0]['resolve']();
        edgesLibrary.edges.splice(0);
      }
    }
  }, [edgesLibrary.edges])

  edgesLibrary.create = (sourceNodeId, targetNodeId) => {
    setEdges(latestEdges => {
      return [...latestEdges, {
        id: `e${sourceNodeId}-${targetNodeId}`,
        source: sourceNodeId, target: targetNodeId,
        makerEnd: {type: MarkerType.Arrow}, animated:false,
        style: {
          strokeWidth: 2,
          stroke: '#00000052',
        },
        type: "default"
      }]
    })
  }

  edgesLibrary.createWithLabel = (sourceNodeId, targetNodeId, label) => {
    edgesLibrary.create(sourceNodeId, targetNodeId);
    setEdges(latestEdges => {
      let edge = latestEdges.find(le => le.source === sourceNodeId && le.target === targetNodeId );
      edge.data = { "label": label };
      edge.type = 'custom';

      return latestEdges;
    })
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

      if(typeof latestEdges.find(edge => edge.source === source && edge.target === target) == "undefined"){
        edgesLibrary.create(source, new_target);
        return latestEdges;
      }

      return latestEdges.map(edge => {

        if(edge.source == source && edge.target === target){
          edge.target = new_target;
        }

        return edge;
      })
    });
  }

  edgesLibrary.updateSource = (source, target, new_source) => {
    edgesLibrary.setEdges(latestEdges => {

      return latestEdges.map(edge => {

        if(edge.source === source && edge.target === target){
          edge.source = new_source;
        }

        return edge;
      })

    });
  }

  edgesLibrary.reset = () => {
    return new Promise((resolve) => {
      edgesLibrary.setEdges([
        {
          id: `e`,
          source: 'sourceNodeId', target: 'targetNodeId',
          makerEnd: {type: MarkerType.Arrow}, animated:false,
          resolve: resolve,
          type: 'custom'
        }
      ]);
    })
  }

  return edgesLibrary;
}
import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import StyledSimulation from "./styled"
import { white } from "../common/style/index"

import ColumnManager from "./managers/columnManager";
import EdgesManager from "./managers/edgeManager";
import LineManager, { first_line_name, last_line_name } from "./managers/lineManager";
import { nodeKeys, nodeTypes, findNodeFrequencies } from './managers/nodeManager';
import { idGenerator } from "../common/idManager"

export default ({ initialNodes, initialNode, isInfoPanelOpen, nodeClickEvents }) => {

  const [nodes, setNodes] = useState([]);
  const edgesManagerInstance = EdgesManager();
  const columnManagerInstance = ColumnManager();
  const lineManagerInstance = LineManager();
  const [parentNode] = useState({ column: columnManagerInstance.central_column_name, line:first_line_name });

  const updateParentNode = ( newParentNode ) => {
    parentNode.column = newParentNode.column;
    parentNode.line = newParentNode.line;
  }

  const updateNodesPositions = () => {
    setNodes(latestNodes => {
      let anyGhostNode = latestNodes.find(node => node.type === nodeKeys.GHOST);

      return latestNodes.map(node => {
        node.position = {
          x : columnManagerInstance.getColumnPosition(node.column),
          y : lineManagerInstance.getLinePosition(node.line)
        }

        if(node.type === nodeKeys.START_KEY) { node.position.y -= 100 }
        if(node.type === nodeKeys.CONDITIONAL_KEY) { node.position.y -= 50 }
        if(node.type === nodeKeys.TASK_KEY) { node.position.y -= 50 }
        if(node.type === nodeKeys.FINAL_KEY && anyGhostNode ) { node.position.y -= 100 }

        return node
      }) 
    })
  }

  const updateGhostPositions = () => {
    setNodes(latestNodes => {
      let ghostNodes = latestNodes.filter(node => node.type === nodeKeys.GHOST );
      
      let correctGhost = ghostNodes[0];
      let correctGhostPosition = lineManagerInstance.getLinePosition(correctGhost.line);
      
      let new_ghostPosition;

      ghostNodes.forEach(new_ghost => {
        new_ghostPosition = lineManagerInstance.getLinePosition(new_ghost.line);

        if(new_ghostPosition > correctGhostPosition){
          correctGhost = new_ghost;
          correctGhostPosition = new_ghostPosition;
        }
      })

      ghostNodes.forEach(ghostNode => { ghostNode.line = correctGhost.line; })
      
      return latestNodes;
    })
  }

  const reloadNodesAndAddGhostNodes = () => {
    setNodes(latestNodes => {

      if(!latestNodes.find(node => node.type === nodeKeys.CONDITIONAL_KEY)) { return latestNodes }

      let conditionalNodes = latestNodes.filter(node => node.type === nodeKeys.CONDITIONAL_KEY)
      conditionalNodes.forEach(conditionalNode => {

        let ghostLine = lineManagerInstance.processConditionalGhostLine(conditionalNode.line);

        conditionalNode.details.nextNode.forEach(nextNodeId => {
          let nextNode = latestNodes.find(node => node.id === nextNodeId);
          let newConditionalGhost = {
            id: idGenerator(), 
            details: {"nextNode":nextNode.id},
            type: nodeKeys.CONDITIONAL_GHOST,
            column:nextNode.column, line:ghostLine,
          }
          latestNodes.push(newConditionalGhost);

          edgesManagerInstance.updateTarget(conditionalNode.id, nextNodeId, newConditionalGhost.id)
          edgesManagerInstance.create(newConditionalGhost.id, nextNodeId);
        })

      })

      let nodesWithSimilarity = findNodeFrequencies(latestNodes);
      nodesWithSimilarity.forEach(similarNodeId => {
        let similarNode = latestNodes.find(node => node.id === similarNodeId);
        //TODO: remove includes
        let nodesPoitingToSimilarNode = latestNodes.filter(node => node.details.nextNode.includes(similarNodeId))

        let ghostLine = lineManagerInstance.processGhostLine(similarNode.line);

        nodesPoitingToSimilarNode.forEach(nodePoitingToSimilar => {

          let newGhostNode  = {
            id: idGenerator(), details: {"nextNode":nodePoitingToSimilar.details.nextNode},
            type: nodeKeys.GHOST,
            column:nodePoitingToSimilar.column, line:ghostLine,
          }

          nodePoitingToSimilar.details.nextNode = newGhostNode.id;
          latestNodes.push(newGhostNode);

          edgesManagerInstance.updateTarget(nodePoitingToSimilar.id, similarNodeId, newGhostNode.id)
          edgesManagerInstance.create(newGhostNode.id, similarNodeId)
        })
      })

      return latestNodes;
    })

    updateNodesPositions()
  }  

  const reprocessNodeOnNextPosition = (currentNode, currentNodes) => {
    if(currentNode.type === nodeKeys.FINAL_KEY) { return currentNodes }

    let nextNode = currentNodes.find(node => (node.line === currentNode.line && node.column === currentNode.column && node.id != currentNode.id ));

    if(!nextNode && currentNode.type === nodeKeys.CONDITIONAL_KEY){
      let nextLine = lineManagerInstance.process(currentNode.line);
      
      let nextNode = currentNodes.find(node => (
        node.line === nextLine 
        && node.column === currentNode.column 
        && node.id != currentNode.id
        && node.type === nodeKeys.CONDITIONAL_GHOST 
      ));

      while(!nextNode){
        console.log("Searching node on next position.")
        nextLine = lineManagerInstance.process(nextLine);
        nextNode = currentNodes.find(node => (
          node.line === nextLine
          && node.column === currentNode.column 
          && node.id != currentNode.id
          && node.type === nodeKeys.CONDITIONAL_GHOST 
        ));
      }

      nextNode.line = nextLine;
      return nextNode;
    }

    nextNode.line = lineManagerInstance.process(currentNode.line);
    return nextNode;
 
    // return reprocessNodeOnNextPosition(nextNode, currentNodes);
  }

  const reprocessNextNode = (currentNode, currentNodes) => {
    let nextNode = currentNodes.find(node => node.id === currentNode.details.nextNode);
    console.clear()
    console.log(`Current node  ${currentNode}`)
    console.log(`Next node  ${nextNode}`)
    console.log(currentNodes)

    nextNode.line = lineManagerInstance.process(currentNode.line);
    if([nodeKeys.FINAL_KEY, nodeKeys.GHOST].includes(nextNode.type)) { return currentNodes };

    if(nextNode.type === nodeKeys.CONDITIONAL_KEY){
      nextNode.details.nextNode.forEach(nextNodeId => {
        let nextConditionalNode = currentNodes.find(node => node.id === nextNodeId);
        
        let ghostConditionalNode = reprocessNodeOnNextPosition(
          {...nextNode, column:nextConditionalNode.column },
          currentNodes
        )

        nextConditionalNode.line = lineManagerInstance.process(ghostConditionalNode.line);

        currentNodes = reprocessNextNode(nextConditionalNode, currentNodes);
      })
      
      return currentNodes
    }

    return reprocessNextNode(nextNode, currentNodes);
  }

  const addNodeBelow = (fromNodeInformation) => {
    setNodes(latestNodes => {
      let currentNode = latestNodes.find(node => node.id === fromNodeInformation.id);

      let newNodeId = idGenerator();
      let newNode = { 
        id: newNodeId,
        column: currentNode.column, line: lineManagerInstance.process(currentNode.line),
        details: { nextNode: currentNode.details.nextNode }, type: nodeKeys.TASK_KEY,
        data: { label: newNodeId, id:newNodeId, click: nodeClickEvents },
      }
      newNode.position = {
        x : columnManagerInstance.getColumnPosition(newNode.column),
        y : lineManagerInstance.getLinePosition(newNode.line)
      }
      
      latestNodes = latestNodes.map(node => {
        if(node.id === fromNodeInformation.id) { node.details.nextNode = newNode.id; }
        return node;
      })

      latestNodes = [...latestNodes, newNode]
      latestNodes = reprocessNextNode(currentNode, latestNodes)

      edgesManagerInstance.updateSource(currentNode.id, newNode.details.nextNode, newNode.id);
      edgesManagerInstance.create(currentNode.id, newNode.id)

      return latestNodes;
    });

    updateGhostPositions()
    updateNodesPositions()
  }

  nodeClickEvents.addNode = (mode, nodeInformation) => {}

  nodeClickEvents.deleteNode = (nodeInformation) => {

    setNodes(latestNodes => {
      let removedNodeIndex = latestNodes.findIndex(node => node.id === nodeInformation.id);
      let removedNode = latestNodes[removedNodeIndex];
      let previousNodes = latestNodes.filter(node => 
        (node.details.nextNode === (nodeInformation.id))
        ||(node.type === nodeKeys.CONDITIONAL_KEY && node.details.nextNode.includes(nodeInformation.id))
      );

      previousNodes.forEach(previousNode => {

        if(previousNode.type === nodeKeys.CONDITIONAL_KEY){
          let nextNodes = previousNode.details.nextNode;
          nextNodes[nextNodes.indexOf(removedNode.id)] = removedNode.details.nextNode;
        }
        else{
          previousNode.details.nextNode = removedNode.details.nextNode;
          latestNodes.splice(removedNodeIndex, 1);   
          //ERROR
          reprocessNextNode(previousNode, latestNodes);
          edgesManagerInstance.remove(previousNode.id, removedNode.id);
          edgesManagerInstance.updateSource(removedNode.id, removedNode.details.nextNode, previousNode.id)
        }
        
      })
        
      return latestNodes;
    })

    updateGhostPositions();
    setNodes(latestNodes => {
      lineManagerInstance.getLines().forEach(line => {
        if( !latestNodes.find(node => node.line === line.name) && line.name !== first_line_name ){
          lineManagerInstance.remove(line.name);
        }
      })

      return latestNodes;
    })
    updateNodesPositions();
  }
 
  const processNode = (currentNodeId) => {
    let currentNodeIndex = initialNodes.findIndex(node => node.id === currentNodeId);

    if( currentNodeIndex>=0 ){

      let currentNode = initialNodes[currentNodeIndex];
      switch (currentNode.type){

        case nodeKeys.START_KEY:
          currentNode.column = columnManagerInstance.central_column_name;
          currentNode.line = first_line_name;
        
        case nodeKeys.TASK_KEY:
          currentNode.column = parentNode.column;
          currentNode.line = lineManagerInstance.process(parentNode.line);

        case nodeKeys.START_KEY: case nodeKeys.TASK_KEY:
          edgesManagerInstance.create(currentNode.id, currentNode.details.nextNode);
          updateParentNode(currentNode);
          processNode(currentNode.details.nextNode);
          break;

        case nodeKeys.CONDITIONAL_KEY:
          let prev_parentNode = currentNode;
          currentNode.column = parentNode.column;
          currentNode.line = lineManagerInstance.process(parentNode.line);

          currentNode.details.nextNode.forEach((conditionalLegId, index) => {
            let columnNameForFollowingChild = columnManagerInstance.create( index, currentNode.details.nextNode.length, currentNode.column );
            // let newConditionalGhost = {
            //   id: idGenerator(),
            //   type: nodeKeys.CONDITIONAL_GHOST,
            //   details: { nextNode:conditionalLegId },
            //   line: lineManagerInstance.process(currentNode.line),
            //   column: columnNameForFollowingChild
            // }

            // setNodes(latestNodes => { return [...latestNodes, newConditionalGhost] })
            updateParentNode({ column: columnNameForFollowingChild, line: currentNode.line });
            
            // edgesManagerInstance.create( prev_parentNode.id, newConditionalGhost.id );
            // edgesManagerInstance.create( newConditionalGhost.id, conditionalLegId );

            edgesManagerInstance.create( prev_parentNode.id, conditionalLegId );
            processNode(conditionalLegId);
          })
          
          updateParentNode(prev_parentNode)
          break;

        case nodeKeys.FINAL_KEY:
          currentNode.column = columnManagerInstance.central_column_name;
          currentNode.line = last_line_name;
          break;
      }

      currentNode.data.id = currentNode.id
      currentNode.data.click = nodeClickEvents;
      
      setNodes((latest) => { return [...latest, currentNode] })
      initialNodes.splice(currentNodeIndex, 1);
    }
  } 

  useEffect(() => { 
    processNode(initialNode) 
    reloadNodesAndAddGhostNodes();
  }, []);

  return (
    <StyledSimulation style={{ width:(!isInfoPanelOpen) ? '100vw':'70vw' }}>
      <ReactFlow
        nodes={ nodes }
        edges={ edgesManagerInstance.edges }
        nodeTypes={nodeTypes}
        style={{ borderRadius:"10px"  }}
      >
        <Controls/>
        <Background style={{ "backgroundColor": white}} color="#ffffff" />
      </ReactFlow>
    </StyledSimulation>
  );
};

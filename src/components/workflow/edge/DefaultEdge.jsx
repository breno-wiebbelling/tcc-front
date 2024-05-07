import React from 'react';
import { getBezierPath, BaseEdge } from 'reactflow';
import { denseSmoke } from "../../common/style/index";
export default ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: denseSmoke }} />
    </>
  );
};

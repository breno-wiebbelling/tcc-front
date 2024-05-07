import React, { FC } from 'react';
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';
import {denseSmoke} from "../../common/style";

export default ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Calculate the length of the edge
  const edgeLength = Math.sqrt(Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2));
  const isEdgeTooLong = edgeLength > 600;

  const maxDistance = 120; // Maximum distance from the start of the edge
  const ratio = Math.min(maxDistance / edgeLength, 1); // Calculate the ratio between maxDistance and edgeLength
  const adjustedLabelX = isEdgeTooLong ? sourceX + (targetX - sourceX) * ratio : labelX;
  const adjustedLabelY = isEdgeTooLong ? sourceY + (targetY - sourceY) * ratio : labelY;

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: denseSmoke }} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${adjustedLabelX}px,${adjustedLabelY}px)`,
            background: '#ffffff',
            padding: "5px 8px",
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

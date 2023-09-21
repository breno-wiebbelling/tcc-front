let action = "none";
let startPanMousePosition = { x: 0, y: 0 };

export const getMouseCoordinates = (event, panOffset, scale, scaleOffset ) => {
  const clientX = (event.clientX - panOffset.x * scale + scaleOffset.x) / scale;
  const clientY = (event.clientY - panOffset.y * scale + scaleOffset.y) / scale; 
  return { clientX, clientY };
};

export const handleMouseDown = (event, scale, scaleOffset, panOffset) => {
  const { clientX, clientY } = getMouseCoordinates(event, panOffset, scale, scaleOffset);

  action = ("panning");
  startPanMousePosition = ({ x: clientX, y: clientY });

  return;
};

export const handleMouseMove = (event, scale, scaleOffset, setPanOffset, panOffset) => {
  if (action === "panning") {
    const { clientX, clientY } = getMouseCoordinates(event, panOffset, scale, scaleOffset);

    const deltaX = clientX - startPanMousePosition.x;
    const deltaY = clientY - startPanMousePosition.y;

    setPanOffset((prevPanOffSet) => {

      return { x: prevPanOffSet.x + deltaX, y: prevPanOffSet.y + deltaY };
    });

    return;
  }
};

export const handleMouseUp = () => action = ("none");
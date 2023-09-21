import {useEffect, useRef, useState} from 'react';
import CanvasStyled from './canvas'

import {getMouseCoordinates, handleMouseDown, handleMouseMove, handleMouseUp} from "./mouseEvents"
import { isElement } from 'lodash';

const Canvas = ({screenWidth, nodes}) => {
  const canvasRef = useRef();

  const [scale, setScale] = useState(1);
  const [scaleOffset, setScaleOffset] = useState({x: 0, y:0});
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const addFulfillment = (context) => {

    nodes.forEach(node => {
      // context.fillRect(node.position.y, node.position.x, 100, 100);
      context.clearRect(0, 0, 100, 100); // Clear canvas before drawing
      context.beginPath();
      context.arc(node.position.x, node.position.y, 50 , 0, 2 * Math.PI); // Drawing the circle
      context.fillStyle = 'blue'; // Fill color
      context.fill(); // 

      context.font = '20px Arial'; // Set the font size and font family
      context.fillStyle = 'white'; // Text color
      context.fillText(node.id, node.position.x - 20, node.position.y + 5); // Adjust the position of the text based on the circle position

    })
  }

  const processCanvas = () => {
    let canvas = canvasRef.current;

    const context = canvas.getContext('2d');
    const scaledWidth = canvas.width * scale;
    const scaledHeight = canvas.height * scale;
    const scaleOffsetX = (scaledWidth - canvas.width) / 2;
    const scaleOffsetY = (scaledHeight - canvas.height) / 2;
    setScaleOffset({ x:scaleOffsetX, y:scaleOffsetY });

    context.clearRect(0,0,canvas.width, canvas.height)
    context.save();
    context.translate(panOffset.x * scale - scaleOffsetX, panOffset.y * scale - scaleOffsetY )
    context.scale(scale, scale);
    addFulfillment(context)

    context.restore()
  }

  useEffect(() => {
    const handleCanvasClick = (event) => {
      const mousePosition = getMouseCoordinates(event, panOffset, scale, scaleOffset);
      console.log("aqui")
      console.log(mousePosition.clientX)

      nodes.forEach(node => {
        if(node.id == 1){

          console.log((node.position.x - panOffset.x * scale + scaleOffset.x) / scale)
        }
      })
    };

    canvasRef.current.addEventListener('click', handleCanvasClick);

    return () => {
      canvasRef.current.removeEventListener('click', handleCanvasClick);
    };

  }, [nodes])

  useEffect(() => {
    const onZoom = (delta) => {
      setScale((prevScale) => Math.min(Math.max(prevScale + delta, 0.1), 20));
    } 
    const handleMouseWheel = (event) => {
      event.preventDefault();
      onZoom(event.deltaY * -0.001);
    };

    canvasRef.current.addEventListener('wheel', handleMouseWheel);

    return () => {
      canvasRef.current.removeEventListener('wheel', handleMouseWheel);
    };
  }, [])

  useEffect(() => {
    canvasRef.current.width = canvasRef.current.parentElement.clientWidth;

    processCanvas();

  },[screenWidth])

  useEffect(() => {
    let canvas = canvasRef.current;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    processCanvas()

  }, [panOffset, scale, nodes]);

  return <CanvasStyled>
    <canvas 
      ref={canvasRef} 
      className='canvas_flow' 
      onMouseDown={ (event) => { handleMouseDown(event, scale, scaleOffset, panOffset) } }
      onMouseMove={ (event) => { handleMouseMove(event, scale, scaleOffset, setPanOffset, panOffset) } }
      onMouseUp={handleMouseUp}
    />
    {/* <div className='buttons'>
      <button onClick={() => onZoom(-0.1)}>+</button>
      <span 
        onClick={() => {
          setScale(1)
        }} 
        style={{margin:'50px'}} 
      >
        {new Intl.NumberFormat("eg-GB", {style:"percent"}).format(scale)}
      </span>
      <button onClick={() => onZoom(+0.1)}>-</button>
    </div> */}
    
    {/* <span> {screenWidth} </span>
    <span> {"screenWidth"} </span> */}
    

  </CanvasStyled>

}

export default Canvas;
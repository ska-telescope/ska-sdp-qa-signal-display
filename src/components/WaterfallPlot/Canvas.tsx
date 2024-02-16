import React, { useEffect, useRef } from 'react'

interface CanvasProps {
    data: Uint8ClampedArray,
    height: number,
    width: number
  }

const Canvas = ({data, height, width}: CanvasProps) => {4

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        var pictureData = context.createImageData(width, height);
        pictureData.data.set(data);
        context.putImageData(pictureData, 0, 0);
    }, [data]);

  return <canvas ref={canvasRef}/>
}

export default Canvas
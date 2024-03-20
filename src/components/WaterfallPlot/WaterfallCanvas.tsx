import React, { useEffect, useRef } from 'react';

interface WaterfallCanvasProps {
  data: Uint8ClampedArray;
  height: number;
  width: number;
}

const WaterfallCanvas = ({ data, height, width }: WaterfallCanvasProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    const pictureData = context.createImageData(width, height);
    pictureData.data.set(data);
    context.putImageData(pictureData, 0, 0);
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default WaterfallCanvas;

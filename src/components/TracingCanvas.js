import React, { useRef, useState, useEffect } from "react";
import "./TracingCanvas.css";

function TracingCanvas({ letter }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Light gray letter as guide
    ctx.font = "bold 200px Arial";
    ctx.fillStyle = "rgba(200,200,200,0.3)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, canvasRef.current.width / 2, canvasRef.current.height / 2);
  }, [letter]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#00cc66"; // Green stroke

    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <canvas
      ref={canvasRef}
      width={350}
      height={350}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      className="tracing-canvas"
    />
  );
}

export default TracingCanvas;

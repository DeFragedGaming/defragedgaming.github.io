import React, { useRef, useEffect, useState } from "react";

export default function Canvas({ engine, onSelectDevice }) {
  const canvasRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);

  // Prevent crash if engine isn't ready yet
  if (!engine || !engine.state) {
    return (
      <canvas
        ref={canvasRef}
        width={900}
        height={700}
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
        }}
      />
    );
  }

  // Redraw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const devices = engine.state.getAllDevices();

      devices.forEach((device) => {
        ctx.beginPath();
        ctx.arc(device.x, device.y, 25, 0, Math.PI * 2);
        ctx.fillStyle = "#4CAF50";
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(device.name, device.x, device.y + 40);
      });
    };

    let frame;
    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(frame);
  }, [engine]);

  // Correct coordinate scaling
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const findDeviceAt = (x, y) => {
    const devices = engine.state.getAllDevices();
    return devices.find((d) => {
      const dx = x - d.x;
      const dy = y - d.y;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });
  };

  const handleMouseDown = (e) => {
    const { x, y } = getMousePos(e);
    const device = findDeviceAt(x, y);

    if (device) {
      setDraggingId(device.id);
      onSelectDevice(device);
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingId) return;

    const { x, y } = getMousePos(e);

    // Update through engine manager
    engine.deviceManager.moveDevice(draggingId, x, y);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={700}
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        cursor: draggingId ? "grabbing" : "pointer",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
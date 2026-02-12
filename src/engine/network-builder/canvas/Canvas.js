import React, { useRef, useEffect, useState } from "react";

export default function Canvas({ engine, onSelectDevice }) {
  const canvasRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [connectMode, setConnectMode] = useState(false);
  const [pendingConnection, setPendingConnection] = useState(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawDevice = (device) => {
      if (device.type === "router") {
        // Router: square
        ctx.fillStyle = "#3A8FFF";
        ctx.fillRect(device.x - 25, device.y - 25, 50, 50);

        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(device.name, device.x, device.y + 40);
      } else {
        // PC: circle
        ctx.beginPath();
        ctx.arc(device.x, device.y, 25, 0, Math.PI * 2);
        ctx.fillStyle = "#4CAF50";
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(device.name, device.x, device.y + 40);
      }

      if (pendingConnection === device.id) {
        ctx.beginPath();
        ctx.arc(device.x, device.y, 30, 0, Math.PI * 2);
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const devices = engine.state.getAllDevices();
      const connections = engine.state.getConnections();

      // Draw connections
      connections.forEach((c) => {
        const from = engine.state.getDevice(c.from);
        const to = engine.state.getDevice(c.to);
        if (!from || !to) return;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      // Draw devices
      devices.forEach(drawDevice);

      if (connectMode) {
        ctx.fillStyle = "#fff";
        ctx.font = "16px Arial";
        ctx.textAlign = "left";
        ctx.fillText(
          pendingConnection
            ? "Click another device to complete connection"
            : "Click a device to start connection",
          10,
          20
        );
      }
    };

    let frame;
    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(frame);
  }, [engine, connectMode, pendingConnection]);

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
      return Math.sqrt(dx * dx + dy * dy) < 30;
    });
  };

  const handleMouseDown = (e) => {
    const { x, y } = getMousePos(e);
    const device = findDeviceAt(x, y);

    if (!device) return;

    if (connectMode) {
      if (!pendingConnection) {
        setPendingConnection(device.id);
      } else {
        engine.deviceManager.createConnection(pendingConnection, device.id);
        setPendingConnection(null);
        setConnectMode(false);
      }
      return;
    }

    setDraggingId(device.id);
    onSelectDevice(device);
  };

  const handleMouseMove = (e) => {
    if (!draggingId) return;

    const { x, y } = getMousePos(e);
    engine.deviceManager.moveDevice(draggingId, x, y);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  useEffect(() => {
    const handler = (event) => {
      if (event.detail === "toggle-connect-mode") {
        setConnectMode((prev) => !prev);
        setPendingConnection(null);
      }
    };

    window.addEventListener("cybertrace-canvas-mode", handler);
    return () => window.removeEventListener("cybertrace-canvas-mode", handler);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={700}
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        cursor: connectMode
          ? "crosshair"
          : draggingId
          ? "grabbing"
          : "pointer",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
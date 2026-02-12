import React from "react";
import DeviceConfigPanel from "./DeviceConfigPanel";

export default function PanelWrapper({ device, engine }) {
  return (
    <div>
      <DeviceConfigPanel device={device} engine={engine} />
    </div>
  );
}
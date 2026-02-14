import React from "react";
import OriginalSidebar from "@theme-original/DocSidebar";

export default function DocSidebar(props) {
  return (
    <div className="space-y-2 text-slate-300">
      <OriginalSidebar {...props} />
    </div>
  );
}
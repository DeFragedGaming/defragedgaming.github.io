import React from "react";
import DocItem from "@theme/DocItem";
import CTSidebar from "../../components/CTSidebar";

export default function CustomDocPage(props) {
  const { sidebar } = props;

  return (
    <div className="flex w-full min-h-screen bg-slate-950 text-slate-100">

      {/* Sidebar */}
      {sidebar && (
        <aside
          className="w-64 border-r border-slate-800 bg-slate-900/40 backdrop-blur p-6"
          style={{
            height: "100vh",
            overflowY: "auto",
            position: "sticky",
            top: 0
          }}
        >
          <CTSidebar sidebar={sidebar} />
        </aside>
      )}

      {/* Content */}
      <main className="flex-1 flex justify-center">
        <div className="prose prose-invert max-w-3xl w-full px-8 py-16">
          <DocItem {...props} />
        </div>
      </main>
    </div>
  );
}
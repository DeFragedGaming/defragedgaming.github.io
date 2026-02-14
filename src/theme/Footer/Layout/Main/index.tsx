import React from "react";
import Main from "@theme-original/Layout/Main";

export default function CustomMain(props) {
  return (
    <Main
      {...props}
      className="!bg-slate-950 !m-0 !p-0"
    />
  );
}
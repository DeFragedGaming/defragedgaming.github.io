import React from "react";
import Link from "@docusaurus/Link";
import {useColorMode} from "@docusaurus/theme-common";

export default function Navbar() {
  const {colorMode, setColorMode} = useColorMode();

  return (
    <nav className="w-full bg-slate-950/90 backdrop-blur border-b border-slate-800 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left side: Logo + Title */}
        <div className="flex items-center space-x-3">
          <img
            src="/img/logo48x48.png"
            alt="CyberTrace Logo"
            className="h-8 w-8"
          />
          <Link
            to="/"
            className="text-cyan-300 font-semibold text-xl hover:text-cyan-200 transition"
          >
            CyberTrace
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/docs/intro" className="text-slate-300 hover:text-cyan-300 transition">
            Docs
          </Link>
          <Link to="/blog" className="text-slate-300 hover:text-cyan-300 transition">
            Blog
          </Link>
          <Link to="/tools" className="text-slate-300 hover:text-cyan-300 transition">
            Tools
          </Link>
        </div>

        {/* Right side: GitHub + Theme Toggle */}
        <div className="flex items-center space-x-6">

          {/* GitHub */}
          <a
            href="https://github.com/defragedgaming/cybertrace.github.io"
            target="_blank"
            className="text-slate-300 hover:text-cyan-300 transition"
          >
            GitHub
          </a>

          {/* Theme Toggle */}
          <button
            onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
            className="text-slate-300 hover:text-cyan-300 transition"
          >
            {colorMode === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
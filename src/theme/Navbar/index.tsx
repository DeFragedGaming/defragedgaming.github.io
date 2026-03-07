import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";

export default function Navbar() {
  const { colorMode, setColorMode } = useColorMode();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Docs", to: "/docs/intro" },
    { label: "Blog", to: "/blog" },
    { label: "Tools", to: "/tools" },
    { label: "Writeups", to: "/writeups" },
    { label: "Projects", to: "/projects" },
    { label: "Labs", to: "/labs" },
    { label: "Notes", to: "/notes" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="w-full bg-slate-950/90 backdrop-blur border-b border-slate-800 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left: Logo + Title */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`transition ${
                isActive(item.to)
                  ? "text-cyan-300 font-semibold"
                  : "text-slate-300 hover:text-cyan-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: GitHub + Theme Toggle */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="https://github.com/defragedgaming/cybertrace.github.io"
            target="_blank"
            className="text-slate-300 hover:text-cyan-300 transition"
          >
            GitHub
          </a>

          <button
            onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
            className="text-slate-300 hover:text-cyan-300 transition"
          >
            {colorMode === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-cyan-300 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900/95 border-t border-slate-800 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block text-lg transition ${
                isActive(item.to)
                  ? "text-cyan-300 font-semibold"
                  : "text-slate-300 hover:text-cyan-300"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://github.com/defragedgaming/cybertrace.github.io"
            target="_blank"
            className="block text-lg text-slate-300 hover:text-cyan-300 transition"
          >
            GitHub
          </a>

          <button
            onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
            className="block text-left text-lg text-slate-300 hover:text-cyan-300 transition"
          >
            {colorMode === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
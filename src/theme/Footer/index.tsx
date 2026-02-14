import React from "react";
import Link from "@docusaurus/Link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Column 1 */}
        <div>
          <h3 className="text-cyan-300 font-semibold text-lg mb-3">
            CyberTrace
            </h3>

          <p className="text-slate-400 text-sm leading-relaxed">
            A personal cybersecurity portfolio and tool suite built for
            engineers, analysts, and curious minds exploring the world of
            security engineering.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-slate-200 font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><Link to="/tools" className="hover:text-cyan-300">Tools</Link></li>
            <li><Link to="/docs/intro" className="hover:text-cyan-300">Docs</Link></li>
            <li><Link to="/blog" className="hover:text-cyan-300">Blog</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-slate-200 font-semibold mb-3">Community</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>
              <a href="https://github.com/defragedgaming" className="hover:text-cyan-300" target="_blank">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://discord.com" className="hover:text-cyan-300" target="_blank">
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com" className="hover:text-cyan-300" target="_blank">
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="text-center text-slate-600 text-xs mt-10">
        © {new Date().getFullYear()} CyberTrace — All Rights Reserved
      </div>
    </footer>
  );
}
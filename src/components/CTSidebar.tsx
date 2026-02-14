import React from "react";

export default function CTSidebar({ sidebar }) {
  return (
    <nav className="space-y-4">
      {sidebar.map((item, i) => (
        <div key={i}>
          <h3 className="text-sky-400 font-semibold mb-2">{item.label}</h3>
          <ul className="space-y-1">
            {item.items?.map((child, j) => (
              <li key={j}>
                <a
                  href={child.href}
                  className="block text-slate-300 hover:text-sky-300 hover:pl-2 transition-all"
                >
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
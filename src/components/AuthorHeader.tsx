import React from "react";
import "./author-header.css";

export default function AuthorHeader() {
  return (
    <div className="author-header">
      <img
        src="/img/logo48x48.png"
        alt="Matthew Hammel"
        className="author-header-avatar"
      />

      <div className="author-header-text">
        <h2 className="author-header-name">Matthew Hammel</h2>
        <p className="author-header-title">
          Cybersecurity Engineer & Creator of CyberTrace
        </p>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";

function NoteHeader() {
  return (
    <nav className="note-app__header">
      <Link to="/">
        <h1>Notes App</h1>
      </Link>
      <Link to="/add" className="note-app__floating-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          width="28"
          height="28"
        >
          <rect width="28" height="28" fill="none" />
          <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,28,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM192,108.68,147.31,64l24-24L216,84.68Z" />
        </svg>
      </Link>
      <Link to="/archive">Arsip</Link>
    </nav>
  );
}

export default NoteHeader;

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContext";
import { ThemeConsumer } from "../contexts/ThemeContext";

function NoteHeader({ logout }) {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <ThemeConsumer>
            {({ theme, toggleTheme }) => {
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
                  <div className="header-actions">
                    <button
                      className="note-item__not-found-button"
                      onClick={toggleLocale}
                    >
                      {locale === "id" ? "🌐 EN" : "🌐 ID"}
                    </button>
                    <button
                      className="note-item__not-found-button"
                      onClick={toggleTheme}
                    >
                      {theme === "dark" ? "🌞" : "🌙"}
                    </button>
                    <button
                      className="note-item__not-found-button"
                      onClick={logout}
                    >
                      {locale === "id" ? "Keluar" : "Logout"}
                    </button>
                  </div>
                </nav>
              );
            }}
          </ThemeConsumer>
        );
      }}
    </LocaleConsumer>
  );
}

NoteHeader.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default NoteHeader;

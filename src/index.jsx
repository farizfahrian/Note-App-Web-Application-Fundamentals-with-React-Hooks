import React from "react";
import { createRoot } from "react-dom/client";
// import style
import "./styles/style.css";
import NoteApp from "./components/NoteApp";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

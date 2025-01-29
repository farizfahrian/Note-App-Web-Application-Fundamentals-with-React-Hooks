import React from "react";
import NoteApp from "./components/NoteApp";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NoteApp />
    </BrowserRouter>
  );
}

export default App;

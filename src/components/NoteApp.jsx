import React from "react";
import NoteHeader from "./NoteHeader";
import AddPage from "../page/AddPage";
import HomePage from "../page/HomePage";
import NotFound from "./NotFound";
import DetailPage from "../page/DetailPage";
import ArchivePage from "../page/ArchivePage";
import { Route, Routes } from "react-router-dom";
import {
  archiveNote,
  getAllNotes,
  getNote,
  unarchiveNote,
} from "../utils/local-data";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
      searchQuery: "",
    };

    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onArchiveHandler = (id) => {
    const note = getNote(id);
    console.log("Before toggle:", note.archived); // Debug log
    note.archived ? unarchiveNote(id) : archiveNote(id);
    const updatedNotes = getAllNotes();
    console.log("After toggle:", updatedNotes); // Check if updated
    this.setState({ notes: updatedNotes });
  };

  onDeleteHandler = (id) => {
    deleteNote(id);

    this.setState(() => {
      return {
        notes: getAllNotes(),
      };
    });
  };

  onSearchHandler(searchQuery) {
    this.setState({ searchQuery });
  }

  render() {
    return (
      <div>
        <NoteHeader onSearch={this.onSearchHandler} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/note/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default NoteApp;

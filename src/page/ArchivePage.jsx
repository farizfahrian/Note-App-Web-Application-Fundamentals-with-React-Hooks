import React, { Component } from "react";
import {
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  getArchivedNotes,
} from "../utils/local-data";
import NoteList from "../components/NoteList";
import NoteSearchInput from "../components/NoteSearchInput";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("title") || "";

  const handleSearch = (keyword) => {
    setSearchParams({ title: keyword });
  };

  return <ArchivePage searchKeyword={title} onSearch={handleSearch} />;
}

export class ArchivePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
    };
  }

  onArchiveHandler = (id) => {
    const note = getNote(id);
    note.archived ? unarchiveNote(id) : archiveNote(id);

    this.setState(() => {
      return {
        notes: getArchivedNotes(),
      };
    });
  };

  onDeleteHandler = (id) => {
    deleteNote(id);

    this.setState(() => {
      return {
        notes: getArchivedNotes(),
      };
    });
  };

  render() {
    const { searchKeyword } = this.props;
    const filteredNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
      <section>
        <NoteSearchInput
          onSearch={this.props.onSearch}
          defaultKeyword={searchKeyword}
        />
        <NoteList
          title="Catatan Arsip"
          notes={filteredNotes}
          onArchive={this.onArchiveHandler}
          onDelete={this.onDeleteHandler}
        />
      </section>
    );
  }
}

ArchivePage.propTypes = {
  searchKeyword: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;

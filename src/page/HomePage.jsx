import React, { Component } from "react";
import {
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  getActiveNotes,
} from "../utils/local-data";
import NoteList from "../components/NoteList";
import NoteSearchInput from "../components/NoteSearchInput";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("title") || "";

  const handleSearch = (keyword) => {
    setSearchParams({ title: keyword });
  };

  return <HomePage searchKeyword={title} onSearch={handleSearch} />;
}

export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
    };
  }

  onArchiveHandler = (id) => {
    const note = getNote(id);
    note.archived ? unarchiveNote(id) : archiveNote(id);

    this.setState(() => {
      return {
        notes: getActiveNotes(),
      };
    });
  };

  onDeleteHandler = (id) => {
    deleteNote(id);

    this.setState(() => {
      return {
        notes: getActiveNotes(),
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
          title="Daftar Catatan"
          notes={filteredNotes}
          onArchive={this.onArchiveHandler}
          onDelete={this.onDeleteHandler}
        />
      </section>
    );
  }
}

HomePage.propTypes = {
  searchKeyword: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default HomePageWrapper;

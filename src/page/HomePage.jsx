import React, { useEffect, useState } from "react";
import { archiveNote, deleteNote, getActiveNotes } from "../utils/network";
import NoteList from "../components/NoteList";
import NoteSearchInput from "../components/NoteSearchInput";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(() => {
    return searchParams.get("title") || "";
  });
  const [initializing, setInitializing] = useState(true);
  const { locale } = React.useContext(LocaleContext);

  useEffect(() => {
    getActiveNotes()
      .then(({ data }) => {
        setNotes(data);
      })
      .catch(() => {
        setNotes(null);
      })
      .finally(() => {
        setInitializing(false);
      });
  }, []);

  const archiveHandler = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const deleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const handleSearch = (keyword) => {
    setSearchParams({ title: keyword });
    setSearchKeyword(keyword);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (initializing) {
    return (
      <div className="auth-loading">
        <div className="auth-loading__spinner"></div>
        <p>Loading ...</p>
      </div>
    );
  }
  return (
    <section>
      <NoteSearchInput onSearch={handleSearch} defaultKeyword={searchKeyword} />
      <NoteList
        title={locale === "id" ? "Daftar Catatan" : "Note List"}
        notes={filteredNotes}
        onArchive={archiveHandler}
        onDelete={deleteHandler}
      />
    </section>
  );
}

HomePage.propTypes = {
  searchKeyword: PropTypes.string,
};

export default HomePage;

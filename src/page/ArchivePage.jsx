import React, { useContext, useEffect, useState } from "react";
import { unarchiveNote, deleteNote, getArchivedNotes } from "../utils/network";
import NoteList from "../components/NoteList";
import NoteSearchInput from "../components/NoteSearchInput";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(() => {
    return searchParams.get("title") || "";
  });
  const [initializing, setInitializing] = useState(true);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getArchivedNotes()
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
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const deleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
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
        title={locale === "id" ? "Catatan Arsip" : "Archive Notes"}
        notes={filteredNotes}
        onArchive={archiveHandler}
        onDelete={deleteHandler}
      />
    </section>
  );
}

ArchivePage.propTypes = {
  searchKeyword: PropTypes.string,
};

export default ArchivePage;

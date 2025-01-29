import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteList({ notes, onArchive, onDelete, title }) {
  return (
    <>
      <div className="notes-list__container">
        <h2 className="notes-list__header">{title}</h2>
        {notes.length !== 0 ? (
          <div className="notes-list">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                id={note.id}
                onArchive={onArchive}
                onDelete={onDelete}
                note={note}
                {...note}
              />
            ))}
          </div>
        ) : (
          <p className="notes-list__empty-message">Tidak ada catatan</p>
        )}
      </div>
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default NoteList;

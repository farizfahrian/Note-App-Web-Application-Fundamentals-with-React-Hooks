import PropTypes from "prop-types";
import React from "react";

function ArchiveButton({ id, onArchive, note }) {
  return (
    <button className="note-item__archive-button" onClick={() => onArchive(id)}>
      {note.archived ? "Batal Arsip" : "Arsip"}
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};

export default ArchiveButton;

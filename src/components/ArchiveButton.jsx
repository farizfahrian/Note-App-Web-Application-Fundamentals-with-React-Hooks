import PropTypes from "prop-types";
import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

function ArchiveButton({ id, onArchive, note }) {
  const { locale } = useContext(LocaleContext);
  return (
    <button className="note-item__archive-button" onClick={() => onArchive(id)}>
      {locale === "id"
        ? note.archived
          ? "Batal Arsip"
          : "Arsip"
        : note.archived
        ? "Unarchive"
        : "Archive"}
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};

export default ArchiveButton;

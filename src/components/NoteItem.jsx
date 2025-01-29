import React from "react";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";
import { capitalizeFirstLetter, showFormattedDate } from "../utils";
import PropTypes from "prop-types";
import HTMLReactParser from "html-react-parser/lib/index";
import { Link } from "react-router-dom";

function NoteItem({ title, createdAt, body, id, onArchive, onDelete, note }) {
  return (
    <div className="note-item">
      <div>
        <Link to={`/note/${id}`}>
          <h2 className="note-item__title">{capitalizeFirstLetter(title)}</h2>
        </Link>
        <p className="note-item__date">{showFormattedDate(createdAt)}</p>
        <div className="note-item__body">
          {HTMLReactParser(
            body.split(" ").slice(0, 16).join(" ") +
              (body.split(" ").length > 16 ? "..." : "")
          )}
        </div>
      </div>
      <div className="note-item__action">
        <ArchiveButton id={id} onArchive={onArchive} note={note} />
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};

export default NoteItem;

import React from "react";
import { capitalizeFirstLetter, showFormattedDate } from "../utils";
import PropTypes from "prop-types";
import HTMLReactParser from "html-react-parser/lib/index";

function NoteDetail({ title, createdAt, body }) {
  return (
    <div className="note-detail-item">
      <div>
        <h2 className="note-detail-item__title">
          {capitalizeFirstLetter(title)}
        </h2>
        <p className="note-detail-item__date">{showFormattedDate(createdAt)}</p>
        <div className="note-item__body">{HTMLReactParser(body)}</div>
      </div>
    </div>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteDetail;

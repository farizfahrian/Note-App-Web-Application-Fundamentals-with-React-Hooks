import PropTypes from "prop-types";
import React from "react";

function NoteSearchInput({ onSearch, defaultKeyword }) {
  return (
    <input
      type="search"
      onChange={(event) => onSearch(event.target.value)}
      placeholder="Cari judul catatan"
      className="note-search-input"
      defaultValue={defaultKeyword}
    />
  );
}

NoteSearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string,
};

export default NoteSearchInput;

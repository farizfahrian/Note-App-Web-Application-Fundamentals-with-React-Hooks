import PropTypes from "prop-types";
import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

function NoteSearchInput({ onSearch, defaultKeyword }) {
  const { locale } = useContext(LocaleContext);
  return (
    <input
      type="search"
      onChange={(event) => onSearch(event.target.value)}
      placeholder={
        locale === "id" ? "Cari judul catatan" : "Search by note title"
      }
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

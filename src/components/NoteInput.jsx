import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function NoteInput({ addNote }) {
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const [charCount, setCharCount] = useState(50);
  const { locale } = useContext(LocaleContext);

  const titleChangeHandler = (e) => {
    const newTitle = e.target.value.slice(0, 50);
    onTitleChange({ target: { value: newTitle } });
    setCharCount(50 - newTitle.length);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addNote({ title, body });
  };

  return (
    <div className="note-input">
      <h2 className="note-input__heading">
        {locale === "id" ? "Tulis Catatan" : "Write Note"}
      </h2>
      <p className="note-input__title__char-count">
        {locale === "id" ? "Sisa karakter" : "Characters left"}: {charCount}
      </p>
      <form className="note-input__form" onSubmit={submitHandler}>
        <input
          className="note-input__title"
          type="text"
          value={title}
          onChange={titleChangeHandler}
          placeholder={
            locale === "id" ? "Tulis judul disini ..." : "Write the title here"
          }
        />
        <textarea
          value={body}
          onChange={onBodyChange}
          placeholder={
            locale === "id" ? "Isi catatan ..." : "Write the note ..."
          }
        />
        <button type="submit">{locale === "id" ? "Tambahkan" : "Add"}</button>
      </form>
    </div>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;

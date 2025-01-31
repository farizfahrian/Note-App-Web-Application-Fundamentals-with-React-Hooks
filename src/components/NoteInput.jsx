import React, { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { addNote } from "../utils/network";

// class NoteInput extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       title: "",
//       body: "",
//       charCount: 50,
//     };

//     this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
//     this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
//     this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
//   }

//   onTitleChangeEventHandler(event) {
//     const newTitle = event.target.value;
//     const charsRemaining = 50 - newTitle.length;
//     this.setState(() => {
//       return {
//         title: event.target.value.slice(0, 50),
//         charCount: charsRemaining < 0 ? 0 : charsRemaining,
//       };
//     });
//   }

//   onBodyChangeEventHandler(event) {
//     this.setState(() => {
//       return {
//         body: event.target.value,
//       };
//     });
//   }

//   onSubmitEventHandler(event) {
//     event.preventDefault();
//     this.props.addNote(this.state);
//   }

//   render() {
//     return (
//       <div className="note-input">
//         <h2 className="note-input__heading">Tulis Catatan</h2>
//         <p className="note-input__title__char-count">
//           Sisa karakter: {this.state.charCount}
//         </p>
//         <form className="note-input__form" onSubmit={this.onSubmitEventHandler}>
//           <input
//             className="note-input__title"
//             type="text"
//             value={this.state.title}
//             onChange={this.onTitleChangeEventHandler}
//             placeholder="Tulis judul disini ..."
//           />
//           <textarea
//             value={this.state.body}
//             onChange={this.onBodyChangeEventHandler}
//             placeholder="Isi catatan ..."
//           />
//           <button type="submit">Tambahkan</button>
//         </form>
//       </div>
//     );
//   }
// }

function NoteInput({ addNote }) {
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const [charCount, setCharCount] = useState(50);

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
      <h2 className="note-input__heading">Tulis Catatan</h2>
      <p className="note-input__title__char-count">
        Sisa karakter: {charCount}
      </p>
      <form className="note-input__form" onSubmit={submitHandler}>
        <input
          className="note-input__title"
          type="text"
          value={title}
          onChange={titleChangeHandler}
          placeholder="Tulis judul disini ..."
        />
        <textarea
          value={body}
          onChange={onBodyChange}
          placeholder="Isi catatan ..."
        />
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;

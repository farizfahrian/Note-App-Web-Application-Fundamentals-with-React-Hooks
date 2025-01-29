import React from "react";
import PropTypes from "prop-types";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      charCount: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const newTitle = event.target.value;
    const charsRemaining = 50 - newTitle.length;
    this.setState(() => {
      return {
        title: event.target.value.slice(0, 50),
        charCount: charsRemaining < 0 ? 0 : charsRemaining,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <div className="note-input">
        <h2 className="note-input__heading">Tulis Catatan</h2>
        <p className="note-input__title__char-count">
          Sisa karakter: {this.state.charCount}
        </p>
        <form className="note-input__form" onSubmit={this.onSubmitEventHandler}>
          <input
            className="note-input__title"
            type="text"
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            placeholder="Tulis judul disini ..."
          />
          <textarea
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            placeholder="Isi catatan ..."
          />
          <button type="submit">Tambahkan</button>
        </form>
      </div>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;

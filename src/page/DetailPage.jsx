import React, { Component } from "react";
import { getNote } from "../utils/local-data";
import { useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import PropTypes from "prop-types";

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
}

export class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };
  }

  render() {
    if (this.state.movie === null) {
      return <p>Note tidak ditemukan</p>;
    }

    return (
      <section>
        <NoteDetail {...this.state.note} />
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailPageWrapper;

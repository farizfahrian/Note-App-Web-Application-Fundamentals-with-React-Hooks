import React, { Component, useEffect, useState } from "react";
import { getNote } from "../utils/network";
import { useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    getNote(id)
      .then(({ data }) => {
        setNote(data);
      })
      .catch(() => {
        setNote(null);
      })
      .finally(() => {
        setInitializing(false);
      });
  }, [id]);

  if (initializing) {
    return (
      <div className="auth-loading">
        <div className="auth-loading__spinner"></div>
        <p>Loading ...</p>
      </div>
    );
  }
  if (note === null) {
    return <p>Note tidak ditemukan</p>;
  }
  return (
    <section>
      <NoteDetail {...note} />
    </section>
  );
}

export default DetailPage;

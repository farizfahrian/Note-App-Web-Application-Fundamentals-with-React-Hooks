import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="note-app__not-found-body">
      <h2>Page tidak ditemukan</h2>
      <p>Mungkin ada kesalahan dalam penulisan url</p>
      <Link to="/" className="note-item__not-found-button">
        Kembali ke halaman awal
      </Link>
    </section>
  );
}

export default NotFound;

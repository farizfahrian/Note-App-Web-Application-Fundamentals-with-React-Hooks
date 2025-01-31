import React, { useContext } from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const { locale } = useContext(LocaleContext);

  const submitHandler = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={submitHandler} className="auth-form">
      <div className="auth-form__group">
        <label className="auth-form__label" htmlFor="name">
          {locale === "id" ? "Nama" : "Name"}
        </label>
        <input
          className="auth-form__input"
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
        />
      </div>

      <div className="auth-form__group">
        <label className="auth-form__label" htmlFor="email">
          Email
        </label>
        <input
          className="auth-form__input"
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
        />
      </div>

      <div className="auth-form__group">
        <label className="auth-form__label" htmlFor="password">
          Password
        </label>
        <input
          className="auth-form__input"
          type="password"
          id="password"
          autoComplete="on"
          value={password}
          onChange={onPasswordChange}
        />
      </div>

      <button type="submit" className="auth-form__button">
        {locale === "id" ? "Daftar" : "Register"}
      </button>

      <div className="auth-form__link">
        <a href="/login">
          {locale === "id"
            ? "Sudah punya akun? Login disini"
            : "Already have an account? Login here"}
        </a>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;

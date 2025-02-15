import React, { useContext } from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const { locale } = useContext(LocaleContext);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <form onSubmit={submitHandler} className="auth-form">
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
          value={password}
          onChange={onPasswordChange}
        />
      </div>

      <button type="submit" className="auth-form__button">
        Login
      </button>

      <div className="auth-form__link">
        <a href="/register">
          {" "}
          {locale === "id"
            ? "Tidak punya akun? Daftar disini"
            : "Don't have an account? Register here"}
        </a>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;

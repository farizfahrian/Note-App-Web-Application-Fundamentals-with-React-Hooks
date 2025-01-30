import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <form onSubmit={submitHandler} autoComplete="current-password">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
      <button>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;

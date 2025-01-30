import React from "react";
import { login } from "../utils/network";
import LoginInput from "../components/LoginInput";
import PropTypes from "prop-types";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }
  return (
    <section>
      <h2>Silakan Login</h2>
      <LoginInput login={onLogin} />
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;

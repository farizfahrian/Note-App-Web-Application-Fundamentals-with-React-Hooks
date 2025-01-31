import React, { useContext } from "react";
import { login } from "../utils/network";
import LoginInput from "../components/LoginInput";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
  const { locale } = useContext(LocaleContext);
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }
  return (
    <section className="auth-container">
      <h2 className="auth-title">
        {locale === "id" ? "Masuk ke Akun Anda" : "Login to Your Account"}
      </h2>
      <LoginInput login={onLogin} />
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;

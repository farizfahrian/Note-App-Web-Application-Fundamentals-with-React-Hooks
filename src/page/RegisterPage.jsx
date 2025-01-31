import React, { useContext } from "react";
import { register } from "../utils/network";
import RegisterInput from "../components/RegisterInput";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  async function onRegister({ name, email, password }) {
    const { error } = await register({ name, email, password });

    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="auth-container">
      <h2 className="auth-title">
        {locale === "id" ? "Dafarkan Akun Anda" : "Register Your Account"}
      </h2>
      <RegisterInput register={onRegister} />
    </section>
  );
}

export default RegisterPage;

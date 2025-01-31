import React, { useEffect, useState } from "react";
import NoteHeader from "./NoteHeader";
import AddPage from "../page/AddPage";
import HomePage from "../page/HomePage";
import NotFound from "./NotFound";
import DetailPage from "../page/DetailPage";
import ArchivePage from "../page/ArchivePage";
import { Route, Routes } from "react-router-dom";
import { getUserLogged, putAccessToken } from "../utils/network";
import { LocaleProvider } from "../contexts/LocaleContext";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";

function NoteApp() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [localeContext, setLocaleContext] = useState({
    locale: localStorage.getItem("locale") || "id",
    toggleLocale: () => {
      setLocaleContext((prevState) => {
        const newLocale = prevState.locale === "id" ? "en" : "id";
        localStorage.setItem("locale", newLocale);
        return { ...prevState, locale: newLocale };
      });
    },
  });

  useEffect(() => {
    async function fetchUserLogged() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    fetchUserLogged();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleProvider value={localeContext}>
        <div>
          <main>
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider value={localeContext}>
      <div>
        <NoteHeader logout={onLogout} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/note/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </LocaleProvider>
  );
}

export default NoteApp;

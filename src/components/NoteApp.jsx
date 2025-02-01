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
import { ThemeProvider } from "../contexts/ThemeContext";

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
  const [themeContext, setThemeContext] = useState({
    theme: localStorage.getItem("theme") || "dark",
    toggleTheme: () => {
      setThemeContext((prevState) => {
        const newTheme = prevState.theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        return { ...prevState, theme: newTheme };
      });
    },
  });

  useEffect(() => {
    async function fetchUserLogged() {
      const { data } = await getUserLogged();
      const savedTheme = localStorage.getItem("theme") || "dark";
      setAuthedUser(data);
      setInitializing(false);
      document.documentElement.setAttribute("data-theme", savedTheme);
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
        <ThemeProvider value={themeContext}>
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
        </ThemeProvider>
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider value={localeContext}>
      <ThemeProvider value={themeContext}>
        <div>
          <NoteHeader logout={onLogout} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage name={authedUser.name} />} />
              <Route path="/add" element={<AddPage />} />
              <Route
                path="/archive"
                element={<ArchivePage name={authedUser.name} />}
              />
              <Route path="/note/:id" element={<DetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default NoteApp;

// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider, Button } from "antd";
import MainLayout from "./components/MainLayout";
import LoginPage from "./layouts/auth/component/LoginPage";
import RegisterPage from "./layouts/register/component/RegisterPage";
import NotFoundPage from "./layouts/utils/404";
import { MainRouter } from "./layouts/route";

// Define light and dark themes

const lightTheme = {
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#ffffff",
    colorTextBase: "#000000",
    colorBgLayout: "#f0f0f0",
    colorTextSecondary: "#595959",
  },
  components: {
    Table: {
      headerBg: "#FFFFFF",
      headerBorderRadius: 0,
    },
  },
};

const darkTheme = {
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#1E1E2D",
    colorTextBase: "#e0e0e0",
    colorBgLayout: "#1f1f1f",
    colorTextSecondary: "#bfbfbf",
  },
  components: {
    Table: {
      headerBg: "#1E1E2D",
      headerBorderRadius: 0,
    },
  },
};

const App = () => {
  const themeCache = JSON.parse(localStorage.getItem("theme"));
  const [isDarkMode, setIsDarkMode] = useState(themeCache);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", JSON.stringify(!isDarkMode));
  };

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <div
          style={{
            minHeight: "100vh",
            background: isDarkMode ? "#141414" : "#ffffff",
          }}
        >
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <MainLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              }
            >
              {MainRouter.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={React.cloneElement(route.element, {
                    isDarkMode: isDarkMode,
                  })}
                />
              ))}
            </Route>
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;

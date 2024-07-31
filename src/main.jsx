// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import "./input.css";
import "./output.css";

// Define dark theme variables
const darkTheme = {
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#141414",
    colorTextBase: "#e0e0e0",
    colorBgLayout: "#1f1f1f",
    colorTextSecondary: "#bfbfbf",
    // Add more theme variables as needed
  },
};

const Main = () => (
  <ConfigProvider theme={darkTheme}>
    <App />
  </ConfigProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// src/components/MainLayout.jsx
import React, { useState } from "react";
import { Layout } from "antd";
import CustomHeader from "./Header";
import CustomFooter from "./Footer";
import Sidebar from "./Sidebar";
import BreadCrumb from "./BreadCrumb";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = ({ isDarkMode, toggleTheme }) => {
  const { Content } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  // const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",

        // background: isDarkMode ? "#141414" : "#fff",
      }}
    >
      {/* Sidebar Component */}
      <Sidebar collapsed={collapsed} isDarkMode={isDarkMode} />
      <Layout>
        {/* Header Component */}
        <CustomHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
        <Content
          style={{
            padding: "0 16px",
            backgroundColor: isDarkMode ? "#151521" : "#F2F7FF",
          }}
        >
          {/* BreadCrumb Component */}
          <BreadCrumb location={location} isDarkMode={isDarkMode} />
          {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: isDarkMode ? "#1f1f1f" : "#fff",
              borderRadius: "8px",
            }}
          >
          </div> */}
          <Outlet />
        </Content>
        {/* Footer Component */}
        <CustomFooter isDarkMode={isDarkMode} />
      </Layout>
    </Layout>
  );
};

export default MainLayout;

// Footer.jsx
import { Layout } from "antd";
import React from "react";

const CustomFooter = ({ isDarkMode }) => {
  const { Footer } = Layout;
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: isDarkMode ? "#1E1E2D" : "#FFFFFF",
      }}
    >
      <p
        className="text-[12px]"
        style={{ color: isDarkMode ? "white" : "black", fontWeight: "500" }}
      >
        Uangku ©{new Date().getFullYear()} By Bagas Arya P
      </p>
    </Footer>
  );
};

export default CustomFooter;

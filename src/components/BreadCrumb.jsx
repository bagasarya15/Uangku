// BreadCrumb.jsx
import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { MainRouter } from "../layouts/route";

const BreadCrumb = ({ location, isDarkMode }) => {
  const currentRoute = MainRouter.find(
    (route) => route.path === location.pathname
  );

  const breadcrumbItems = currentRoute ? (
    <Breadcrumb.Item>
      <Link to="/">
        {" "}
        <p style={{ color: "#1d4ed8" }}>Menu</p>
      </Link>{" "}
      <span style={{ color: "gray" }}> / </span>
      <Link to={currentRoute.path}>
        {" "}
        <p style={{ color: isDarkMode ? "white" : "gray" }}>
          {currentRoute.title}
        </p>
      </Link>
    </Breadcrumb.Item>
  ) : null;

  return (
    <Breadcrumb style={{ margin: "16px 0", color: "inherit" }}>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default BreadCrumb;

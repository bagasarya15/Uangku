// src/components/ListMenu.jsx
import React from "react";
import { Menu } from "antd";
import { MainRouter } from "../layouts/route";
import AuthUser from "../layouts/utils/AuthUser";
import { Link, useLocation } from "react-router-dom";

const ListMenu = ({ isDarkMode }) => {
  const location = useLocation();
  const { user } = AuthUser();
  const userRoles = user?.data?.role?.name || [];

  return (
    <Menu
      theme={isDarkMode ? "dark" : "light"}
      defaultSelectedKeys={["1"]}
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ backgroundColor: "transparent" }}
    >
      {MainRouter.map((item) =>
        item.roles && !userRoles.includes(item.roles) ? null : (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            style={{
              color:
                location.pathname === item.path
                  ? isDarkMode
                    ? "#ffffff"
                    : "#ffffff"
                  : isDarkMode
                  ? "#e0e0e0"
                  : "#25396f",
              fontWeight: location.pathname === item.path ? "bold" : "500",
              backgroundColor:
                location.pathname === item.path
                  ? isDarkMode
                    ? "#435ebe"
                    : "#435ebe"
                  : "transparent",
            }}
          >
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default ListMenu;

import React from "react";
import { Menu } from "antd";
import AuthUser from "../layouts/utils/AuthUser";
import { Link, useLocation } from "react-router-dom";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";

const ListMenu = () => {
	const location = useLocation();
	const { token, user, logout } = AuthUser();

	const items = [
		{ key: "1", icon: <PieChartOutlined />, title: "Dashboard", link: "/" },
		{
			key: "2",
			icon: <DesktopOutlined />,
			title: "Category",
			link: "/category",
		},
	];

	return (
		<Menu
			theme="dark"
			defaultSelectedKeys={["1"]}
			mode="inline"
			selectedKeys={[location.pathname]}
		>
			{items.map((item) => (
				<Menu.Item key={item.key} icon={item.icon}>
					<Link to={item.link}>{item.title}</Link>
				</Menu.Item>
			))}
		</Menu>
	);
};

export default ListMenu;

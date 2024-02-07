import React from "react";
import { Menu } from "antd";
import { MainRouter } from "../layouts/route";
import { Link, useLocation } from "react-router-dom";

const ListMenu = () => {
	const location = useLocation();

	return (
		<Menu
			theme="dark"
			defaultSelectedKeys={["1"]}
			mode="inline"
			selectedKeys={[location.pathname]}
			className="sidebar-menu"
		>
			{MainRouter.map((item) => (
				<Menu.Item
					key={item.key}
					icon={item.icon}
					style={{
						color:
							location.pathname === item.path ? "white" : "gray",
						fontWeight:
							location.pathname === item.path ? "bold" : "",
					}}
				>
					<Link to={item.path}>{item.title}</Link>
				</Menu.Item>
			))}
		</Menu>
	);
};

export default ListMenu;

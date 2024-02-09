import React from "react";
import { Menu } from "antd";
import { MainRouter } from "../layouts/route";
import AuthUser from "../layouts/utils/AuthUser";
import { Link, useLocation } from "react-router-dom";

const ListMenu = () => {
	const location = useLocation();
	const { user } = AuthUser();
	const userRoles = user?.data?.role?.name || [];

	return (
		<Menu
			theme="dark"
			defaultSelectedKeys={["1"]}
			mode="inline"
			selectedKeys={[location.pathname]}
		>
			{MainRouter.map((item) =>
				item.roles && !userRoles.includes(item.roles) ? null : (
					<Menu.Item
						key={item.key}
						icon={item.icon}
						style={{
							color:
								location.pathname === item.path
									? "white"
									: "gray",
							fontWeight:
								location.pathname === item.path ? "bold" : "",
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

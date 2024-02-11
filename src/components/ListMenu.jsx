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
			theme="light"
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
									? "white"
									: "#25396f",
							fontWeight:
								location.pathname === item.path
									? "bold"
									: "500",
							backgroundColor:
								location.pathname === item.path
									? "#435ebe"
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

import React from "react";
import AuthUser from "../layouts/utils/AuthUser";
import { Layout, Dropdown, Avatar, Menu, theme, Button } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from "@ant-design/icons";

const CustomHeader = ({ collapsed, setCollapsed }) => {
	const { Header } = Layout;
	const { token, user, logout } = AuthUser();
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const headerItems = [
		{
			key: "0",
			icon: <LogoutOutlined />,
			title: "Logout",
			onClick: logout,
		},
	];

	const items = (
		<Menu>
			{headerItems.map((item) => (
				<Menu.Item
					key={item.key}
					icon={item.icon}
					onClick={item.onClick}
				>
					{item.title}
				</Menu.Item>
			))}
		</Menu>
	);

	return (
		<Header style={{ padding: 0, background: colorBgContainer }}>
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				style={{ fontSize: "16px", width: 64, height: 64 }}
			/>
			<div style={{ float: "right", marginRight: 20 }}>
				<span style={{ marginRight: 8 }}>
					Welcome,{user?.data.name}
				</span>
				<Dropdown overlay={items} trigger={["click"]}>
					{user?.data.image && user.data.image !== "default.png" ? (
						<Avatar
							style={{
								backgroundColor: "#1890ff",
								cursor: "pointer",
							}}
							src={user.data.image}
						/>
					) : (
						<Avatar
							style={{
								backgroundColor: "#1890ff",
								cursor: "pointer",
							}}
							icon={<UserOutlined />}
						/>
					)}
				</Dropdown>
			</div>
		</Header>
	);
};

export default CustomHeader;

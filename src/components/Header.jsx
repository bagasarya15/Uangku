import React from "react";
import AuthUser from "../layouts/utils/AuthUser";
import { Layout, Dropdown, Avatar, Menu, theme, Button } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

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
			onClick: handleLogout,
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

	function handleLogout() {
		Swal.fire({
			title: "Konfirmasi Logout",
			text: "Anda Ingin Logout?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Logout!",
			cancelButtonText: "Batal",
			reverseButtons: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			width: "400px",
		}).then((result) => {
			if (result.isConfirmed) {
				logout();
			}
		});
	}

	return (
		<Header style={{ padding: 0, background: colorBgContainer }}>
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				style={{ fontSize: "16px", width: 64, height: 64 }}
			/>
			<div className="float-right mr-4 lg:mr-20">
				<span className="hidden lg:inline-block mr-4">
					Welcome, {user?.data.name}
				</span>
				<Dropdown overlay={items} trigger={["click"]}>
					{user?.data.image && user.data.image !== "default.png" ? (
						<Avatar
							className="cursor-pointer"
							style={{
								backgroundColor: "#1890ff",
							}}
							src={user.data.image}
						/>
					) : (
						<Avatar
							className="cursor-pointer"
							style={{
								backgroundColor: "#1890ff",
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

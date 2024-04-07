import Swal from "sweetalert2";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "../layouts/utils/AuthUser";
import DefaultUsersImage from "../assets/default.jpg";
import { Layout, Dropdown, Avatar, Menu, Button, message } from "antd";
import EditProfileModal from "../layouts/users/component/UsersProfile";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	LogoutOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const CustomHeader = ({ collapsed, setCollapsed }) => {
	const navigate = useNavigate();
	const { user, logout } = AuthUser();
	const [modalVisible, setModalVisible] = useState(false);
	const [userData, setUserData] = useState(user?.data);

	const headerItems = [
		{
			key: "0",
			icon: <UserOutlined />,
			title: "User Profile",
			onClick: handleUserProfile,
		},
		{
			key: "1",
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

	function handleUserProfile() {
		setModalVisible(true);
	}

	function handleSave() {
		message.success("Profile berhasil diperbarui");
		setModalVisible(false);

		setTimeout(() => {
			window.location.reload();
		}, 1000);
	}

	return (
		<Header style={{ padding: 0, background: "#fff" }}>
			{/* Toggle Button */}
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				style={{ fontSize: "16px", width: 64, height: 64, zIndex: 1 }}
			/>
			<div className="float-right mr-4 lg:mr-20">
				<span
					className="hidden lg:inline-block mr-4"
					style={{ color: "#25396f", fontWeight: "500" }}
				>
					{userData?.name}
				</span>
				<Dropdown
					overlay={items}
					trigger={["click"]}
					placement="bottomRight"
				>
					{user?.data.image && user.data.image !== "default.jpg" ? (
						<Avatar
							className="cursor-pointer"
							style={{ backgroundColor: "#1890ff" }}
							src={user.data.image}
						/>
					) : (
						<Avatar
							className="cursor-pointer"
							style={{ backgroundColor: "#1890ff" }}
							src={DefaultUsersImage}
						/>
					)}
				</Dropdown>
			</div>

			{/* Edit Profile Modal */}
			<EditProfileModal
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
				onSave={handleSave}
				userData={userData}
			/>
		</Header>
	);
};

export default CustomHeader;

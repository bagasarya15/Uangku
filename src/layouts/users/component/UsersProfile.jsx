import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import DefaultUsersImage from "../../../assets/default.jpg";
import { deleteImage, editProfile } from "../../../services/AuthApi";
import {
	Modal,
	Form,
	Input,
	Button,
	Image,
	Spin,
	Alert,
	Upload,
	Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditProfileModal = ({
	visible,
	onCancel,
	userData,
	editable,
	onSave,
}) => {
	const [form] = Form.useForm();
	const [err, setErr] = useState({});
	const [loading, setLoading] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [defaultImage, setDefaultImage] = useState(null);
	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		form.setFieldsValue({
			username: userData?.username || "",
			email: userData?.email || "",
			name: userData?.name || "",
			image: userData?.image || null,
		});
		setDefaultImage(userData?.image || null);
	}, [userData]);

	const handleChange = (info) => {
		let fileList = [...info.fileList];
		fileList = fileList.slice(-1);
		setFileList(fileList);
		if (fileList.length > 0) {
			const file = fileList[0].originFileObj;
			setPreviewImage(URL.createObjectURL(file));
		} else {
			setPreviewImage(null);
		}
	};

	const handleUpdateProfile = async (values) => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("id", userData?.id);
			formData.append("username", values.username);
			formData.append("email", values.email);
			formData.append("name", values.name);
			if (fileList.length > 0) {
				formData.append("image", fileList[0].originFileObj);
			}
			const data = await editProfile(formData);
			if (data.status === 200 && data.tokenUpdate) {
				localStorage.setItem("token", data.tokenUpdate);
				setLoading(false);
				onSave(true);
			}
		} catch (error) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.status === 422
			) {
				setErr({ message: error.response.data.message });
			}
			setLoading(false);
		}
	};

	const handleDeleteImage = async () => {
		try {
			setLoading(true);
			const data = await deleteImage({ userId: userData?.id });
			if (data.status === 200 && data.tokenUpdate) {
				localStorage.setItem("token", data.tokenUpdate);
				setLoading(false);
				onSave(true);
			}
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const confirmDelete = () => {
		Swal.fire({
			title: "Hapus Foto",
			text: "Anda Ingin Hapus Foto?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Hapus",
			cancelButtonText: "Batal",
			reverseButtons: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			width: "400px",
		}).then((result) => {
			if (result.isConfirmed) {
				handleDeleteImage();
			}
		});
	};

	const handleCloseAlert = () => {
		setErr(null);
		setLoading(false);
	};

	const handleCancel = () => {
		form.setFieldsValue({
			username: userData?.username || "",
			email: userData?.email || "",
			name: userData?.name || "",
			image: userData?.image || null,
		});
		setPreviewImage(userData?.image || null);
		onCancel();
		setErr(null);
		setLoading(false);
	};

	return (
		<Modal
			title="Edit Profile"
			visible={visible}
			onCancel={handleCancel}
			footer={[
				<Button key="cancel" onClick={handleCancel}>
					Batal
				</Button>,
				<Button
					key="submit"
					onClick={() => form.submit()}
					disabled={loading}
					style={{
						position: "relative",
						overflow: "hidden",
					}}
				>
					{loading && (
						<Spin
							tip="Loading"
							size="small"
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
							}}
						/>
					)}
					<span style={{ opacity: loading ? 0 : 1 }}>Perbarui</span>
				</Button>,
			]}
		>
			<Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
				{err && err.message && (
					<Alert
						message={err.message}
						type="warning"
						showIcon
						closable
						onClose={handleCloseAlert}
						action={
							<Button
								size="small"
								type="text"
								onClick={handleCloseAlert}
							>
								Coba lagi
							</Button>
						}
					/>
				)}
				<Form.Item
					name="username"
					label="Username"
					className="mt-2"
					rules={[
						{ required: true, message: "Username wajib diisi" },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item name="email" label="Email">
					<Input />
				</Form.Item>
				<Form.Item
					name="name"
					label="Nama"
					rules={[{ required: true, message: "Nama wajib diisi" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item name="image" label="Profile Picture">
					<div className="mb-2">
						{previewImage ? (
							<Image
								width={200}
								src={previewImage}
								alt="Profile Picture"
							/>
						) : userData?.image === "default.jpg" ? (
							<Image
								width={200}
								src={DefaultUsersImage}
								alt="Default Profile"
							/>
						) : defaultImage ? (
							<Image
								width={200}
								src={defaultImage}
								alt="Profile Picture"
							/>
						) : null}
					</div>

					<Space align="start" className="flex gap-2">
						<Upload
							action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
							listType="picture"
							maxCount={1}
							fileList={fileList}
							onChange={handleChange}
							showUploadList={false}
						>
							<Button icon={<UploadOutlined />}>
								Upload Foto
							</Button>
						</Upload>

						{defaultImage !== "default.jpg" && (
							<Button
								onClick={confirmDelete}
								type="primary"
								danger
							>
								Hapus Foto
							</Button>
						)}
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditProfileModal;

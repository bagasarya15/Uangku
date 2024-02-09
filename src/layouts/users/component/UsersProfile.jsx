import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import DefaultUsersImage from "../../../assets/default.jpg";
import { deleteImage, editProfile } from "../../../services/AuthApi";
import { Modal, Form, Input, Button, Image, Spin, Alert } from "antd";

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

	useEffect(() => {
		form.setFieldsValue({
			username: userData.username || "",
			email: userData.email || "",
			name: userData.name || "",
			image: userData.image || null,
		});
		setDefaultImage(userData.image || null);
	}, [userData]);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			form.setFieldsValue({ image: file });
			setPreviewImage(URL.createObjectURL(file));
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
			formData.append("image", values.image);
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
			username: userData.username || "",
			email: userData.email || "",
			name: userData.name || "",
			image: userData.image || null,
		});
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
					onClick={form.submit}
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
					label="Name"
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
						) : userData.image === "default.jpg" ? (
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

					<div className="d-flex align-items-center">
						<input
							accept="image/png, image/jpeg, image/jpg"
							type="file"
							className="block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
							onChange={handleFileChange}
							style={{ display: "inline-block" }}
						/>

						<Button
							onClick={confirmDelete}
							accept="image/png, image/jpeg, image/jpg"
							type="file"
							className="file:py-2 file:px-4 file:rounded-full file:text-sm file:font-semibold file:bg-transparent file:text-red-500 border border-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 mt-3"
						>
							Hapus Foto
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditProfileModal;

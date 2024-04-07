import validate from "./Validate";
import { useForm } from "react-hook-form";
import { Alert, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { apiRegister } from "../../../services/AuthApi";
import ToggleComponent from "../../utils/ToggleComponent";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const RegisterPage = () => {
	const [err, setErr] = useState({});
	const [isSuccess, setIsSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleCloseAlert = () => {
		setErr(null);
		setLoading(false);
		setIsSuccess(null);
	};
	const navigate = useNavigate();
	const {
		watch,
		register,
		setError,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	const {
		showPassword,
		showConfirmPassword,
		togglePasswordVisibility,
		toggleConfirmPasswordVisibility,
	} = ToggleComponent();

	const handleRegister = async (formData) => {
		try {
			setLoading(true);
			const data = await apiRegister(JSON.stringify(formData));
			if (data.status === 201) {
				setIsSuccess(true);
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			}
		} catch (error) {
			const {
				response: { data },
			} = error;
			if (data.status === 422) {
				setErr({ message: data.message });
			}
		}
	};

	useEffect(() => {
		if (isSuccess) {
			reset({
				name: "",
				username: "",
				password: "",
				confirmPassword: "",
			});
		}
	}, [isSuccess]);

	return (
		<div className="flex flex-col h-screen bg-gray-200">
			<div className="w-[500px] m-auto">
				<div className="flex items-center justify-center">
					<h1 className="text-2xl font-bold mb-3">REGISTRASI AKUN</h1>
				</div>
				<form
					onSubmit={handleSubmit(handleRegister)}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-5 lg:mx-0"
				>
					<div className="mb-4">
						{isSuccess && (
							<Alert
								message="Akun berhasil dibuat"
								type="success"
								showIcon
								closable
								onClose={handleCloseAlert}
								action={
									<Button
										size="small"
										type="text"
										onClick={() => navigate("/login")}
									>
										Login
									</Button>
								}
							/>
						)}
					</div>

					<div className="mb-4">
						{err && err.message && (
							<Alert
								message="Username sudah digunakan"
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
					</div>

					<div className=" relative mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Username
						</label>

						<input
							className={`shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[1px] ${
								errors.username ? "border-red-400 " : ""
							}`}
							type="text"
							autoComplete="off"
							placeholder="Username"
							{...register("username", validate.username)}
						/>
						{errors.username && (
							<p className="absolute top-5 left-3 bg-white px-2 rounded-xl text-red-600 text-xs">
								{errors.username.message}
							</p>
						)}
					</div>
					<div className=" relative mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Nama
						</label>

						<input
							className={`shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[1px] ${
								errors.name ? "border-red-400 " : ""
							}`}
							type="text"
							autoComplete="off"
							placeholder="Nama"
							{...register("name", validate.name)}
						/>
						{errors.name && (
							<p className="absolute top-5 left-3 bg-white px-2 rounded-xl text-red-600 text-xs">
								{errors.name.message}
							</p>
						)}
					</div>
					<div className="mb-6 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Password
						</label>
						<div
							className={`relative shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[1px] ${
								errors.password ? "border-red-400 " : ""
							}`}
						>
							<input
								className=" rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								{...register("password", validate.password)}
							/>
							<button
								className="absolute right-0 top-2 focus:outline-none pr-2 "
								type="button"
								onClick={togglePasswordVisibility}
							>
								{showPassword ? (
									<IconEye
										height={20}
										className="text-gray-500"
									/>
								) : (
									<IconEyeOff
										height={20}
										className="text-gray-500"
									/>
								)}
							</button>
						</div>
						{errors.password && (
							<p className="absolute top-5 left-3 bg-white px-2 rounded-xl text-red-600 text-xs">
								{errors.password.message}
							</p>
						)}
					</div>
					<div className="mb-6 relative">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Konfirmasi Password
						</label>
						<div
							className={`relative shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[1px] ${
								errors.confirmPassword ? "border-red-400 " : ""
							}`}
						>
							<input
								className=" rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Konfirmasi Password"
								{...register(
									"confirmPassword",
									validate.confirmPassword
								)}
							/>
							<button
								className="absolute right-0 top-2 focus:outline-none pr-2 "
								type="button"
								onClick={toggleConfirmPasswordVisibility}
							>
								{showConfirmPassword ? (
									<IconEye
										height={20}
										className="text-gray-500"
									/>
								) : (
									<IconEyeOff
										height={20}
										className="text-gray-500"
									/>
								)}
							</button>
						</div>
						{errors.confirmPassword && (
							<p className="absolute top-5 left-3 bg-white px-2 rounded-xl text-red-600 text-xs">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
							type="submit"
							disabled={loading}
						>
							{loading ? (
								<Spin
									indicator={
										<LoadingOutlined
											style={{
												fontSize: 24,
												color: "white",
											}}
											spin
										/>
									}
								/>
							) : (
								"Daftar"
							)}
						</button>
					</div>

					<div>
						<div className="mt-3 text-sm">
							Sudah punya akun?{" "}
							<span
								className="underline text-blue-500"
								style={{ cursor: "pointer" }}
								onClick={() => navigate("/login")}
							>
								Login
							</span>
						</div>
					</div>
				</form>
			</div>
			<footer className="text-center text-gray-500 text-sm py-4">
				© 2024 UANGKU. All rights reserved.
			</footer>
		</div>
	);
};

export default RegisterPage;

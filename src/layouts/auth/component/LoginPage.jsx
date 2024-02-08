import { Alert, Button, Spin } from "antd";
import { useForm } from "react-hook-form";
import AuthUser from "../../utils/AuthUser";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { apiLogin } from "../../../services/AuthApi";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import ToggleComponent from "../../utils/ToggleComponent";
const LoginPage = () => {
	const [err, setErr] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleCloseAlert = () => {
		setErr(null);
		setLoading(false);
	};

	const {
		watch,
		register,
		setError,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			usernameOrEmail: "",
			password: "",
		},
	});

	const { token, user, logout } = AuthUser();
	const { showPassword, togglePasswordVisibility } = ToggleComponent();

	const validate = {
		usernameOrEmail: { required: "username / email harus diisi" },
		password: { required: "password harus diisi" },
	};

	const handleLogin = async (params) => {
		try {
			const data = await apiLogin(params);
			if (data.status === 200) {
				localStorage.setItem("token", JSON.stringify(data.token));
				navigate("/");
			}
		} catch (error) {
			setLoading(true);
			const {
				response: { data },
			} = error;
			if (data.status === 400) {
				setErr({ message: data.message });
			}
		}
	};

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, [token]);

	return (
		<div className="flex h-screen bg-gray-200">
			<div className="m-auto w-[500px]">
				<div className="flex items-center justify-center">
					<h1 className="text-2xl font-bold mb-3">LOGIN</h1>
				</div>
				<form
					onSubmit={handleSubmit(handleLogin)}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-5"
				>
					<div className="mb-4">
						{err && err.message && (
							<Alert
								message="Username atau password salah"
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
							Username / Email
						</label>

						<input
							className={`shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[1px] ${
								errors.usernameOrEmail ? "border-red-400 " : ""
							}`}
							type="text"
							autoComplete="off"
							placeholder="Username / Email"
							{...register(
								"usernameOrEmail",
								validate.usernameOrEmail
							)}
						/>
						{errors.usernameOrEmail && (
							<p className="absolute top-5 left-3 bg-white px-2 rounded-xl text-red-600 text-xs">
								{errors.usernameOrEmail.message}
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
					<div className="flex items-center justify-between">
						<button
							className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
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
								"Login"
							)}
						</button>
					</div>

					<div>
						<div className="mt-3 text-sm">
							Belum punya akun?{" "}
							<span
								className="underline text-blue-500"
								style={{ cursor: "pointer" }}
								onClick={() => navigate("/register")}
							>
								Daftar sekarang
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;

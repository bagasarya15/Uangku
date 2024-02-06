import { IconAlertCircle, IconEye, IconEyeOff } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ToggleComponent from "../../utils/ToggleComponent";
import { apiLogin } from "../../../services/AuthApi";
import { IconX } from "@tabler/icons-react";
import {
	Alert,
	Box,
	CircularProgress,
	Collapse,
	IconButton,
} from "@mui/material";
import AuthUser from "../../utils/AuthUser";

const LoginPage = () => {
	const [err, setErr] = useState({});
	const [loading, setLoading] = useState(false);
	const [openError, setOpenError] = React.useState(false);
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
			usernameOrEmail: "",
			password: "",
		},
	});

	const { token, user, logout } = AuthUser();
	const { showPassword, togglePasswordVisibility } = ToggleComponent();

	const validate = {
		usernameOrEmail: { required: "username or email is required" },
		password: { required: "password is required" },
	};

	const handleLogin = async (params) => {
		try {
			const data = await apiLogin(params);
			if (data.status === 200) {
				localStorage.setItem("token", JSON.stringify(data.token));
				navigate("/dashboard");
			}
		} catch (error) {
			setLoading(true);
			const {
				response: { data },
			} = error;
			if (data.status === 400) {
				setOpenError(true);
				setErr({ message: data.message });
			}
		}
	};

	useEffect(() => {
		if (token) {
			navigate("/dashboard");
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
					<div>
						{err && (
							<Box sx={{ width: "100%" }}>
								<Collapse in={openError}>
									<Alert
										icon={
											<IconAlertCircle fontSize="inherit" />
										}
										severity="warning"
										action={
											<IconButton
												aria-label="close"
												size="small"
												onClick={() => {
													setOpenError(false);
													setLoading(false);
												}}
											>
												<IconX fontSize="inherit" />
											</IconButton>
										}
										sx={{ mb: 2 }}
									>
										<p className="m-auto p-auto">
											{err.message},
											<span
												className="underline"
												style={{ cursor: "pointer" }}
												onClick={() => {
													setOpenError(false);
													setLoading(false);
												}}
											>
												{""} try again
											</span>
										</p>
									</Alert>
								</Collapse>
							</Box>
						)}
					</div>
					<div className=" relative mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Username or Email
						</label>

						<input
							className={`shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[1px] ${
								errors.usernameOrEmail ? "border-red-400 " : ""
							}`}
							type="text"
							placeholder="Username or Email"
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
								<CircularProgress
									size={20}
									style={{ color: "white" }}
								/>
							) : (
								"Login"
							)}
						</button>
					</div>

					<div>
						<div className="mt-3 text-sm">
							Not registered?{" "}
							<span
								className="underline"
								style={{ cursor: "pointer" }}
								onClick={() => navigate("/register")}
							>
								Register now
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;

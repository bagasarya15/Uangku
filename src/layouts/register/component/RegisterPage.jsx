import validate from "./Validate";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ToggleComponent from "../../utils/ToggleComponent";
import { apiRegister } from "../../../services/AuthApi";
import {
	IconAlertCircle,
	IconEye,
	IconEyeOff,
	IconX,
} from "@tabler/icons-react";
import {
	Alert,
	Box,
	CircularProgress,
	Collapse,
	IconButton,
} from "@mui/material";

const RegisterPage = () => {
	const [err, setErr] = useState({});
	const [loading, setLoading] = useState(false);
	const [openSucces, setOpenSuccess] = React.useState(false);
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
				setOpenSuccess(true);
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			}
		} catch (error) {
			const {
				response: { data },
			} = error;
			if (data.status === 422) {
				setOpenError(true);
				setErr({ message: data.message });
			}
		}
	};

	useEffect(() => {
		if (openSucces) {
			reset({
				name: "",
				username: "",
				password: "",
				confirmPassword: "",
			});
		}
	}, [openSucces]);

	return (
		<div className="flex h-screen bg-gray-200">
			<div className="w-[500px] m-auto">
				<div className="flex items-center justify-center">
					<h1 className="text-2xl font-bold mb-3">REGISTER</h1>
				</div>
				<form
					onSubmit={handleSubmit(handleRegister)}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-5 lg:mx-0"
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

						{openSucces && (
							<Box sx={{ width: "100%" }}>
								<Collapse in={openSucces}>
									<Alert
										severity="success"
										action={
											<IconButton
												aria-label="close"
												size="small"
												onClick={() => {
													setOpenSuccess(false);
												}}
											>
												<IconX fontSize="inherit" />
											</IconButton>
										}
										sx={{ mb: 2 }}
									>
										<p className="m-auto p-auto">
											Create account success,
											<span
												className="underline"
												style={{ cursor: "pointer" }}
												onClick={() =>
													navigate("/login")
												}
											>
												login
											</span>
										</p>
									</Alert>
								</Collapse>
							</Box>
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
							Name
						</label>

						<input
							className={`shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[1px] ${
								errors.name ? "border-red-400 " : ""
							}`}
							type="text"
							placeholder="Name"
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
							Confirm Password
						</label>
						<div
							className={`relative shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[1px] ${
								errors.confirmPassword ? "border-red-400 " : ""
							}`}
						>
							<input
								className=" rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Confirm Password"
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
								<CircularProgress
									size={20}
									style={{ color: "white" }}
								/>
							) : (
								"Register"
							)}
						</button>
					</div>

					<div>
						<div className="mt-3 text-sm">
							Already registered?{" "}
							<span
								className="underline"
								style={{ cursor: "pointer" }}
								onClick={() => navigate("/login")}
							>
								Login
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;

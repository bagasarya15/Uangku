import React, { useState } from "react";

const ToggleComponent = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return {
		showPassword,
		showConfirmPassword,
		togglePasswordVisibility,
		toggleConfirmPasswordVisibility,
	};
};

export default ToggleComponent;

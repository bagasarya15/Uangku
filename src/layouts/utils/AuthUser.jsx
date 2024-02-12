import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [isLogout, setIsLogout] = useState(false);
	const [isExpired, setIsExpired] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login", { state: { isLogout: true } });
	};

	useEffect(() => {
		const decodedToken = token ? jwtDecode(token) : null;
		if (
			decodedToken &&
			decodedToken.exp &&
			decodedToken.exp < Date.now() / 1000
		) {
			localStorage.removeItem("token");
			setIsExpired(true);
			navigate("/login", { state: { isExpired: true } });
		}
	}, []);

	let decodedToken;

	try {
		decodedToken = token ? jwtDecode(token) : null;
	} catch (error) {
		console.error("Invalid token:", error);
	}

	return {
		token,
		user: decodedToken,
		logout: handleLogout,
	};
};

export default AuthUser;

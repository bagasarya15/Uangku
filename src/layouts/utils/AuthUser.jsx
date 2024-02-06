import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	if (!token) {
		return { token: null, user: null };
	}

	try {
		const decodedToken = jwtDecode(token);
		const handleLogout = () => {
			localStorage.removeItem("token");
			navigate("/login");
		};

		return {
			token,
			user: decodedToken,
			logout: handleLogout,
		};
	} catch (error) {
		console.error("Invalid token:", error);
		return { token: null, user: null, logout: handleLogout };
	}
};

export default AuthUser;

import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
	return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ element }) => {
	return isAuthenticated() ? (
		element
	) : (
		<Navigate
			to="/login"
			replace
			state={{ from: window.location.pathname }}
		/>
	);
};

export default ProtectedRoute;

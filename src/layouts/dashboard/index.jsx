import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardPage from "./component/DashboardPage";

const DashboardIndex = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.log("Navigating to /login...");
			navigate("/login");
		}
	}, []);

	return (
		<div>
			<DashboardPage />
		</div>
	);
};

export default DashboardIndex;

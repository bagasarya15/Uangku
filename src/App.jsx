import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./layouts/auth/component/LoginPage";
import RegisterPage from "./layouts/register/component/RegisterPage";
import { RouterList } from "./layouts/route";
import MainLayout from "./components/MainLayout";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/" element={<MainLayout />}>
					{RouterList.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={route.element}
						/>
					))}
				</Route>
			</Routes>
		</Router>
	);
};

export default App;

import React from "react";
import { MainRouter } from "./layouts/route";
import MainLayout from "./components/MainLayout";
import LoginPage from "./layouts/auth/component/LoginPage";
import RegisterPage from "./layouts/register/component/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./layouts/utils/404";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/*" element={<NotFoundPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				<Route path="/" element={<MainLayout />}>
					{MainRouter.map((route) => (
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

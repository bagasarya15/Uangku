import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./layouts/auth/component/LoginPage";
import RegisterPage from "./layouts/register/component/RegisterPage";
import { AuthRouter, MainRouter } from "./layouts/route";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<AuthLayout />} />
				{AuthRouter.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={route.element}
					/>
				))}

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

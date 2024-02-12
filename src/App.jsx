import React from "react";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import { AuthRouter, MainRouter } from "./layouts/route";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthUser from "./layouts/utils/AuthUser";

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

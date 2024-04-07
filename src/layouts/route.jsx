import UsersIndex from "./users";
import IncomeIndex from "./income";
import ExpenseIndex from "./expense";
import CategoryIndex from "./category";
import DashboardIndex from "./dashboard";
import LoginPage from "./auth/component/LoginPage";
import RegisterPage from "./register/component/RegisterPage";
import { Navigate } from "react-router-dom";
import {
	IconCategory,
	IconCoin,
	IconCoinOff,
	IconDashboard,
	IconUserCog,
} from "@tabler/icons-react";
import NotFoundPage from "./utils/404";

const isAuthenticated = () => {
	return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ element }) => {
	return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export const AuthRouter = [
	{
		key: "1",
		path: "/login",
		element: <LoginPage />,
	},
	{
		key: "2",
		path: "/register",
		element: <RegisterPage />,
	},

	{
		key: "404",
		path: "*",
		element: <NotFoundPage />,
	},
];

export const MainRouter = [
	{
		key: "1",
		path: "/",
		title: "Dashboard",
		icon: <IconDashboard />,
		element: <ProtectedRoute element={<DashboardIndex />} />,
	},
	{
		key: "2",
		path: "/category",
		title: "Kategori",
		icon: <IconCategory />,
		element: <ProtectedRoute element={<CategoryIndex />} />,
	},
	{
		key: "3",
		path: "/expense",
		title: "Pengeluaran",
		icon: <IconCoinOff />,
		element: <ProtectedRoute element={<ExpenseIndex />} />,
	},
	{
		key: "4",
		path: "/income",
		title: "Pemasukan",
		icon: <IconCoin />,
		element: <ProtectedRoute element={<IncomeIndex />} />,
	},
	{
		key: "5",
		path: "/user-management",
		title: "User Management",
		icon: <IconUserCog />,
		element: <ProtectedRoute element={<UsersIndex />} />,
		roles: ["admin"],
	},
];

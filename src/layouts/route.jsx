import LoginPage from "./auth/component/LoginPage";
import IncomePage from "./income/component/IncomePage";
import ExpensePage from "./expense/component/ExpensePage";
import RegisterPage from "./register/component/RegisterPage";
import CategoryPage from "./category/component/CategoryPage";
import DashboardPage from "./dashboard/component/DashboardPage";
import {
	IconCategory,
	IconCoin,
	IconCoinOff,
	IconDashboard,
} from "@tabler/icons-react";

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
];

export const MainRouter = [
	{
		key: "1",
		path: "/",
		title: "Dashboard",
		icon: <IconDashboard />,
		element: <DashboardPage />,
	},
	{
		key: "2",
		path: "/category",
		title: "Kategori",
		icon: <IconCategory />,
		element: <CategoryPage />,
	},
	{
		key: "3",
		path: "/expense",
		title: "Pengeluaran",
		icon: <IconCoinOff />,
		element: <ExpensePage />,
	},
	{
		key: "4",
		path: "/income",
		title: "Pemasukan",
		icon: <IconCoin />,
		element: <IncomePage />,
	},
];

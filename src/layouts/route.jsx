import LoginPage from "./auth/component/LoginPage";
import ExpensePage from "./expense/component/ExpensePage";
import CategoryPage from "./category/component/CategoryPage";
import RegisterPage from "./register/component/RegisterPage";
import DashboardPage from "./dashboard/component/DashboardPage";

export const AuthRouter = [
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
];

export const MainRouter = [
	{
		path: "/",
		menu: "Dashboard",
		element: <DashboardPage />,
	},
	{
		path: "/category",
		menu: "Category",
		element: <CategoryPage />,
	},
	{
		path: "/expense",
		menu: "Expense",
		element: <ExpensePage />,
	},
];

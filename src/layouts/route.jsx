import CategoryPage from "./category/component/CategoryPage";
import DashboardPage from "./dashboard/component/DashboardPage";

export const RouterList = [
	{
		path: "/",
		element: <DashboardPage />,
	},
	{
		path: "/category",
		element: <CategoryPage />,
	},
];

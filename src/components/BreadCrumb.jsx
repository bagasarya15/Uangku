import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { MainRouter } from "../layouts/route";

const BreadCrumb = ({ location }) => {
	const currentRoute = MainRouter.find(
		(route) => route.path === location.pathname
	);

	const breadcrumbItems = currentRoute ? (
		<Breadcrumb.Item>
			<Link to="/">
				{" "}
				<p className="text-blue-500">Menu</p>
			</Link>{" "}
			/ <Link to={currentRoute.path}>{currentRoute.menu}</Link>
		</Breadcrumb.Item>
	) : null;

	return (
		<Breadcrumb style={{ margin: "16px 0" }}>{breadcrumbItems}</Breadcrumb>
	);
};

export default BreadCrumb;

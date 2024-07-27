import Sidebar from "./Sidebar";
import { useState } from "react";
import CustomHeader from "./Header";
import CustomFooter from "./Footer";
import { Layout, theme } from "antd";
import BreadCrumb from "./BreadCrumb";
import { Outlet, useLocation } from "react-router-dom";
const MainLayout = () => {
	const { Content } = Layout;
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(true);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/* Sidebar Component */}
			<Sidebar collapsed={collapsed} />
			<Layout>
				{/* Header Component */}
				<CustomHeader
					collapsed={collapsed}
					setCollapsed={setCollapsed}
				/>
				<Content style={{ margin: "0 16px" }}>
					{/* BreadCrumb Component */}
					<BreadCrumb location={location} />
					<div
						style={{
							padding: 24,
							minHeight: 360,
							// background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Outlet />
					</div>
				</Content>
				{/* Footer Component */}
				<CustomFooter />
			</Layout>
		</Layout>
	);
};

export default MainLayout;

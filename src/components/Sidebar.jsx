import { Layout } from "antd";
import ListMenu from "./ListMenu";

const { Sider } = Layout;
const Sidebar = ({ collapsed }) => {
	const screenWidth = window.innerWidth;
	const position = screenWidth < 1080 ? "absolute" : "relative";
	const zIndex = position === "absolute" ? 1 : "auto";

	return (
		<Sider
			theme="light"
			trigger={null}
			collapsible
			collapsed={collapsed}
			collapsedWidth={0}
			width={200}
			style={{
				display: collapsed ? "none" : "block",
				position: position,
				left: 0,
				top: 0,
				width: "200px",
				zIndex: zIndex,
				minHeight: "100vh",
			}}
		>
			<div className="bg-white pt-[10px]">
				<div className="pb-[19px]">
					<div className="mt-3 text-center">
						<h1 className="font-bold">
							<span className="text-blue-700">UANG</span>
							<span className="text-gray-950">KU</span>
						</h1>
					</div>
				</div>
			</div>
			<ListMenu />
		</Sider>
	);
};

export default Sidebar;

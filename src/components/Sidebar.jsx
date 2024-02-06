import { Layout } from "antd";
import ListMenu from "./ListMenu";

const { Sider } = Layout;
const Sidebar = ({ collapsed }) => {
	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="bg-white pt-[10px]">
				<div className="pb-[19px]">
					<div className="mt-3 text-center">
						<h1 className="font-bold">UANGKU</h1>
					</div>
				</div>
			</div>
			<ListMenu />
		</Sider>
	);
};

export default Sidebar;

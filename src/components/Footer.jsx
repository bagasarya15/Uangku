import { Layout } from "antd";
import React from "react";

const CustomFooter = () => {
	const { Footer } = Layout;
	return (
		<Footer style={{ textAlign: "center" }}>
			<p className="text-blue-500 font-light text-[12px]">
				Uangku ©{new Date().getFullYear()} By Bagas Arya
			</p>
		</Footer>
	);
};

export default CustomFooter;

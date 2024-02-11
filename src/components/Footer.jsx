import { Layout } from "antd";
import React from "react";

const CustomFooter = () => {
	const { Footer } = Layout;
	return (
		<Footer style={{ textAlign: "center" }}>
			<p
				className="text-[12px]"
				style={{ color: "#25396f", fontWeight: "500" }}
			>
				Uangku ©{new Date().getFullYear()} By Bagas Arya P
			</p>
		</Footer>
	);
};

export default CustomFooter;

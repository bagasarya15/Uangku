import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const NotFoundPage = () => (
	<Result
		status="404"
		title="404"
		subTitle="Halaman tidak ditemukan."
		extra={
			<Link to="/">
				{" "}
				<Button>Kembali</Button>
			</Link>
		}
	/>
);

export default NotFoundPage;

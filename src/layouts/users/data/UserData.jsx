import { Avatar, Space, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import UserImage from "../../../assets/default.jpg";
import { apiGetUsers } from "../../../services/UsersApi";

const UserData = ({ render }) => {
	const [err, setErr] = useState(null);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 5,
		total: 0,
	});

	useEffect(() => {
		fetchData();
	}, [pagination.current, pagination.pageSize, searchValue]);

	const fetchData = async (search) => {
		setLoading(true);
		try {
			let params = {
				page: pagination.current,
				limit: pagination.pageSize,
				search: search,
			};
			const response = await apiGetUsers(params);
			if (response.status === 200) {
				setData(response.result);
				setPagination((prev) => ({
					...prev,
					total: response.meta.total,
				}));
			}
		} catch (error) {
			setErr(error.message);
		}
		setLoading(false);
	};

	const handlePaginationChange = (page, pageSize) => {
		setPagination((prev) => ({
			...prev,
			current: page,
			pageSize: pageSize,
		}));
	};

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};

	const columns = [
		{
			title: "Username",
			dataIndex: "username",
			key: "username",
			width: "25%",
		},
		{
			title: "Nama",
			dataIndex: "name",
			key: "name",
			width: "25%",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: "25%",
			render: (email) => (email ? email : "-"),
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			width: "20%",
			render: (role) => role?.name,
		},
		{
			title: "Image",
			dataIndex: "image",
			key: "image",
			render: (image) => (
				<Space size={12}>
					<Tooltip
						title={
							<img
								src={
									image === "default.jpg" ? UserImage : image
								}
								alt="Profile"
								width={200}
							/>
						}
						placement="right"
					>
						<Avatar
							width={40}
							src={image === "default.jpg" ? UserImage : image}
						/>
					</Tooltip>
				</Space>
			),
		},
	];

	return render({
		err: err,
		data: data,
		columns: columns,
		loading: loading,
		pagination: pagination,
		searchValue: searchValue,
		fetchData: fetchData,
		handleSearchChange: handleSearchChange,
		handlePaginationChange: handlePaginationChange,
	});
};

export default UserData;

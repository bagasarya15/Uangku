import Swal from "sweetalert2";
import { Badge, Button, message } from "antd";
import AuthUser from "../../utils/AuthUser";
import React, { useEffect, useState } from "react";
import {
	apiDeleteCategory,
	apiGetCategory,
} from "../../../services/CategoryApi";
import EditCategory from "../component/EditCategory";

const CategoryData = ({ render }) => {
	const { user } = AuthUser();
	const [err, setErr] = useState(null);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	const [searchValue, setSearchValue] = useState("");
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 5,
		total: 0,
	});
	const [editModalVisible, setEditModalVisible] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			let params = {
				page: pagination.current,
				limit: pagination.pageSize,
				search: searchValue,
				user_id: user?.data?.id,
			};
			const response = await apiGetCategory(params);
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

	useEffect(() => {
		fetchData(pagination);
	}, [pagination.current, pagination.pageSize, searchValue]);

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

	const handleEdit = (record) => {
		setSelectedRow(record);
		setEditModalVisible(true);
	};

	const handleDelete = (record) => {
		Swal.fire({
			title: "Konfirmasi Hapus",
			text: `Anda Ingin Hapus Kategori ${record?.category_name}?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Hapus!",
			cancelButtonText: "Batal",
			reverseButtons: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			width: "400px",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteCategory(record);
			}
		});
	};

	const deleteCategory = async (record) => {
		try {
			const data = await apiDeleteCategory(record.id);
			if (data.status === 200) {
				message.success(
					`Kategori ${record.category_name} berhasil dihapus`
				);
				fetchData();
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const columns = [
		{
			title: "Kategori",
			dataIndex: "category_name",
			key: "category_name",
			render: (category_name) => category_name,
		},
		{
			title: "Tipe Kategori",
			dataIndex: "category_type",
			key: "category_type",
			render: (category_type) => {
				let color = "";
				let displayText = category_type;
				if (category_type === "Expense") {
					color = "#bf3952";
					displayText = "Pengeluaran";
				} else if (category_type === "Income") {
					color = "#3b82f6";
					displayText = "Pemasukan";
				}
				return <Badge text={displayText} color={color} />;
			},
		},
		{
			title: "Aksi",
			render: (_, record) => (
				<span className="flex justify-center">
					<Button
						onClick={() => handleEdit(record)}
						type="file"
						className="file:py-2 file:px-4 file:rounded-full file:text-sm file:font-semibold file:bg-transparent file:text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 mt-3"
					>
						Edit
					</Button>
					<span className="m-1" />
					<Button
						onClick={() => handleDelete(record)}
						type="file"
						className="file:py-2 file:px-4 file:rounded-full file:text-sm file:font-semibold file:bg-transparent file:text-red-500 border border-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 mt-3"
					>
						Delete
					</Button>
				</span>
			),
		},
	];

	return (
		<>
			{editModalVisible && (
				<EditCategory
					visible={editModalVisible}
					onCancel={() => setEditModalVisible(false)}
					user={user}
					fetchData={fetchData}
					initialValues={selectedRow}
				/>
			)}
			{render({
				err: err,
				data: data,
				columns: columns,
				loading: loading,
				pagination: pagination,
				searchValue: searchValue,
				handleSearchChange: handleSearchChange,
				handlePaginationChange: handlePaginationChange,
				selectedRow: selectedRow,
				fetchData: fetchData,
			})}
		</>
	);
};

export default CategoryData;

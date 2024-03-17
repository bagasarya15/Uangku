import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { apiCreateExpense } from "../../../services/ExpenseApi";
import { getSelectCategory } from "../../../services/CategoryApi";

const { Option } = Select;

const AddExpense = ({ visible, onCancel, user, fetchData, handleAlert }) => {
	const [categories, setCategories] = useState([]);
	const [form] = Form.useForm();

	const initialValues = {
		user_id: user?.data?.id,
		name: "",
		nominal: "",
		category_id: "",
		expense_datetime: "",
	};

	const onOk = () => {
		form.validateFields()
			.then((values) => {
				const nominalWithoutComma = values.nominal.replace(/,/g, "");
				handleOk({ ...values, nominal: nominalWithoutComma });
				form.resetFields();
			})
			.catch((errorInfo) => {
				console.log("Validation failed:", errorInfo);
			});
	};

	const handleOk = async (values) => {
		try {
			console.log(values, "OK");
			const data = await apiCreateExpense(values);
			if (data.status === 201) {
				fetchData();
				handleAlert(
					`Jenis pengeluaran ${values.name} berhasil ditambah`
				);
				onCancel();
			}
		} catch (error) {
			console.log("Error:", error);
		}
	};

	const handleCancel = () => {
		form.resetFields();
		onCancel();
	};

	const handleSelectCategory = async () => {
		try {
			const data = await getSelectCategory("Expense", user?.data.id);
			if (data.status === 200) {
				setCategories(data.records);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		handleSelectCategory();
	}, []);

	return (
		<Modal
			title="Tambah Pengeluaran"
			visible={visible}
			onOk={onOk}
			onCancel={handleCancel}
			footer={[
				<Button key="cancel" onClick={handleCancel}>
					Batal
				</Button>,
				<Button key="tambah" onClick={onOk}>
					Tambah
				</Button>,
			]}
		>
			<Form
				form={form}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				initialValues={initialValues}
			>
				<Form.Item
					label="Keterangan"
					name="name"
					rules={[
						{ required: true, message: "Keterangan wajib diisi" },
					]}
					autoComplete="off"
				>
					<Input.TextArea />
				</Form.Item>

				<Form.Item
					label="Tipe Kategori"
					name="category_id"
					rules={[
						{
							required: true,
							message: "Tipe Kategori wajib diisi",
						},
					]}
				>
					<Select
						showSearch
						placeholder="Pilih Kategori"
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.children
								.toLowerCase()
								.indexOf(input.toLowerCase()) >= 0
						}
					>
						{categories.map((category) => (
							<Option key={category.id} value={category.id}>
								{category.category_name}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label="Nominal"
					name="nominal"
					rules={[{ required: true, message: "Nominal wajib diisi" }]}
					autoComplete="off"
				>
					<Input
						onChange={(e) => {
							const { value } = e.target;
							const formattedValue = value
								.replace(/\D/g, "")
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							form.setFieldsValue({ nominal: formattedValue });
						}}
					/>
				</Form.Item>

				<Form.Item
					label="Tanggal"
					name="expense_datetime"
					rules={[
						{
							required: true,
							message: "Tanggal dan Jam wajib diisi",
						},
					]}
				>
					<Input type="datetime-local" />
				</Form.Item>

				<Form.Item name="user_id" style={{ display: "none" }}>
					<Input type="hidden" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddExpense;

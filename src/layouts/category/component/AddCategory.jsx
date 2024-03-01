import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { apiCreateCategory } from "../../../services/CategoryApi";

const { Option } = Select;

const AddCategory = ({ visible, onCancel, user, fetchData, handleAlert }) => {
	const [form] = Form.useForm();
	const initialValues = {
		user_id: user?.data?.id,
		category_name: "",
		category_type: "",
	};

	const onOk = () => {
		form.validateFields()
			.then((values) => {
				handleOk(values);
				form.resetFields();
			})
			.catch((errorInfo) => {
				console.log("Validation failed:", errorInfo);
			});
	};

	const handleOk = async (values) => {
		try {
			const data = await apiCreateCategory(values);
			if (data.status === 201) {
				console.log("Received values:", values);
				onCancel();
				fetchData();
				handleAlert(
					`Kategori ${values.category_name} berhasil ditambah`
				);
			}
		} catch (error) {
			if (error.data && error.data.status === 422) {
				setErr({ message: error.response.message });
			} else {
				console.log("Error:", error);
			}
		}
	};

	return (
		<Modal
			title="Tambah Kategori"
			visible={visible}
			onOk={handleOk}
			onCancel={onCancel}
			footer={[
				<Button key="cancel" onClick={onCancel}>
					Batal
				</Button>,
				<Button key="tambah" onClick={onOk}>
					Tambah
				</Button>,
			]}
		>
			<Form
				form={form}
				initialValues={initialValues}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
			>
				<Form.Item
					label="Nama Kategori"
					name="category_name"
					rules={[
						{
							required: true,
							message: "Nama Kategori wajib diisi",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Tipe Kategori"
					name="category_type"
					rules={[
						{
							required: true,
							message: "Tipe Kategori wajib diisi",
						},
					]}
				>
					<Select>
						<Option value="Expense">Pengeluaran</Option>
						<Option value="Income">Pemasukan</Option>
					</Select>
				</Form.Item>
				<Form.Item name="user_id" style={{ display: "none" }}>
					<Input type="hidden" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddCategory;

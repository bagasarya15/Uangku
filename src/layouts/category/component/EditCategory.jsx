import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const EditCategory = ({ visible, onCancel, initialValues }) => {
	const [form] = Form.useForm();

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
		console.log(values, "handle edit");
	};

	return (
		<Modal
			title="Edit Kategori"
			visible={visible}
			onOk={handleOk}
			onCancel={onCancel}
			footer={[
				<Button key="cancel" onClick={onCancel}>
					Batal
				</Button>,
				<Button key="tambah" onClick={onOk}>
					Edit
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
				<Form.Item name="id" style={{ display: "none" }}>
					<Input type="hidden" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditCategory;

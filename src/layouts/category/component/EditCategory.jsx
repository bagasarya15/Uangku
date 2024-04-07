import { Modal, Form, Input, Select, Button } from "antd";
import { apiUpdateCategory } from "../../../services/CategoryApi";

const { Option } = Select;

const EditCategory = ({
	visible,
	onCancel,
	initialValues,
	fetchData,
	handleAlert,
	handleAlertError,
}) => {
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
		try {
			const data = await apiUpdateCategory(values);
			if (data.status === 200) {
				console.log("Received values:", values);
				onCancel();
				fetchData();
				handleAlert(
					`Kategori ${values.category_name} berhasil diperbarui`
				);
			}
		} catch (error) {
			const {
				response: { data },
			} = error;
			if (data.status === 400) {
				handleAlertError(`Kategori ${values.category_name} sudah ada`);
			}
		}
	};

	const handleCancel = () => {
		form.resetFields();
		onCancel();
	};

	return (
		<Modal
			title="Edit Kategori"
			visible={visible}
			onOk={handleOk}
			onCancel={onCancel}
			footer={[
				<Button key="cancel" onClick={handleCancel}>
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

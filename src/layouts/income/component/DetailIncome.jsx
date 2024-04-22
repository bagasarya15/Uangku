import React from "react";
import { Modal, Descriptions } from "antd";
import dayjs from "dayjs";

const DetailIncome = ({ visible, onCancel, selectedRow }) => {
	return (
		<Modal
			title="Detail Pemasukan"
			visible={visible}
			onCancel={onCancel}
			footer={null}
		>
			<Descriptions bordered column={1}>
				<Descriptions.Item label="Keterangan">
					{selectedRow?.name}
				</Descriptions.Item>
				<Descriptions.Item label="Jenis Pengeluaran">
					{selectedRow?.category?.category_name}
				</Descriptions.Item>
				<Descriptions.Item label="Nominal">
					Rp. {Number(selectedRow?.nominal).toLocaleString()}
				</Descriptions.Item>
				<Descriptions.Item label="Tanggal">
					{dayjs(selectedRow?.income_datetime).format(
						"dddd, DD MMMM YYYY HH:mm"
					)}
				</Descriptions.Item>s
				{/* Add more details as needed */}
			</Descriptions>
		</Modal>
	);
};

export default DetailIncome;

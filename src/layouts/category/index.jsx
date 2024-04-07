import React, { useState } from "react";
import AuthUser from "../utils/AuthUser";
import { Button, Input, Table, message } from "antd";
import CategoryData from "./data/CategoryData";
import AddCategory from "./component/AddCategory";

const CategoryIndex = () => {
	const { user } = AuthUser();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<CategoryData
			render={(props) => (
				<div>
					<div
						style={{
							display: "flex",
							alignItems: "flex-end",
							justifyContent: "flex-end",
						}}
					>
						<Input
							placeholder="Search"
							onChange={props.handleSearchChange}
							onKeyDown={props.handleKeyDown}
							style={{
								width: "auto",
								marginRight: "8px",
								maxWidth: "200px",
								marginBottom: "7px",
							}}
						/>

						<Button
							style={{ marginBottom: "7px" }}
							onClick={showModal}
						>
							Tambah
						</Button>
					</div>

					<Table
						columns={props.columns.map((column) => ({
							...column,
							align: "center",
							render: (text, record) => (
								<div style={{ textAlign: "center" }}>
									{column.render
										? column.render(text, record)
										: text}
								</div>
							),
						}))}
						dataSource={props.data}
						loading={props.loading}
						pagination={{
							...props.pagination,
							onChange: props.handlePaginationChange,
							showSizeChanger: true,
							showTotal: (total, range) =>
								`${range[0]}-${range[1]} dari ${total} data`,
						}}
						locale={{
							emptyText: props.err ? props.err : "No data",
						}}
						scroll={{ x: "100%" }}
					/>

					<AddCategory
						visible={isModalVisible}
						onCancel={handleCancel}
						user={user}
						fetchData={props.fetchData}
						handleAlert={props.handleAlert}
						handleAlertError={props.handleAlertError}
					/>
				</div>
			)}
		/>
	);
};

export default CategoryIndex;

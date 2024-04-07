import React from "react";
import { Input, Table } from "antd";
import UserData from "./data/UserData";

const UserIndex = () => {
	return (
		<UserData
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
							value={props.searchValue}
							onChange={props.handleSearchChange}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									props.fetchData(props.searchValue);
								}
							}}
							style={{
								width: "auto",
								marginRight: "8px",
								// marginBottom: "10px",
								maxWidth: "200px",
							}}
						/>
						<Input
							type="button"
							value="Search"
							onClick={() => props.fetchData(props.searchValue)}
							style={{ width: "auto", marginRight: "8px" }}
						/>
					</div>

					<Table
						columns={props.columns}
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
						style={{ marginTop: "10px" }}
					/>
				</div>
			)}
		/>
	);
};

export default UserIndex;

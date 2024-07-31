import React from "react";
import { Input, Table } from "antd";
import UserData from "./data/UserData";

const UserIndex = ({ isDarkMode }) => {
  return (
    <UserData
      render={(props) => (
        <div className="p-4 rounded-md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              backgroundColor: isDarkMode ? "#1E1E2D" : "white",
              padding: 10,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              gap: 2,
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
              }}
            />
            {/* <Input
							type="button"
							value="Search"
							onClick={() => props.fetchData(props.searchValue)}
							style={{ width: "auto", marginRight: "8px" }}
						/> */}
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
          />
        </div>
      )}
    />
  );
};

export default UserIndex;

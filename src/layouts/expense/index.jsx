import React, { useState } from "react";
import AuthUser from "../utils/AuthUser";
import { Button, Input, Table, message } from "antd";
import ExpenseData from "./data/ExpenseData";
import AddExpense from "./component/AddExpense";

const ExpenseIndex = ({ isDarkMode }) => {
  const { user } = AuthUser();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <ExpenseData
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
                  marginRight: "8px",
                  marginBottom: "10px",
                  maxWidth: "200px",
                }}
              />
              <Input
                type="button"
                value="Search"
                onClick={() => props.fetchData(props.searchValue)}
                style={{
                  width: "auto",
                  marginRight: "8px",
                  marginBottom: "10px",
                }}
              />

              <Button
                style={{ width: "auto", marginBottom: "10px" }}
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {column.render ? column.render(text, record) : text}
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
              onRow={(record) => ({
                onClick: () => props.handleTableClick(record),
              })}
            />

            <AddExpense
              visible={isModalVisible}
              onCancel={handleCancel}
              user={user}
              fetchData={props.fetchData}
              handleAlert={props.handleAlert}
            />
          </div>
        )}
      />
    </div>
  );
};

export default ExpenseIndex;

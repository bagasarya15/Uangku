import React, { useState } from "react";
import AuthUser from "../utils/AuthUser";
import { Button, Input, Table } from "antd";
import CategoryData from "./data/CategoryData";
import AddCategory from "./component/AddCategory";

const CategoryIndex = ({ isDarkMode }) => {
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
        <div className={`p-4 rounded-md`}>
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
              onChange={props.handleSearchChange}
              onKeyDown={props.handleKeyDown}
              style={{
                width: "auto",
              }}
            />
            <Button onClick={showModal}>Tambah</Button>
          </div>

          <div
            style={{
              borderRadius: 0,
            }}
          >
            <Table
              columns={props.columns.map((column) => ({
                ...column,
                align: "center",
                render: (text, record) => (
                  <div style={{ textAlign: "center" }}>
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
            />
          </div>

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

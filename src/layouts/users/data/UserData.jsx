// UserData.js
import { Avatar, Space, Tooltip, Switch, message } from "antd";
import React, { useState, useEffect } from "react";
import UserImage from "../../../../public/assets/default.jpg";
import { apiGetUsers } from "../../../services/UsersApi";
import { activatedAccount } from "../../../services/AuthApi";

const UserData = ({ render }) => {
  const [err, setErr] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, searchValue]);

  const fetchData = async (search) => {
    setLoading(true);
    try {
      let params = {
        page: pagination.current,
        limit: pagination.pageSize,
        search: search,
      };
      const response = await apiGetUsers(params);
      if (response.status === 200) {
        setData(response.records);
        setPagination((prev) => ({
          ...prev,
          total: response.meta.total,
        }));
      }
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false);
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleToggleChange = async (checked, record) => {
    try {
      const params = {
        email: record.email,
        is_active: checked ? 1 : 0,
      };
      const response = await activatedAccount(params);
      if (response.status === 200) {
        message.success("Status updated successfully");
        fetchData();
      }
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "25%",
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
      render: (email) => (email ? email : "-"),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      width: "20%",
      render: (is_active, record) => (
        <Switch
          checked={is_active === 1}
          onChange={(checked) => handleToggleChange(checked, record)}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Space size={12}>
          <Tooltip
            title={
              <img
                src={image === "default.jpg" ? UserImage : image}
                alt="Profile"
                width={200}
              />
            }
            placement="right"
          >
            <Avatar
              width={40}
              src={image === "default.jpg" ? UserImage : image}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return render({
    err: err,
    data: data,
    columns: columns,
    loading: loading,
    pagination: pagination,
    searchValue: searchValue,
    fetchData: fetchData,
    handleSearchChange: handleSearchChange,
    handlePaginationChange: handlePaginationChange,
  });
};

export default UserData;

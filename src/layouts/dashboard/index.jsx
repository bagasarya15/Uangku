import AuthUser from "../utils/AuthUser";
import React, { useState, useEffect } from "react";
import {
  apiDashboard,
  apiFilterExpenseByCategory,
} from "../../services/DashboardApi";
import {
  IconArrowDown,
  IconArrowUp,
  IconTrendingUp,
} from "@tabler/icons-react";
import { DatePicker, Select } from "antd";
import { getSelectCategory } from "../../services/CategoryApi";

const { Option } = Select;

const DashboardIndex = ({ isDarkMode }) => {
  const { user } = AuthUser();
  const [data, setData] = useState([]);
  const [dataFilterExpense, setDataFilterExpense] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for filter expense by category
  const [startDateExpenseByCategory, setStartDateExpenseByCategory] =
    useState(null);
  const [endDateExpenseByCategory, setEndDateExpenseByCategory] =
    useState(null);

  // Fetch dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        user_id: user?.data?.id,
        start_date: startDate
          ? `${startDate.format("YYYY-MM-DD")} 00:00:00`
          : null,
        end_date: endDate ? `${endDate.format("YYYY-MM-DD")} 23:59:59` : null,
      };
      const response = await apiDashboard(params);
      if (response.status === 200) {
        setData(response.records);
      }
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false);
  };

  // Fetch categories
  const handleSelectCategory = async () => {
    try {
      const data = await getSelectCategory("Expense", user?.data.id);
      if (data.status === 200) {
        setCategories(data.records);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch expense data by category
  const fetchDataExpenseByCategory = async () => {
    setLoading(true);
    try {
      const params = {
        user_id: user?.data?.id,
        start_date: startDateExpenseByCategory
          ? `${startDateExpenseByCategory.format("YYYY-MM-DD")} 00:00:00`
          : null,
        end_date: endDateExpenseByCategory
          ? `${endDateExpenseByCategory.format("YYYY-MM-DD")} 23:59:59`
          : null,
        category_id: selectedCategory || null,
      };
      const response = await apiFilterExpenseByCategory(params);
      if (response.status === 200) {
        setDataFilterExpense(response.records);
      }
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    handleSelectCategory();
  }, [startDate, endDate]);

  useEffect(() => {
    fetchDataExpenseByCategory();
  }, [startDateExpenseByCategory, endDateExpenseByCategory, selectedCategory]);

  const incomeTotal = data?.incomeTotal || 0;
  const expenseTotal = data?.expenseTotal || 0;
  const differenceTotal = expenseTotal - incomeTotal;

  return (
    <div className="space-y-10">
      <div
        className={`${
          isDarkMode ? "bg-sideBarDarkColor" : "bg-white"
        } p-4 rounded-md`}
      >
        <div className="flex flex-col sm:flex-row mb-4">
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            className="border rounded-md mx-1 my-1 w-full sm:w-auto"
            placeholder="Tanggal Awal"
          />
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            className="border rounded-md mx-1 my-1 w-full sm:w-auto"
            placeholder="Tanggal Akhir"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card
            icon={<IconArrowUp size={24} strokeWidth={1.5} color="#fff" />}
            bgColor="bg-green-400"
            title="Pemasukan"
            subtitle="Total Pemasukan"
            amount={data?.incomeTotal || 0}
            isDarkMode={isDarkMode}
          />
          <Card
            icon={<IconArrowDown size={24} strokeWidth={1.5} color="#fff" />}
            bgColor="bg-red-400"
            title="Pengeluaran"
            subtitle="Total Pengeluaran"
            amount={data?.expenseTotal || 0}
            isExpense={true}
            isDarkMode={isDarkMode}
          />
          <Card
            icon={<IconTrendingUp size={24} strokeWidth={1.5} color="#fff" />}
            bgColor="bg-blue-400"
            title="Selisih"
            subtitle="Total Selisih"
            amount={Math.abs(differenceTotal || 0)}
            isNegative={incomeTotal < expenseTotal}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FilterExpenseCard
          isDarkMode={isDarkMode}
          startDate={startDateExpenseByCategory}
          setStartDate={setStartDateExpenseByCategory}
          endDate={endDateExpenseByCategory}
          setEndDate={setEndDateExpenseByCategory}
          amount={dataFilterExpense.expenseTotal}
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          isExpense={true} // New prop to indicate if it's an expense
        />
      </div>
    </div>
  );
};

const FilterExpenseCard = ({
  isDarkMode,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  amount,
  categories,
  setSelectedCategory,
  selectedCategory,
  isExpense,
}) => (
  <div
    className={`${
      isDarkMode ? "bg-sideBarDarkColor" : "bg-white"
    } p-4 rounded-md mb-5`}
  >
    <div className="flex flex-col sm:flex-row mb-4">
      <DatePicker
        value={startDate}
        onChange={(date) => setStartDate(date)}
        className="border rounded-md mx-1 my-1 w-full sm:w-auto"
        placeholder="Tanggal Awal"
      />
      <DatePicker
        value={endDate}
        onChange={(date) => setEndDate(date)}
        className="border rounded-md mx-1 my-1 w-full sm:w-auto"
        placeholder="Tanggal Akhir"
      />
      <Select
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
        className="border rounded-md mx-1 my-1 w-full sm:w-auto"
        placeholder="Pilih Kategori"
      >
        {categories.map((category) => (
          <Option key={category.id} value={category.id}>
            {category.category_name}
          </Option>
        ))}
      </Select>
    </div>

    <Card
      icon={<IconArrowDown size={24} strokeWidth={1.5} color="#fff" />}
      bgColor="bg-red-400"
      title="Pengeluaran"
      subtitle="Pengeluaran Per Kategori"
      amount={amount}
      isExpense={isExpense}
      isDarkMode={isDarkMode}
    />
  </div>
);

const Card = ({
  icon,
  bgColor,
  title,
  subtitle,
  amount,
  isNegative,
  isExpense,
  isDarkMode,
}) => {
  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);

    const [currency, number] = formattedAmount.split(/\s/);
    return `${currency} ${isNegative ? "-" : ""}${number}`;
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-backgroundDarkColor" : "bg-white shadow-lg"
      } p-6 rounded-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`mr-4 ${bgColor} rounded-full p-3`}>{icon}</div>
          <div>
            <p
              className={`${
                isDarkMode ? "bg-backgroundDarkColor" : "bg-white"
              } text-md font-semibold`}
            >
              {title}
            </p>
            <p
              className={`${
                isDarkMode ? "bg-backgroundDarkColor" : "bg-white"
              } text-xs mt-1`}
            >
              {subtitle}
            </p>
          </div>
        </div>
        <div>
          <p
            className={`text-xs font-bold ${
              isExpense
                ? "text-red-500"
                : isNegative
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {formatCurrency(amount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;

import AuthUser from "../utils/AuthUser";
import React, { useState, useEffect } from "react";
import { DatePicker, Button, Row, Col, Card } from "antd";
import { apiDashboard } from "../../services/DashboardApi";

const { RangePicker } = DatePicker;

const DashboardIndex = () => {
	const [totalTodayExpense, setTotalTodayExpense] = useState(0);
	const [totalMonthExpense, setTotalMonthExpense] = useState(0);
	const [totalFilteredExpense, setTotalFilteredExpense] = useState(0);
	const { user } = AuthUser();
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			let params = {
				user_id: user?.data?.id,
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

	console.log(data, "data");

	useEffect(() => {
		fetchData();
		fetchTotalExpenses();
	}, []);

	const fetchTotalExpenses = () => {
		// Call API to fetch total expenses for today, this month, and filtered
		// Set the fetched data to state variables: totalTodayExpense, totalMonthExpense, totalFilteredExpense
		// Example API call:
		// fetch("/api/total-expenses")
		//   .then((response) => response.json())
		//   .then((data) => {
		//     setTotalTodayExpense(data.totalTodayExpense);
		//     setTotalMonthExpense(data.totalMonthExpense);
		//     setTotalFilteredExpense(data.totalFilteredExpense);
		//   })
		//   .catch((error) => console.error("Error fetching total expenses:", error));
	};

	const handleDateRangeChange = (dates) => {
		// Handle date range change from the filter
		// Call API to fetch total expenses based on selected date range
		// Example API call:
		// const startDate = dates[0].format("YYYY-MM-DD");
		// const endDate = dates[1].format("YYYY-MM-DD");
		// fetch(`/api/total-expenses?startDate=${startDate}&endDate=${endDate}`)
		//   .then((response) => response.json())
		//   .then((data) => setTotalFilteredExpense(data.totalFilteredExpense))
		//   .catch((error) => console.error("Error fetching filtered expenses:", error));
	};

	return (
		<div style={{ padding: "20px" }}>
			<Row gutter={[16, 16]}>
				<Col span={8}>
					<Card title="Total Pengeluaran Hari Ini">
						<div>{totalTodayExpense}</div>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Total Pengeluaran Bulan Ini">
						<div>
							{new Intl.NumberFormat("id-ID", {
								style: "currency",
								currency: "IDR",
							}).format(data)}
						</div>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Total Pengeluaran by Filter">
						<RangePicker onChange={handleDateRangeChange} />
						<Button
							type="primary"
							style={{
								marginTop: "10px",
								backgroundColor: "#001529",
								borderColor: "#001529",
							}}
						>
							Filter
						</Button>
						<div style={{ marginTop: "10px" }}></div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default DashboardIndex;

import AuthUser from "../utils/AuthUser";
import React, { useState, useEffect } from "react";
import { apiDashboard } from "../../services/DashboardApi";
import {
	IconArrowDown,
	IconArrowUp,
	IconTrendingUp,
} from "@tabler/icons-react";
import { DatePicker } from "antd";

const DashboardIndex = () => {
	const { user } = AuthUser();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const fetchData = async () => {
		setLoading(true);
		try {
			let params = {
				user_id: user?.data?.id,
				start_date: startDate
					? `${startDate.format("YYYY-MM-DD")} 00:00:00`
					: null,
				end_date: endDate
					? `${endDate.format("YYYY-MM-DD")} 23:59:59`
					: null,
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

	const incomeTotal = data?.incomeTotal || 0;
	const expenseTotal = data?.expenseTotal || 0;
	const differenceTotal = expenseTotal - incomeTotal;

	useEffect(() => {
		fetchData();
	}, [startDate, endDate]);

	return (
		<div>
			<div className="flex flex-col sm:flex-row mb-4">
				{/* Inputan Tanggal Awal */}
				<div className="flex items-center mx-1 my-1">
					{/* <label htmlFor="start-date" className="mr-2">
						Tanggal Awal:
					</label> */}
					<DatePicker
						id="start-date"
						value={startDate}
						onChange={(date) => setStartDate(date)}
						className="border rounded-md"
						placeholder="Tanggal Awal"
					/>
				</div>
				{/* Inputan Tanggal Akhir */}
				<div className="flex items-center mx-1 y-1">
					{/* <label htmlFor="end-date" className="mr-2">
						Tanggal Akhir:
					</label> */}
					<DatePicker
						id="end-date"
						value={endDate}
						onChange={(date) => setEndDate(date)}
						className="border rounded-md"
						placeholder="Tanggal Akhir"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{/* Card Pemasukan */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="mr-4 bg-green-400 rounded-full p-3">
								{/* Icon untuk Pemasukan */}
								<IconArrowUp
									size={24}
									strokeWidth={1.5}
									color="#fff"
								/>
							</div>
							{/* Judul untuk Pemasukan */}
							<div>
								<p className="text-lg font-semibold text-gray-800">
									Pemasukan
								</p>
								<p className="text-sm text-gray-600">
									Total Pemasukan
								</p>
							</div>
						</div>
						{/* Nilai Pemasukan */}
						<div>
							<p className="text-1xl font-bold text-green-500">
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
								}).format(data?.incomeTotal)}
							</p>
						</div>
					</div>
				</div>

				{/* Card Pengeluaran */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="mr-4 bg-red-400 rounded-full p-3">
								{/* Icon untuk Pengeluaran */}
								<IconArrowDown
									size={24}
									strokeWidth={1.5}
									color="#fff"
								/>
							</div>
							{/* Judul untuk Pengeluaran */}
							<div>
								<p className="text-lg font-semibold text-gray-800">
									Pengeluaran
								</p>
								<p className="text-sm text-gray-600">
									Total Pengeluaran
								</p>
							</div>
						</div>
						{/* Nilai Pengeluaran */}
						<div>
							<p className="text-sm font-bold text-red-500">
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
								}).format(data?.expenseTotal)}
							</p>
						</div>
					</div>
				</div>

				{/* Card Selisih Total */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="mr-4 bg-blue-400 rounded-full p-3">
								{/* Icon untuk Pengeluaran */}
								<IconTrendingUp
									size={24}
									strokeWidth={1.5}
									color="#fff"
								/>
							</div>
							{/* Judul untuk Pengeluaran */}
							<div>
								<p className="text-lg font-semibold text-gray-800">
									Selisih
								</p>
								<p className="text-sm text-gray-600">
									Total Selisih
								</p>
							</div>
						</div>
						{/* Nilai Pengeluaran */}
						<div>
							<p className={`text-sm font-bold text-blue-500`}>
								{incomeTotal < expenseTotal ? "-" : ""}
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
								}).format(Math.abs(differenceTotal))}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardIndex;

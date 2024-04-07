import AuthUser from "../utils/AuthUser";
import React, { useState, useEffect } from "react";
import { apiDashboard } from "../../services/DashboardApi";
import { IconArrowDown, IconTrendingUp } from "@tabler/icons-react";

const DashboardIndex = () => {
	const { user } = AuthUser();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(null);

	const fetchData = async () => {
		setLoading(true);
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

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{/* Card Pemasukan */}
			<div className="bg-white rounded-lg shadow-lg p-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<div className="mr-4 bg-green-400 rounded-full p-3">
							{/* Icon untuk Pemasukan */}
							<IconTrendingUp
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
						<p className="text-4xl font-bold text-gray-800">-</p>
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
						<p className="text-sm font-bold text-gray-800">
							{new Intl.NumberFormat("id-ID", {
								style: "currency",
								currency: "IDR",
							}).format(data)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardIndex;

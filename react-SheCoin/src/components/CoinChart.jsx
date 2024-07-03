import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	PointElement,
	Filler,
} from "chart.js";

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	Filler,
	PointElement
);

const PriceLineChart = ({ percentChangeData }) => {
	const data = {
		labels: percentChangeData.map((entry) => entry.period), // Dates for the x-axis
		datasets: [
			{
				label: "Price Change",
				data: percentChangeData.map((entry) => entry.percentChange), // Prices for the y-axis
				borderColor: "rgb(127, 124, 175)",
				backgroundColor: "rgb(159, 183, 152, 0.2)",
				fill: false,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Price Change Over Last 3 months",
			},
		},

		scales: {
			x: {
				title: {
					display: true,
				},
			},
			y: {
				title: {
					display: true,
					text: "Price Change (%)",
				},
			},
		},
	};

	return <Line data={data} options={options} />;
};

export default PriceLineChart;

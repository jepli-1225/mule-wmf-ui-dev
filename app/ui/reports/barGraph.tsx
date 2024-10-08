"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarGraphProps {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default BarGraph;

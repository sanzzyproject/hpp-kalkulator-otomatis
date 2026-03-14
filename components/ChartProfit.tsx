'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  labaBulanan: number;
}

export default function ChartProfit({ labaBulanan }: Props) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const kondisiRame = days.map(day => labaBulanan * (0.5 + 0.5 * Math.sin(day / 5)));
  const target = days.map(() => labaBulanan);
  const kondisiSepi = days.map(day => labaBulanan * (0.3 + 0.2 * Math.cos(day / 3)));

  const data = {
    labels: days.map(d => `Hari ${d}`),
    datasets: [
      {
        label: 'Kondisi Rame',
        data: kondisiRame,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Target',
        data: target,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderDash: [5, 5],
        tension: 0.4,
      },
      {
        label: 'Kondisi Sepi',
        data: kondisiSepi,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Proyeksi Laba 30 Hari' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value: any) => 'Rp ' + value.toLocaleString() },
      },
    },
  };

  return <Line data={data} options={options} />;
}

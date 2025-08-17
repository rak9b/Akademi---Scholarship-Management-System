import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../api/axiosSecure';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AnalyticsChart() {
  const { data } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => (await axiosSecure.get('/analytics')).data
  });
  const labels = data?.labels || [];
  const values = data?.values || [];
  const cfg = { labels, datasets: [{ label: 'Applications', data: values, backgroundColor: '#1E40AF' }] };
  return <Bar data={cfg} />;
}

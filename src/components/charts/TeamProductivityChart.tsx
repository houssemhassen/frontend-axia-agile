
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import ChartWrapper from './ChartWrapper';

interface TeamProductivityChartProps {
  className?: string;
  height?: string | number;
  title?: string;
  description?: string;
}

const TeamProductivityChart = ({
  className,
  height = 300,
  title = "Team Productivity",
  description = "Completed tasks vs. estimated capacity"
}: TeamProductivityChartProps) => {
  const [data, setData] = useState([
    { name: 'Week 1', completed: 32, estimated: 40 },
    { name: 'Week 2', completed: 38, estimated: 35 },
    { name: 'Week 3', completed: 42, estimated: 45 },
    { name: 'Week 4', completed: 51, estimated: 50 },
  ]);

  // Simulate data loading to fix the chart rendering issue
  useEffect(() => {
    // This ensures the chart re-renders properly after component mount
    const timer = setTimeout(() => {
      setData([...data]);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ChartWrapper 
      title={title} 
      description={description}
      className={className}
      height={height}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ccc' }} />
          <Legend />
          <Bar dataKey="completed" name="Tasks Completed" fill="#8884d8" />
          <Bar dataKey="estimated" name="Estimated Capacity" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default TeamProductivityChart;

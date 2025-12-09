
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SprintBurndownChart = () => {
  // Sample burndown data
  const data = [
    { day: 'Day 1', remaining: 100, ideal: 100 },
    { day: 'Day 2', remaining: 95, ideal: 90 },
    { day: 'Day 3', remaining: 88, ideal: 80 },
    { day: 'Day 4', remaining: 82, ideal: 70 },
    { day: 'Day 5', remaining: 72, ideal: 60 },
    { day: 'Day 6', remaining: 68, ideal: 50 },
    { day: 'Day 7', remaining: 55, ideal: 40 },
    { day: 'Day 8', remaining: 42, ideal: 30 },
    { day: 'Day 9', remaining: 30, ideal: 20 },
    { day: 'Day 10', remaining: 15, ideal: 10 },
    { day: 'Day 11', remaining: 0, ideal: 0 },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="remaining"
            stroke="#8884d8"
            name="Actual Work"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ideal"
            stroke="#82ca9d"
            name="Ideal Burndown"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SprintBurndownChart;

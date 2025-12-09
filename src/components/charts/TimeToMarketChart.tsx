
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

import ChartWrapper from './ChartWrapper';

const data = [
  { name: 'Jan', time: 18, average: 20 },
  { name: 'Feb', time: 16, average: 19 },
  { name: 'Mar', time: 15, average: 18 },
  { name: 'Apr', time: 14, average: 17 },
  { name: 'May', time: 12, average: 16 },
  { name: 'Jun', time: 10, average: 15 },
];

const TimeToMarketChart = () => {
  return (
    <ChartWrapper 
      title="Time to Market Trend" 
      height={350}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="time" name="Feature Delivery Time" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="average" name="Industry Average" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default TimeToMarketChart;

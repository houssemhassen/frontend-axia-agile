
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

import ChartWrapper from './ChartWrapper';

const data = [
  { name: 'Jan', value: 65, target: 60 },
  { name: 'Feb', value: 59, target: 65 },
  { name: 'Mar', value: 70, target: 70 },
  { name: 'Apr', value: 85, target: 75 },
  { name: 'May', value: 78, target: 80 },
  { name: 'Jun', value: 90, target: 85 },
];

const ValueDeliveryChart = () => {
  return (
    <ChartWrapper 
      title="Feature Value Delivery Trend" 
      height={350}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Actual Value" fill="#8884d8" />
          <Bar dataKey="target" name="Target Value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default ValueDeliveryChart;

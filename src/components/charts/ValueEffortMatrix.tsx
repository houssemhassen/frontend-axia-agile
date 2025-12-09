
import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ZAxis,
  Legend,
  ReferenceLine
} from 'recharts';

import ChartWrapper from './ChartWrapper';

const data = [
  { name: 'Auth System', x: 90, y: 50, z: 95 },
  { name: 'Dashboard', x: 65, y: 75, z: 65 },
  { name: 'Email Notif.', x: 80, y: 25, z: 80 },
  { name: 'Search', x: 80, y: 30, z: 80 },
  { name: 'Shopping Cart', x: 90, y: 36, z: 90 },
  { name: 'Password Reset', x: 75, y: 25, z: 75 },
  { name: 'Order Tracking', x: 85, y: 30, z: 85 },
  { name: 'Dark Mode', x: 60, y: 50, z: 60 },
  { name: 'CSV Export', x: 55, y: 50, z: 55 },
  { name: 'Print', x: 45, y: 32, z: 45 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border rounded shadow">
        <p className="font-medium">{payload[0].payload.name}</p>
        <p>Value: {payload[0].payload.x}</p>
        <p>Effort: {payload[0].payload.y}</p>
        <p>ROI: {(payload[0].payload.x / payload[0].payload.y).toFixed(2)}</p>
      </div>
    );
  }

  return null;
};

const ValueEffortMatrix = () => {
  return (
    <ChartWrapper 
      title="Value/Effort Matrix" 
      description="Higher value with lower effort is ideal (top-left quadrant)"
      height={350}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="y" 
            name="Effort" 
            domain={[0, 100]} 
            label={{ value: 'Effort', position: 'bottom' }}
          />
          <YAxis 
            type="number" 
            dataKey="x" 
            name="Value" 
            domain={[0, 100]} 
            label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 400]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={50} stroke="#666" strokeDasharray="3 3" />
          <ReferenceLine x={50} stroke="#666" strokeDasharray="3 3" />
          <Scatter name="Features" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default ValueEffortMatrix;

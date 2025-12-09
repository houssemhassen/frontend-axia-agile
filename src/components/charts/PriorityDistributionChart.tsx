
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import ChartWrapper from './ChartWrapper';

export interface PriorityDistributionProps {
  title?: string;
  description?: string;
  height?: string | number;
  showDetailedTooltips?: boolean;
}

const data = [
  { name: 'Highest', value: 15, color: '#FF5252' },
  { name: 'High', value: 25, color: '#FF9800' },
  { name: 'Medium', value: 35, color: '#FFC107' },
  { name: 'Low', value: 20, color: '#2196F3' },
  { name: 'Lowest', value: 5, color: '#9E9E9E' },
];

const renderActiveShape = (props: any) => {
  const { 
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, 
    payload, percent, value 
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy} textAnchor="middle" fill="#333">
        {`${value} items`}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#999">
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const PriorityDistributionChart: React.FC<PriorityDistributionProps> = ({ 
  title = "Priority Distribution", 
  description,
  height = 350,
  showDetailedTooltips = false 
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <ChartWrapper 
      title={title}
      description={description} 
      height={height}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={!showDetailedTooltips}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={!showDetailedTooltips ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` : false}
            activeIndex={showDetailedTooltips ? activeIndex : undefined}
            activeShape={showDetailedTooltips ? renderActiveShape : undefined}
            onMouseEnter={showDetailedTooltips ? onPieEnter : undefined}
            onMouseLeave={showDetailedTooltips ? onPieLeave : undefined}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} items (${((value as number) / 100 * 100).toFixed(0)}%)`, 'Priority Items']} 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 border rounded shadow-sm">
                    <p className="font-medium">{payload[0].name}</p>
                    <p className="text-sm text-gray-600">{`${payload[0].value} items`}</p>
                    <p className="text-xs text-gray-500">{`(${((payload[0].value as number) / 100 * 100).toFixed(0)}%)`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default PriorityDistributionChart;

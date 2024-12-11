"use client";

import { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { CHART_COLORS } from '@/constants/theme';

const baseData = [
  {
    year: '2023',
    planScope1: 30,
    planScope2: 50,
    planScope3: 200,
    actualScope1: 35,
    actualScope2: 45,
    actualScope3: 190,
    reductionRate: 2.2,
  },
  {
    year: '2024',
    planScope1: 28,
    planScope2: 48,
    planScope3: 190,
    actualScope1: 32,
    actualScope2: 43,
    actualScope3: 185,
    reductionRate: 3.3,
  },
  {
    year: '2025',
    planScope1: 26,
    planScope2: 46,
    planScope3: 180,
    actualScope1: 30,
    actualScope2: 41,
    actualScope3: 180,
    reductionRate: 4.1,
  },
  {
    year: '2026',
    planScope1: 24,
    planScope2: 44,
    planScope3: 170,
    actualScope1: 28,
    actualScope2: 39,
    actualScope3: 175,
    reductionRate: 5.0,
  }
];

// Calculate cumulative values
const data = baseData.reduce((acc, yearData) => {
  const prevData = acc[acc.length - 1];
  
  const cumulativeData = {
    ...yearData,
    planScope1: (prevData?.planScope1 || 0) + yearData.planScope1,
    planScope2: (prevData?.planScope2 || 0) + yearData.planScope2,
    planScope3: (prevData?.planScope3 || 0) + yearData.planScope3,
    actualScope1: (prevData?.actualScope1 || 0) + yearData.actualScope1,
    actualScope2: (prevData?.actualScope2 || 0) + yearData.actualScope2,
    actualScope3: (prevData?.actualScope3 || 0) + yearData.actualScope3,
    reductionRate: (prevData?.reductionRate || 0) + yearData.reductionRate,
  };
  
  return [...acc, cumulativeData];
}, [] as typeof baseData);

const formatReductionRate = (value: number) => `-${value.toFixed(1)}%`;

const CustomizedLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <g>
      <rect
        x={x - 30} // Increased width by moving left edge
        y={y - 25} // Adjusted position to be closer to the point
        width={60} // Increased width for more padding
        height={20}
        fill="#38B6FF"
        rx={4}
      />
      <text
        x={x}
        y={y - 15} // Adjusted to match new rectangle position
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        className="font-bold text-sm"
      >
        {formatReductionRate(value)}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow">
        <p className="font-bold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.name === "Reduction Rate" 
              ? formatReductionRate(entry.value)
              : entry.value.toFixed(1)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const EmissionsChart: FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">CO2 Emissions Overview</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year"
              tick={{ fill: '#000000' }}
            />
            <YAxis yAxisId="left" />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tickFormatter={formatReductionRate}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="planScope1" stackId="plan" fill={CHART_COLORS.planScope1} name="Plan Scope 1" />
            <Bar yAxisId="left" dataKey="planScope2" stackId="plan" fill={CHART_COLORS.planScope2} name="Plan Scope 2" />
            <Bar yAxisId="left" dataKey="planScope3" stackId="plan" fill={CHART_COLORS.planScope3} name="Plan Scope 3" />
            <Bar yAxisId="left" dataKey="actualScope1" stackId="actual" fill={CHART_COLORS.actualScope1} name="Actual Scope 1" />
            <Bar yAxisId="left" dataKey="actualScope2" stackId="actual" fill={CHART_COLORS.actualScope2} name="Actual Scope 2" />
            <Bar yAxisId="left" dataKey="actualScope3" stackId="actual" fill={CHART_COLORS.actualScope3} name="Actual Scope 3" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="reductionRate"
              stroke="#38B6FF"
              name="Reduction Rate"
              strokeWidth={3}
              label={<CustomizedLabel />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionsChart;
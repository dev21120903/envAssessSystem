"use client";

import { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector } from 'recharts';
import { SCOPE_COLORS } from '@/constants/theme';

const data = [
  { name: 'Scope 1', value: 123.4, percentage: 9.2, color: SCOPE_COLORS.scope1 },
  { name: 'Scope 2', value: 234.5, percentage: 17.4, color: SCOPE_COLORS.scope2 },
  { name: 'Scope 3', value: 987.6, percentage: 73.4, color: SCOPE_COLORS.scope3 },
];

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, percentage, color }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="middle"
      className="text-sm font-medium"
    >
      {value.toLocaleString()} ({percentage}%)
    </text>
  );
};

const GHGDonutChart: FC = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">GHG Category</h2>
      <div className="h-[400px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={5}
              dataKey="value"
              label={CustomLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-sm text-gray-900">Total</div>
          <div className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</div>
          <div className="text-sm text-gray-900">t-CO2</div>
        </div>
      </div>
    </div>
  );
};

export default GHGDonutChart;
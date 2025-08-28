'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface LabReport {
  id: string;
  testName: string;
  value: string;
  units: string;
  normalRange: string;
  aiExplanation: {
    explanation: string;
    whatItMeasures: string;
    whatItMeans: string;
    suggestedQuestions: string[];
  };
  createdAt: any;
}

interface LabResultsChartProps {
  reports: LabReport[];
}

export function LabResultsChart({ reports }: LabResultsChartProps) {
  // Process data for charting
  const chartData = reports
    .map((report) => {
      const numericValue = parseFloat(report.value);
      if (isNaN(numericValue)) return null;
      
      return {
        date: new Date(report.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        value: numericValue,
        testName: report.testName,
        units: report.units,
        normalRange: report.normalRange,
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(a!.date).getTime() - new Date(b!.date).getTime());

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No numeric data available for charting</p>
      </div>
    );
  }

  // Get unique test names for multiple lines
  const uniqueTests = [...new Set(chartData.map(item => item!.testName))];

  // Create separate data series for each test
  const seriesData = uniqueTests.map(testName => {
    const testData = chartData
      .filter(item => item!.testName === testName)
      .map(item => ({
        date: item!.date,
        value: item!.value,
        testName: item!.testName,
      }));
    
    return {
      testName,
      data: testData,
    };
  });

  // For single test, use line chart; for multiple tests, use area chart
  if (uniqueTests.length === 1) {
    const data = chartData.map(item => ({
      date: item!.date,
      value: item!.value,
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            label={{ 
              value: `${uniqueTests[0]} (${chartData[0]?.units})`, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ fontWeight: 'bold', color: '#374151' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // Multiple tests - use area chart
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          labelStyle={{ fontWeight: 'bold', color: '#374151' }}
        />
        {uniqueTests.map((testName, index) => {
          const colors = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
          const color = colors[index % colors.length];
          
          return (
            <Area
              key={testName}
              type="monotone"
              dataKey="value"
              data={chartData.filter(item => item!.testName === testName)}
              stroke={color}
              fill={color}
              fillOpacity={0.1}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: color, strokeWidth: 2 }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}

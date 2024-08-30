import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailyExpenseBreakdownChart = ({ dailyExpenses }) => {
  const dates = Object.keys(dailyExpenses);
  const salaries = dates.map(date => dailyExpenses[date]?.salaries || 0);
  const materials = dates.map(date => dailyExpenses[date]?.materials || 0);
  const rent = dates.map(date => dailyExpenses[date]?.rent || 0);
  const maintenance = dates.map(date => dailyExpenses[date]?.maintenance || 0);

  const data = {
    labels: ['Salaries', 'Materials', 'Rent', 'Maintenance'],
    datasets: [
      {
        data: [
          salaries.reduce((a, b) => a + b, 0),
          materials.reduce((a, b) => a + b, 0),
          rent.reduce((a, b) => a + b, 0),
          maintenance.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED'],
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: $${value}`;
          }
        }
      }
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  };

  return <PolarArea data={data} options={options} />;
};

export default DailyExpenseBreakdownChart;

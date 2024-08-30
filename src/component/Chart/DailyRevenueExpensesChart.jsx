import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyRevenueExpensesChart = ({ dailyRevenue, dailyExpenses }) => {
  const dates = Object.keys(dailyRevenue);
  const revenueData = dates.map(date => dailyRevenue[date]?.amount || 0);
  const expensesData = dates.map(date => {
    const expense = dailyExpenses[date] || {};
    return (expense.salaries || 0) + (expense.materials || 0) + (expense.rent || 0) + (expense.maintenance || 0);
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: expensesData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: $${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount'
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default DailyRevenueExpensesChart;

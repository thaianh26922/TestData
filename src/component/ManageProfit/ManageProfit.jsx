import React, { useState } from 'react';
import DailyRevenueExpensesChart from '../Chart/DailyRevenueExpensesChart';
import DailyExpenseBreakdownChart from '../Chart/DailyExpenseBreakdownChart';
import { Table, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import { dailyData } from '../../data/revenue';

const ManageProfit = () => {
  const [filteredDate, setFilteredDate] = useState(null);

  
  const calculateDailyTotals = (data) => {
    const dailyRevenue = data.revenue.reduce((acc, record) => {
      acc[record.date] = acc[record.date] || { amount: 0, description: record.description };
      acc[record.date].amount += record.amount;
      return acc;
    }, {});

    const dailyExpenses = data.expenses.reduce((acc, record) => {
      acc[record.date] = acc[record.date] || { salaries: 0, materials: 0, rent: 0, maintenance: 0, description: record.description };
      acc[record.date].salaries += record.salaries;
      acc[record.date].materials += record.materials;
      acc[record.date].rent += record.rent;
      acc[record.date].maintenance += record.maintenance;
      return acc;
    }, {});

    return { dailyRevenue, dailyExpenses };
  };

  const { dailyRevenue, dailyExpenses } = calculateDailyTotals(dailyData);
  const totalRevenue = Object.values(dailyRevenue).reduce((acc, record) => acc + (record.amount || 0), 0);
  const totalExpenses = Object.values(dailyExpenses).reduce((acc, record) => {
    return acc + (record.salaries || 0) + (record.materials || 0) + (record.rent || 0) + (record.maintenance || 0);
  }, 0);
  const profitLoss = totalRevenue - totalExpenses;

  // Filter records based on selected date
  const filteredRevenue = filteredDate ? dailyData.revenue.filter(record => record.date === filteredDate.format('YYYY-MM-DD')) : dailyData.revenue;
  const filteredExpenses = filteredDate ? dailyData.expenses.filter(record => record.date === filteredDate.format('YYYY-MM-DD')) : dailyData.expenses;

  const mergedData = Object.keys(dailyRevenue).map(date => ({
    date,
    amount: dailyRevenue[date]?.amount || 0,
    revenueDescription: dailyRevenue[date]?.description || '',
    salaries: dailyExpenses[date]?.salaries || 0,
    materials: dailyExpenses[date]?.materials || 0,
    rent: dailyExpenses[date]?.rent || 0,
    maintenance: dailyExpenses[date]?.maintenance || 0,
    expenseDescription: dailyExpenses[date]?.description || '',
  }));

  return (
    <div className='container-website' style={{ padding: '2%' }}>
      <h2>Financial Dashboard</h2>
      
      <div style={{ marginBottom: 16 }}>
        <DatePicker onChange={date => setFilteredDate(date)} />
        <Button onClick={() => setFilteredDate(null)} style={{ marginLeft: 8 }}>Clear Filter</Button>
      </div>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12} style={{ padding: '0 2%' }}>
          <DailyRevenueExpensesChart dailyRevenue={dailyRevenue} dailyExpenses={dailyExpenses} />
        </Col>
        <Col span={12} style={{ padding: '0 2%' }}>
          <DailyExpenseBreakdownChart dailyExpenses={filteredExpenses} />
        </Col>
      </Row>
      
      <div>
        <h3>Profit/Loss</h3>
        <p>Profit/Loss: {isNaN(profitLoss) ? 'Data is insufficient for calculation' : (profitLoss >= 0 ? `Profit: $${profitLoss}` : `Loss: $${Math.abs(profitLoss)}`)}</p>
        <p>Total Expenses: ${totalExpenses}</p>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <h3>Daily Financial Data</h3>
        <Table
          dataSource={mergedData}
          rowKey="date"
          pagination={{ pageSize: 5 }} // Set pagination to show 5 records per page
          columns={[
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Revenue', dataIndex: 'amount', key: 'amount', render: amount => `$${amount}` },
            { title: 'Revenue Description', dataIndex: 'revenueDescription', key: 'revenueDescription' },
            { title: 'Salaries', dataIndex: 'salaries', key: 'salaries', render: salaries => `$${salaries}` },
            { title: 'Materials', dataIndex: 'materials', key: 'materials', render: materials => `$${materials}` },
            { title: 'Rent', dataIndex: 'rent', key: 'rent', render: rent => `$${rent}` },
            { title: 'Maintenance', dataIndex: 'maintenance', key: 'maintenance', render: maintenance => `$${maintenance}` },
            { title: 'Expense Description', dataIndex: 'expenseDescription', key: 'expenseDescription' },
          ]}
        />
      </div>
    </div>
  );
};

export default ManageProfit;

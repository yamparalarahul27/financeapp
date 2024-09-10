import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getFinanceData } from '../localStorageService';

function Dashboard() {
  const [finances, setFinances] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const data = getFinanceData();
    setFinances(data);
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setSettings(savedSettings);
  }, []);

  const getCurrencySymbol = (currency) => {
    switch(currency) {
      case 'USD': return '$';
      case 'INR': return '₹';
      case 'USDC': return '₿'; // Using Bitcoin symbol as a placeholder for USDC
      case 'SOL': return 'SOL ';
      default: return '';
    }
  };

  const getCurrencyDisplay = (amount, currency) => {
    if (settings.currencyDisplay === 'code') {
      return `${amount.toFixed(2)} ${currency}`;
    } else {
      return `${getCurrencySymbol(currency)}${amount.toFixed(2)}`;
    }
  };

  const totalIncome = finances
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = finances
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div className="dashboard">
      <h2>Financial Dashboard</h2>
      <div className="summary">
        <div className="total-income">
          <h3>Total Income</h3>
          <p>{getCurrencyDisplay(totalIncome, finances[0]?.currency || 'USD')}</p>
        </div>
        <div className="total-expenses">
          <h3>Total Expenses</h3>
          <p>{getCurrencyDisplay(totalExpenses, finances[0]?.currency || 'USD')}</p>
        </div>
        <div className="balance">
          <h3>Balance</h3>
          <p className={balance >= 0 ? 'positive' : 'negative'}>
            {getCurrencyDisplay(Math.abs(balance), finances[0]?.currency || 'USD')}
            {balance < 0 ? ' (Deficit)' : ''}
          </p>
        </div>
      </div>
      <div className="chart-container">
        <h3>Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${finances.length > 0 ? getCurrencyDisplay(finances[0].amount, finances[0].currency) : '$'}${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;

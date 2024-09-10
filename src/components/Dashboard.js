import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getFinanceData } from '../localStorageService';

function Dashboard() {
  const [finances, setFinances] = React.useState([]);
  const [taxSettings, setTaxSettings] = React.useState({ rate: 0, method: 'inclusive' });

  React.useEffect(() => {
    const data = getFinanceData();
    setFinances(data);
    const settings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setTaxSettings({ rate: settings.taxRate || 0, method: settings.taxMethod || 'inclusive' });
  }, []);

  const totalIncome = finances
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = finances
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  const calculateTotalTax = () => {
    return finances
      .filter(item => item.type === 'income')
      .reduce((sum, item) => {
        if (taxSettings.method === 'inclusive') {
          return sum + (item.amount * taxSettings.rate) / (100 + taxSettings.rate);
        } else {
          return sum + (item.amount * taxSettings.rate) / 100;
        }
      }, 0);
  };

  const totalTax = calculateTotalTax();

  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses },
    { name: 'Tax', value: totalTax },
  ];

  const COLORS = ['#2ABB7F', '#F15B50', '#3366cc'];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Financial Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Income
              </Typography>
              <Typography variant="h4" color="#2ABB7F">
                ${totalIncome.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Expenses
              </Typography>
              <Typography variant="h4" color="#F15B50">
                ${totalExpenses.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Balance
              </Typography>
              <Typography variant="h4" color={balance >= 0 ? "#2ABB7F" : "#F15B50"}>
                ${Math.abs(balance).toFixed(2)}
                {balance < 0 ? ' (Deficit)' : ''}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Tax
              </Typography>
              <Typography variant="h4" color="#3366cc">
                ${totalTax.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Income vs Expenses vs Tax
            </Typography>
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
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { getFinanceData } from '../localStorageService';

function Sheet() {
  const [finances, setFinances] = useState([]);

  useEffect(() => {
    const data = getFinanceData();
    setFinances(data);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const capitalizeType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="sheet">
      <h3>All Transactions</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {finances.map((finance, index) => (
            <tr key={index} className={finance.type}>
              <td>{formatDate(finance.date)}</td>
              <td>{capitalizeType(finance.type)}</td>
              <td>{finance.description}</td>
              <td>
                {getCurrencySymbol(finance.currency)}
                {finance.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sheet;

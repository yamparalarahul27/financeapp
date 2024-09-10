import React, { useState, useEffect } from 'react';
import { getFinanceData } from '../localStorageService';

function Sheet() {
  const [finances, setFinances] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getFinanceData();
    setFinances(data);
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setSettings(savedSettings);
  };

  const deleteTransaction = (index) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const updatedFinances = finances.filter((_, i) => i !== index);
      localStorage.setItem('financeData', JSON.stringify(updatedFinances));
      loadData();
    }
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: settings.dateFormat === 'MMDDYYYY' ? 'numeric' : 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {finances.map((finance, index) => (
            <tr key={index} className={finance.type}>
              <td>{formatDate(finance.date)}</td>
              <td>{capitalizeType(finance.type)}</td>
              <td>{finance.description}</td>
              <td>{getCurrencyDisplay(finance.amount, finance.currency)}</td>
              <td>
                <button onClick={() => deleteTransaction(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sheet;

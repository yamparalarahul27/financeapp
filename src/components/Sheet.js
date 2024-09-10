import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFinanceData } from '../localStorageService';
import DeleteIcon from '@mui/icons-material/Delete';

function Sheet({ openModal, onNotification }) {
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
      onNotification('Transaction deleted successfully', 'info');
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
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // This will give us the 3-letter abbreviation
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const capitalizeType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="sheet">
      <h3>All Transactions</h3>
      <div className="action-buttons">
        <button onClick={() => openModal('income')}>Add Income</button>
        <button onClick={() => openModal('expense')}>Add Expense</button>
      </div>
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
            <tr key={index}>
              <td>{formatDate(finance.date)}</td>
              <td>{capitalizeType(finance.type)}</td>
              <td>{finance.description}</td>
              <td className={`amount ${finance.type}`}>
                {getCurrencyDisplay(finance.amount, finance.currency)}
              </td>
              <td>
                <button 
                  className="delete-button"
                  onClick={() => deleteTransaction(index)}
                  aria-label="Delete transaction"
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Sheet.propTypes = {
  openModal: PropTypes.func.isRequired,
  onNotification: PropTypes.func.isRequired
};

export default Sheet;

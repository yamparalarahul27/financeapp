import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { saveFinanceData } from '../localStorageService';

function FinanceForm({ type, onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }

    const newEntry = {
      type,
      amount: parseFloat(amount),
      description: description.trim(),
      currency,
      date: new Date().toISOString()
    };

    saveFinanceData(newEntry);
    onSuccess(`New ${type} entry added successfully`); // Make sure this line is here
    setAmount('');
    setDescription('');
    onClose();
  };

  const getCurrencySymbol = (currencyCode) => {
    switch(currencyCode) {
      case 'USD': return '$';
      case 'INR': return '₹';
      case 'USDC': return '₿'; // Using Bitcoin symbol as a placeholder for USDC
      case 'SOL': return 'SOL ';
      default: return '';
    }
  };

  return (
    <div className="finance-form">
      <h2>Add {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Currency:
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">Dollar (USD) {getCurrencySymbol('USD')}</option>
              <option value="INR">Indian Rupee (INR) {getCurrencySymbol('INR')}</option>
              <option value="USDC">USDC {getCurrencySymbol('USDC')}</option>
              <option value="SOL">Solana (SOL) {getCurrencySymbol('SOL')}</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add {type.charAt(0).toUpperCase() + type.slice(1)}</button>
      </form>
    </div>
  );
}

FinanceForm.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default FinanceForm;

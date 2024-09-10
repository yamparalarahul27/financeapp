import React, { useState } from 'react';
import { saveFinanceData } from '../localStorageService';

function FinanceForm({ type, onClose }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      type,
      amount: parseFloat(amount),
      description,
      currency,
      date: new Date().toISOString()
    };

    saveFinanceData(newEntry);
    console.log('New entry added successfully');
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

export default FinanceForm;

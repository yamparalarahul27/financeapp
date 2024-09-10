import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, FormControlLabel, Switch, Box } from '@mui/material';

function FinanceForm({ type, onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isTaxable, setIsTaxable] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      type,
      amount: parseFloat(amount),
      description,
      date,
      isTaxable: type === 'income' ? isTaxable : false
    };

    const existingData = JSON.parse(localStorage.getItem('financeData')) || [];
    const updatedData = [...existingData, newEntry];
    localStorage.setItem('financeData', JSON.stringify(updatedData));

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        {type === 'income' && (
          <FormControlLabel
            control={
              <Switch
                checked={isTaxable}
                onChange={(e) => setIsTaxable(e.target.checked)}
                color="primary"
              />
            }
            label="Taxable Income"
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
}

FinanceForm.propTypes = {
  type: PropTypes.oneOf(['income', 'expense']).isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default FinanceForm;

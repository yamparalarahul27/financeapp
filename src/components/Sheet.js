import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFinanceData } from '../localStorageService';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Modal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FinanceForm from './FinanceForm';

// Create a styled IconButton
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[400],
  '&:hover': {
    color: theme.palette.error.main,
  },
}));

function Sheet({ onNotification }) {
  const [finances, setFinances] = useState([]);
  const [userSettings, setUserSettings] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    loadData();
    const settings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setUserSettings(settings);
  }, []);

  const loadData = () => {
    const data = getFinanceData();
    setFinances(data);
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    loadData();
    closeModal();
    onNotification(`${modalType} added successfully`, 'success');
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
    if (userSettings.currencyDisplay === 'code') {
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

  const calculateTax = (amount, type) => {
    const taxRate = JSON.parse(localStorage.getItem('userSettings'))?.taxRate || 0;
    const taxMethod = JSON.parse(localStorage.getItem('userSettings'))?.taxMethod || 'inclusive';
    
    if (type === 'expense') return 0; // No tax on expenses
    
    if (taxMethod === 'inclusive') {
      return (amount * taxRate) / (100 + taxRate);
    } else {
      return (amount * taxRate) / 100;
    }
  };

  const getAmountColor = (type) => {
    return type === 'income' ? '#2ABB7F' : '#F15B50';
  };

  return (
    <div className="sheet">
      <h3>All Transactions</h3>
      <div className="action-buttons">
        <Button variant="contained" color="primary" onClick={() => openModal('income')}>Add Income</Button>
        <Button variant="contained" color="secondary" onClick={() => openModal('expense')}>Add Expense</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Tax Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finances.map((finance, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(finance.date)}</TableCell>
                <TableCell>{capitalizeType(finance.type)}</TableCell>
                <TableCell>{finance.description}</TableCell>
                <TableCell style={{ color: getAmountColor(finance.type) }}>
                  {getCurrencyDisplay(finance.amount, finance.currency)}
                </TableCell>
                <TableCell style={{ color: getAmountColor(finance.type) }}>
                  {getCurrencyDisplay(calculateTax(finance.amount, finance.type), finance.currency)}
                </TableCell>
                <TableCell>
                  <StyledIconButton
                    onClick={() => deleteTransaction(index)}
                    size="small"
                  >
                    <DeleteIcon />
                  </StyledIconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <FinanceForm
            type={modalType}
            onClose={closeModal}
            onSuccess={handleFormSuccess}
          />
        </Box>
      </Modal>
    </div>
  );
}

Sheet.propTypes = {
  onNotification: PropTypes.func.isRequired
};

export default Sheet;

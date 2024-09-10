const FINANCE_DATA_KEY = 'financeData';

export const saveFinanceData = (newEntry) => {
  const existingData = JSON.parse(localStorage.getItem(FINANCE_DATA_KEY)) || [];
  const updatedData = [...existingData, newEntry];
  localStorage.setItem(FINANCE_DATA_KEY, JSON.stringify(updatedData));
};

export const getFinanceData = () => {
  return JSON.parse(localStorage.getItem(FINANCE_DATA_KEY)) || [];
};

export const clearFinanceData = () => {
  localStorage.removeItem(FINANCE_DATA_KEY);
};

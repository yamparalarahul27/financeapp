const STORAGE_KEY = 'finance_data';

export const saveFinanceData = (data) => {
  const existingData = getFinanceData();
  const newData = [...existingData, data];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const getFinanceData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearFinanceData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

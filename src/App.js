import React, { useState } from 'react';
import './App.css';
import FinanceForm from './components/FinanceForm';
import Dashboard from './components/Dashboard';
import Sheet from './components/Sheet';
import Modal from './components/Modal';
import { ReactComponent as Logo } from './logo.svg';
import profileImage from './Profile.png';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case 'sheet':
        return <Sheet />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="logo-container">
          <Logo className="logo" />
        </div>
        <nav>
          <ul>
            <li 
              className={currentTab === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentTab('dashboard')}
            >
              Dashboard
            </li>
            <li 
              className={currentTab === 'sheet' ? 'active' : ''}
              onClick={() => setCurrentTab('sheet')}
            >
              Sheet
            </li>
          </ul>
        </nav>
        <div className="credit">
          <img src={profileImage} alt="Yamparala Rahul" className="profile-image" />
          <div className="credit-text">
            <span className="designed-by">Designed & Created by</span>
            <span className="author">Yamparala Rahul</span>
          </div>
        </div>
      </div>
      <main className="content">
        <header>
          <h1>{currentTab === 'dashboard' ? 'Dashboard' : 'Finance Sheet'}</h1>
          {currentTab === 'sheet' && (
            <div className="action-buttons">
              <button onClick={() => setIsIncomeModalOpen(true)}>Add Income</button>
              <button onClick={() => setIsExpenseModalOpen(true)}>Add Expense</button>
            </div>
          )}
        </header>
        {renderContent()}
      </main>
      <Modal isOpen={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)}>
        <FinanceForm type="income" onClose={() => setIsIncomeModalOpen(false)} />
      </Modal>
      <Modal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)}>
        <FinanceForm type="expense" onClose={() => setIsExpenseModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;

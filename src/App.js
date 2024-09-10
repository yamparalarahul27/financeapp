import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Sheet from './components/Sheet';
import Settings from './components/Settings';
import FinanceForm from './components/FinanceForm';
import Modal from './components/Modal';
import { ReactComponent as Logo } from './logo.svg';
import profileImage from './Profile.png';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState('income');
  const [theme, setTheme] = useState('light');
  const [settingsVersion, setSettingsVersion] = useState(0);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setTheme(savedSettings.theme || 'light');
  }, [settingsVersion]);

  const handleSettingsChange = () => {
    setSettingsVersion(prev => prev + 1);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'sheet':
        return <Sheet key={settingsVersion} />;
      case 'settings':
        return <Settings onThemeChange={setTheme} onSettingsChange={handleSettingsChange} />;
      case 'dashboard':
      default:
        return <Dashboard key={settingsVersion} />;
    }
  };

  const openModal = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  return (
    <div className={`App ${theme}`}>
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
            <li 
              className={currentTab === 'settings' ? 'active' : ''}
              onClick={() => setCurrentTab('settings')}
            >
              Settings
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
          <h1>
            {currentTab === 'dashboard' ? 'Dashboard' : 
             currentTab === 'sheet' ? 'Finance Sheet' : 'Settings'}
          </h1>
          {currentTab === 'dashboard' && (
            <div className="action-buttons">
              <button onClick={() => openModal('income')}>Add Income</button>
              <button onClick={() => openModal('expense')}>Add Expense</button>
            </div>
          )}
        </header>
        {renderContent()}
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FinanceForm type={formType} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;

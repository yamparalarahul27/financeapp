import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Dashboard from './components/Dashboard';
import Sheet from './components/Sheet';
import Settings from './components/Settings';
import FinanceForm from './components/FinanceForm';
import Modal from './components/Modal';
import Notification from './components/Notification';
import { ReactComponent as Logo } from './logo.svg';
import profileImage from './Profile.png';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState('income');
  const [theme, setTheme] = useState('light');
  const [settingsVersion, setSettingsVersion] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setCurrentTheme(savedSettings.theme || 'light');
  }, [settingsVersion]);

  const handleSettingsChange = () => {
    setSettingsVersion(prev => prev + 1);
  };

  const openModal = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  const handleNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'sheet':
        return <Sheet openModal={openModal} onNotification={handleNotification} />;
      case 'settings':
        return <Settings onThemeChange={setTheme} onSettingsChange={handleSettingsChange} />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={createTheme({
      palette: {
        mode: currentTheme,
        primary: {
          main: '#2ABB7F',
        },
        secondary: {
          main: '#F15B50',
        },
        text: {
          primary: '#1E293B',
        },
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
    })}>
      <CssBaseline />
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
          </header>
          <div className="content-area">
            {renderContent()}
          </div>
        </main>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <FinanceForm 
            type={formType} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={(message) => handleNotification(message)}
          />
        </Modal>
        <Notification 
          open={notification.open}
          handleClose={handleCloseNotification}
          message={notification.message}
          severity={notification.severity}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

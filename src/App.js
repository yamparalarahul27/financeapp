import React, { useState } from 'react';
import './App.css';
import FinanceForm from './components/FinanceForm';
import Dashboard from './components/Dashboard'; // Change this line
import { ReactComponent as Logo } from './logo.svg';
import profileImage from './Profile.png'; // Corrected to match the exact file name

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard'); // Change 'overview' to 'dashboard'

  const renderContent = () => {
    switch (currentTab) {
      case 'sheet':
        return <FinanceForm />;
      case 'dashboard': // Change 'overview' to 'dashboard'
      default:
        return <Dashboard />; // Change <Overview /> to <Dashboard />
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
              className={currentTab === 'dashboard' ? 'active' : ''} // Change 'overview' to 'dashboard'
              onClick={() => setCurrentTab('dashboard')} // Change 'overview' to 'dashboard'
            >
              Dashboard {/* Change 'Overview' to 'Dashboard' */}
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
          <h1>{currentTab === 'dashboard' ? 'Dashboard' : 'Finance Sheet'}</h1> {/* Change 'overview' to 'dashboard' */}
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

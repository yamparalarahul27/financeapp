import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Settings.css'; // We'll create this file for custom styles

function Settings({ onThemeChange, onSettingsChange }) {
  const [theme, setTheme] = useState('light');
  const [currencyDisplay, setCurrencyDisplay] = useState('symbol');
  const [dateFormat, setDateFormat] = useState('MMDDYYYY');
  const [taxRate, setTaxRate] = useState(0);
  const [taxMethod, setTaxMethod] = useState('inclusive');

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setTheme(savedSettings.theme || 'light');
    setCurrencyDisplay(savedSettings.currencyDisplay || 'symbol');
    setDateFormat(savedSettings.dateFormat || 'MMDDYYYY');
    setTaxRate(savedSettings.taxRate || 0);
    setTaxMethod(savedSettings.taxMethod || 'inclusive');
  }, []);

  const saveSettings = () => {
    const settings = { theme, currencyDisplay, dateFormat, taxRate, taxMethod };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    onThemeChange(theme);
    onSettingsChange();
    alert('Settings saved successfully!');
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="settings-option theme-option">
          <span>Theme</span>
          <div className="theme-toggle">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={handleThemeToggle}
              />
              <span className="slider round"></span>
            </label>
            <span className="theme-label">{theme === 'light' ? 'Light' : 'Dark'}</span>
          </div>
        </div>
        {/* ... other appearance settings ... */}
      </div>

      <div className="settings-section">
        <h3>Tax Settings</h3>
        <div className="tax-settings-row">
          <div className="tax-setting">
            <label>
              Tax Rate (%):
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                min="0"
                max="100"
                step="0.1"
              />
            </label>
          </div>
          <div className="tax-setting">
            <label>
              Tax Method:
              <select value={taxMethod} onChange={(e) => setTaxMethod(e.target.value)}>
                <option value="inclusive">Inclusive</option>
                <option value="exclusive">Exclusive</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <button className="save-settings" onClick={saveSettings}>Save Settings</button>
      <style>{`
        input:checked + .slider {
          background-color: var(--red);
        }
      `}</style>
    </div>
  );
}

Settings.propTypes = {
  onThemeChange: PropTypes.func.isRequired,
  onSettingsChange: PropTypes.func.isRequired
};

export default Settings;

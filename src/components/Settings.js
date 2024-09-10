import React, { useState, useEffect } from 'react';

function Settings({ onThemeChange, onSettingsChange }) {
  const [taxRate, setTaxRate] = useState(0);
  const [taxMethod, setTaxMethod] = useState('flat');
  const [theme, setTheme] = useState('light');
  const [currencyDisplay, setCurrencyDisplay] = useState('symbol');
  const [dateFormat, setDateFormat] = useState('DDMMYYYY');

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setTaxRate(savedSettings.taxRate || 0);
    setTaxMethod(savedSettings.taxMethod || 'flat');
    setTheme(savedSettings.theme || 'light');
    setCurrencyDisplay(savedSettings.currencyDisplay || 'symbol');
    setDateFormat(savedSettings.dateFormat || 'DDMMYYYY');
  }, []);

  const saveSettings = () => {
    const settings = { taxRate, taxMethod, theme, currencyDisplay, dateFormat };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    onThemeChange(theme);
    onSettingsChange();
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings">
      <div className="settings-section appearance-settings">
        <h3>Appearance</h3>
        <div className="settings-option">
          <label>
            Theme:
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <div className="settings-option">
          <label>
            Currency Display:
            <select value={currencyDisplay} onChange={(e) => setCurrencyDisplay(e.target.value)}>
              <option value="symbol">Symbol ($)</option>
              <option value="code">Code (USD)</option>
            </select>
          </label>
        </div>
        <div className="settings-option">
          <label>
            Date Format:
            <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
              <option value="DDMMYYYY">DD/MM/YYYY</option>
              <option value="MMDDYYYY">MM/DD/YYYY</option>
              <option value="YYYYMMDD">YYYY-MM-DD</option>
            </select>
          </label>
        </div>
      </div>
      <div className="settings-section tax-settings">
        <h3>Tax Settings</h3>
        <div className="tax-settings-content">
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
              Tax Calculation Method:
              <select 
                value={taxMethod} 
                onChange={(e) => setTaxMethod(e.target.value)}
              >
                <option value="flat">Flat Rate</option>
                <option value="progressive">Progressive</option>
                <option value="bracket">Tax Bracket</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <button className="save-settings" onClick={saveSettings}>Save Settings</button>
    </div>
  );
}

export default Settings;

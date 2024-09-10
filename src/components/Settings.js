import React, { useState } from 'react';

function Settings() {
  const [taxRate, setTaxRate] = useState(0);
  const [taxMethod, setTaxMethod] = useState('flat');

  return (
    <div className="settings">
      <div className="settings-section appearance-settings">
        <h3>Appearance</h3>
        <div className="settings-option">
          <label>
            Theme:
            <select>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <div className="settings-option">
          <label>
            Currency Display:
            <select>
              <option value="symbol">Symbol ($)</option>
              <option value="code">Code (USD)</option>
            </select>
          </label>
        </div>
        <div className="settings-option">
          <label>
            Date Format:
            <select>
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
      <button className="save-settings">Save Settings</button>
    </div>
  );
}

export default Settings;

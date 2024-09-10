import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Dashboard/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders sidebar navigation', () => {
  render(<App />);
  const dashboardLink = screen.getByText(/Dashboard/i);
  const sheetLink = screen.getByText(/Sheet/i);
  const settingsLink = screen.getByText(/Settings/i);
  expect(dashboardLink).toBeInTheDocument();
  expect(sheetLink).toBeInTheDocument();
  expect(settingsLink).toBeInTheDocument();
});

test('renders credit section', () => {
  render(<App />);
  const creditText = screen.getByText(/Designed & Created by/i);
  const authorName = screen.getByText(/Yamparala Rahul/i);
  expect(creditText).toBeInTheDocument();
  expect(authorName).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders app and shows CSV uploader', () => {
  render(<App />);
  const linkElement = screen.getByText(/CSV User Search/i);
  expect(linkElement).toBeInTheDocument();

  const uploadButton = screen.getByText(/Upload CSV/i);
  expect(uploadButton).toBeInTheDocument();
});

// Add other tests as needed...


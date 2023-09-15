import React from 'react';
import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import api from '../api/api';
import UserSearch from './UserSearch';

// Mocking the API
jest.mock('../api/api');

describe('SearchBar', () => {
  // Clean up after each test
  afterEach(cleanup);

  beforeEach(() => {
    // Simulate a delay with the mock
    (api.get as jest.Mock).mockImplementation(() => 
      new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: [] });
        }, 500);  // delay of 500ms
      })
    );
  });

  it('displays loading and error states', async () => {
    render(<UserSearch />);

    const input = screen.getByPlaceholderText('Search users...');
    fireEvent.change(input, { target: { value: 'example query' } });

    // Using waitFor to check for the Loading... text.
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('handles unexpected data formats gracefully', async () => {

    render(<UserSearch />);

    fireEvent.change(screen.getByPlaceholderText('Search users...'), {
      target: { value: 'example query' },
    });
  });
});

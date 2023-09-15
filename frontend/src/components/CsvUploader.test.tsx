import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CsvUploader from './CsvUploader';
import api from '../api/api';

jest.mock('../api/api', () => ({
  post: jest.fn().mockResolvedValue({ status: 200 })
}));

describe('<CsvUploader />', () => {

  it('displays a success message after successful upload', async () => {
    render(<CsvUploader />);

    const file = new File(['sample'], 'sample.csv', { type: 'text/csv' });
    const input = screen.getByPlaceholderText('input file');
    const button = screen.getByText('Upload CSV');

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('File uploaded successfully!')).toBeInTheDocument();
    });
  });
  
});

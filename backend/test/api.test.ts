import request from 'supertest';
import { app } from '../src/server';  // Update this path to point to your server file

describe('API Endpoints', () => {

  // Test file upload functionality
  describe('POST /api/files', () => {
    it('should process and return the uploaded CSV data', async () => {
      const response = await request(app)
        .post('/api/files')
        .attach('file', 'test/dummy.csv') // Use a dummy CSV file for testing purposes

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('File uploaded successfully.');
      // Add more assertions if needed
    });

    // Test the CSV upload endpoint
    it('should upload CSV and return processed data', async () => {
      const res = await request(app)
          .post('/api/files')
          .attach('file', 'test/dummy.csv');  // Adjust the path to your sample CSV

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'File uploaded successfully.');
    });

    // Test the search endpoint
    it('should return matching data for a query', async () => {
        const res = await request(app).get('/api/users').query({ q: 'sample_query' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('totalPages');
        expect(res.body).toHaveProperty('users');
    });
  });

  // Test the user search functionality
  describe('GET /api/users', () => {
    it('should return the filtered data based on the query', async () => {
      const response = await request(app)
        .get('/api/users?q=testQuery'); // Replace 'testQuery' with a suitable query

      expect(response.status).toBe(200);
      expect(response.body.totalPages).toBeDefined();
      expect(response.body.users).toBeDefined();
      // Add more assertions if needed
    });
  });
  
});

import { server } from './src/server';

beforeAll(async () => {
  // Code to run before all test suites start
  // For example, initializing database connections, or starting the server
});

afterAll(async () => {
  // Cleanup after all test suites are done
  await server.close();
});

// If you're using any custom matchers or extensions, you'd include them here.

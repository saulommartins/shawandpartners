// src/api/api.ts (or any suitable TypeScript file)
import axios, { AxiosInstance } from 'axios';

// Create an Axios instance with a base URL
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Change this to your backend's URL
});

export default instance;
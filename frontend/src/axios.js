import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this baseURL matches your backend server URL
});

export default instance;

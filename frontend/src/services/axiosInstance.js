import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fb-notification-backend1.onrender.com/api/v1', 
});

export default axiosInstance;

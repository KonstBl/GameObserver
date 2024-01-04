import axios from 'axios';

const axiosIns = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
});
export default axiosIns;
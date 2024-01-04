import axios from 'axios';
import { AccessToken } from '@/utils/auth';

const axiosIns = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${AccessToken}`
  }
});
export default axiosIns;
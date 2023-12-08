import axios from 'axios';
import {API_URL} from '@env';

const Fetch = axios.create({
  baseURL: API_URL,
});

export default Fetch;

import axios from 'axios';
const customAxios = axios.create({baseURL: process.env.REACT_APP_BACKEND_BASE_URL, withCredentials: true});
export default customAxios; 
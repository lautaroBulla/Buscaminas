import axios from 'axios';

const api = axios.create({
    baseUrl: '/api',
    withCredentials: true
})
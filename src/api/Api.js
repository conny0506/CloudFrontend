import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gamedeliverypaas-api-g7eafbc2a7g5azdm.germanywestcentral-01.azurewebsites.net/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

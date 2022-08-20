import axios from 'axios';
const ExpenseClient = axios.create({
  baseURL:
    'https://dd3e-2405-201-4022-2148-d3a7-3f71-53ec-8f3e.in.ngrok.io/api/',
  timeout: 1000,
});

export {ExpenseClient};

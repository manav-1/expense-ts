import axios from 'axios';
const ExpenseClient = axios.create({
  baseURL: 'https://expense-manager.loca.lt/api/',
  timeout: 1000,
});

export {ExpenseClient};

import axios from 'axios';
const ExpenseClient = axios.create({
  baseURL: 'https://expense-manager-manav.herokuapp.com/api/',
  timeout: 1000,
});

export {ExpenseClient};

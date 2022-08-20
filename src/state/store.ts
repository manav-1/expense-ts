import {SnapshotIn, types} from 'mobx-state-tree';
import {ExpenseClient} from '../axios/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {snackbar} from './snackbar';

enum ExpenseType {
  Debit = 'Debit',
  Credit = 'Credit',
}

enum ExpenseWay {
  Bank = 'Bank',
  Credit_Card = 'Credit_Card',
  Debit_Card = 'Debit_Card',
  UPI = 'UPI',
  Net_Banking = 'Net_Banking',
  Cash = 'Cash',
}
enum UserType {
  NotLinked = 'NotLinked',
  Linked = 'Linked',
}

const Expense = types.model('Expense', {
  expenseId: types.optional(types.identifier, '0'),
  createdAt: types.optional(types.string, new Date(Date.now()).toISOString()),
  updatedAt: types.optional(types.string, new Date(Date.now()).toISOString()),
  userId: types.optional(types.string, '0'),
  expenseType: types.enumeration([...Object.values(ExpenseType)]),
  value: types.number,
  date: types.string,
  description: types.string,
  expenseWay: types.enumeration([...Object.values(ExpenseWay)]),
});

const Note = types.model('Note', {
  noteId: types.optional(types.identifier, '0'),
  noteText: types.string,
  date: types.string,
  createdAt: types.optional(types.string, new Date(Date.now()).toISOString()),
  updatedAt: types.optional(types.string, new Date(Date.now()).toISOString()),
  userId: types.optional(types.string, '0'),
});

const User = types.model('User', {
  userId: types.optional(types.identifier, '0'),
  userName: types.string,
  userEmail: types.string,
  userProfilePic: types.maybeNull(types.string),
  createdAt: types.optional(types.string, new Date(Date.now()).toISOString()),
  updatedAt: types.optional(types.string, new Date(Date.now()).toISOString()),
  userType: types.enumeration([...Object.values(UserType)]),
});

interface ExpenseIF extends SnapshotIn<typeof Expense> {}
interface NoteIF extends SnapshotIn<typeof Note> {}
interface UserIF extends SnapshotIn<typeof User> {}

const AppStore = types
  .model('Expenses', {
    expenses: types.array(Expense),
    notes: types.array(Note),
    user: User,
  })
  .views(self => ({
    getExpenseByType(type: ExpenseType) {
      return self.expenses.filter(expense => expense.expenseType === type);
    },
    getExpensesByWay(way: ExpenseWay) {
      return self.expenses.filter(expense => expense.expenseWay === way);
    },
    getGroupedExpensesByWay() {
      const groupedExpenses: {[key: string]: ExpenseIF[]} = {};
      self.expenses.forEach(expense => {
        if (!groupedExpenses[expense.expenseWay]) {
          groupedExpenses[expense.expenseWay] = [];
        }
        groupedExpenses[expense.expenseWay].push(expense);
      });
      return groupedExpenses;
    },
    getGroupedExpensesByMonth() {
      const groupedExpenses: {[key: string]: ExpenseIF[]} = {};
      self.expenses.forEach(expense => {
        if (!groupedExpenses[new Date(expense.date).toDateString()]) {
          groupedExpenses[new Date(expense.date).toDateString()] = [];
        }
        groupedExpenses[new Date(expense.date).toDateString()].push(expense);
      });
      return groupedExpenses;
    },
    getNotes() {
      return self.notes;
    },
  }))

  .actions(self => ({
    setExpenses(expenses: any) {
      self.expenses = expenses;
    },
    setNotes(notes: any) {
      self.notes = notes;
    },
    setUser(user: any) {
      self.user = user;
    },
  }))
  .actions(self => ({
    async loadUser() {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.get('user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        self.setUser(data.data);
      } catch (err) {
        snackbar.openSnackBar('Error loading user');
      }
    },
    async updateUser(user: any, userId: string) {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.put(`user/profile/${userId}`, user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        snackbar.openSnackBar('Error updating user');
      }
    },
  }))
  .actions(self => ({
    async loadExpenses(sort = false) {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.get('expenses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (sort)
          data.data.expenses = data.data.expenses
            .sort(
              (a: ExpenseIF, b: ExpenseIF) =>
                new Date(a.date).getTime() - new Date(b.date).getTime(),
            )
            .reverse();
        self.setExpenses(data.data.expenses);
      } catch (err) {
        snackbar.openSnackBar('Something went wrong');
      }
    },
  }))
  .actions(self => ({
    async addExpense(expense: ExpenseIF) {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.post(
          'expenses/',
          {
            ...expense,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data.success) snackbar.openSnackBar('Added successfully');
        self.loadExpenses();
      } catch (err) {
        snackbar.openSnackBar('Something went wrong');
      }
    },
    async updateExpense(expense: ExpenseIF, expenseId: string) {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.put(
          `expenses/${expenseId}`,
          {
            ...expense,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data.success) snackbar.openSnackBar('Updated successfully');
        self.loadExpenses();
      } catch (err) {
        console.log(err);
        snackbar.openSnackBar('Something went wrong');
      }
    },
    async deleteExpense(expenseId: string) {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.delete(`expenses/${expenseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) snackbar.openSnackBar('Deleted successfully');
        self.loadExpenses();
      } catch (err) {
        snackbar.openSnackBar('Something went wrong');
      }
    },
  }))
  .actions(self => ({
    async loadNotes() {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.get('notes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        self.setNotes(data.data.notes);
      } catch (err) {
        snackbar.openSnackBar('Something went wrong');
      }
    },
  }))
  .actions(self => ({
    async addNote(note: any) {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.post(
          'notes/',
          {
            ...note,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data.success) snackbar.openSnackBar('Added successfully');
        self.loadNotes();
      } catch (err) {
        snackbar.openSnackBar('Something went wrong');
      }
    },
    async updateNote(note: any, noteId: string) {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.put(
          `notes/${noteId}`,
          {
            ...note,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data.success) snackbar.openSnackBar('Updated successfully');
        self.loadNotes();
      } catch (err) {
        snackbar.openSnackBar('Something went wrong');
      }
    },
    async deleteNote(noteId: string) {
      try {
        const token = await AsyncStorage.getItem('expense_user');
        const {data} = await ExpenseClient.delete(`notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) snackbar.openSnackBar('Deleted successfully');
        self.loadNotes();
      } catch (err) {
        snackbar.openSnackBar('Something went wrong');
      }
    },
  }));

export const App = AppStore.create({
  expenses: [],
  notes: [],
  user: {
    userName: '',
    userEmail: '',
    userProfilePic: '',
    userType: UserType.NotLinked,
  },
});

export default AppStore;

export {ExpenseType, ExpenseWay};

export type {UserIF, ExpenseIF, NoteIF};

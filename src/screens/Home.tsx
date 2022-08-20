// /* eslint-disable no-shadow */
// import * as React from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import PropTypes from 'prop-types';
// import CustomExpense from '../customComponents/customHomeExpense';
// import LineChartScreen from './Line';
// import Analytics from '../customComponents/Analytics';
// import {
//   GradientContainer,
//   PaddedScrollViewContainer as PaddedContainer,
//   Title,
//   CenteredKarlaText,
// } from '../customComponents/styledComponents';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
// import {App} from '../state/store';

import {Text} from 'react-native-paper';

// // import database from '@react-native-firebase/database';
// // import auth from '@react-native-firebase/auth';
// import {groupBy} from 'lodash';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const HomeScreen = ({navigation}: {navigation: any}) => {
//   // const format = (data: any) => {
//   //   if (data) {
//   //     let values = {...data};
//   //     let expenses = [];
//   //     for (let key in values) {
//   //       values[key].key = key;
//   //       values[key].index = expenses.length;
//   //       expenses.push(values[key]);
//   //     }
//   //     setExpenses(
//   //       expenses.filter(
//   //         item => new Date(item.date).getMonth() === new Date().getMonth(),
//   //       ),
//   //     );
//   //   } else {
//   //     setExpenses([]);
//   //   }
//   // };
//   // const [expenses, setExpenses] = React.useState(
//   //   format({
//   //     '-Mrx3h-oeLPQwr3hV25o': {
//   //       date: 'Mon Dec 27 2021',
//   //       description: 'Entertainment',
//   //       type: 'Debit',
//   //       value: '800',
//   //       way: 'Bank Transfer',
//   //     },
//   //     '-Mrx3r956eXa3SZiA5J2': {
//   //       date: 'Mon Dec 27 2021',
//   //       description: 'Transport',
//   //       type: 'Debit',
//   //       value: '1000',
//   //       way: 'UPI',
//   //     },
//   //     '-Mrx45okC5m8YKw1OfBV': {
//   //       date: 'Mon Dec 27 2021',
//   //       description: 'Clothes',
//   //       type: 'Credit',
//   //       value: '400',
//   //       way: 'Cash',
//   //     },
//   //     '-Mrz2qIpFnE__fsWq8IE': {
//   //       date: 'Tue Dec 28 2021',
//   //       description: 'Clothes',
//   //       type: 'Debit',
//   //       value: '800',
//   //       way: 'Net Banking',
//   //     },
//   //     '-Mrz2qvrW8sr1FapC1FW': {
//   //       date: 'Tue Dec 28 2021',
//   //       description: 'Transport',
//   //       type: 'Credit',
//   //       value: '400',
//   //       way: 'Card',
//   //     },
//   //   }),
//   // );
//   // //   // eslint-disable-next-line no-unused-vars
//   // const [user, setUser] = React.useState(null);

//   // const handleLogout = async () => {
//   //   try {
//   //     await AsyncStorage.removeItem('expense_user');
//   //     navigation.push('Login');
//   //   } catch (e) {}
//   // };

//   // //   const setListener = async () => {
//   // //     const userId = auth().currentUser.uid;
//   // //     database()
//   // //       .ref(userId)
//   // //       .child('/expenses/')
//   // //       .on('value', data => {
//   // //         if (data.val()) {
//   // //       });
//   // // //     // .then();
//   // //   };

//   // React.useEffect(() => {
//   //   (() => {
//   //     navigation.addListener('beforeRemove', e => e.preventDefault());
//   //   })();
//   //   // setUser(auth().currentUser);
//   //   // setListener();
//   // }, [navigation]);
//   // const groupByDates = () => {
//   //   const groupedByDate = groupBy(
//   //     expenses.filter(expense => expense.type === 'Debit'),
//   //     'date',
//   //   );
//   //   let obj = {};
//   //   Object.keys(groupedByDate).forEach(key => {
//   //     obj[key] = Number(
//   //       groupedByDate[key]
//   //         .reduce((prev, cur) => Number(prev) + Number(cur.value), 0)
//   //         .toFixed(2),
//   //     );
//   //   });
//   //   if (Object.keys(obj).length > 7) {
//   //     const sevenDay = {};
//   //     Object.keys(obj).forEach(key => {
//   //       if (new Date().getDate() - new Date(key).getDate() <= 7) {
//   //         sevenDay[key] = obj[key];
//   //       }
//   //     });
//   //     return sevenDay;
//   //   }
//   //   return obj;
//   // };

//   // return (
//   //   <GradientContainer>
//   //     <View
//   //       //         // colors={['#153759AA', '#fff']}
//   //       style={styles.tabStyles}>
//   //       <Text style={styles.tabBarTitle}>Home</Text>
//   //       <TouchableOpacity
//   //         onPress={() => handleLogout(navigation)}
//   //         style={styles.logoutButton}>
//   //         <Ionicons name="log-out-outline" size={25} color="#fff" />
//   //       </TouchableOpacity>
//   //     </View>
//   //     <PaddedContainer>
//   //       <LinearGradient
//   //         style={styles.linearGradient}
//   //         colors={['#ffc290', '#e1f8ff']}
//   //         start={{x: 0, y: 0.2}}
//   //         end={{x: 1, y: 1}}>
//   //         <Text style={styles.light}>This Month&apos;s Money</Text>
//   //         <View style={styles.verticalMargin}>
//   //           <View style={styles.oval} />
//   //           <Title style={styles.money}>
//   //             ₹
//   //             {expenses
//   //               .reduce((prev, cur) => {
//   //                 if (cur.type === 'Credit') {
//   //                   return Number(prev) + Number(cur.value);
//   //                 } else if (cur.type === 'Debit') {
//   //                   return Number(prev) - Number(cur.value);
//   //                 }
//   //               }, 0)
//   //               .toFixed(2)
//   //               .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
//   //           </Title>
//   //         </View>
//   //         <View style={styles.rowContainer}>
//   //           <View>
//   //             <CenteredKarlaText style={styles.karlaText}>
//   //               Credit
//   //             </CenteredKarlaText>
//   //             <CenteredKarlaText>
//   //               {expenses
//   //                 .filter(expense => expense.type === 'Credit')
//   //                 .reduce((prev, cur) => Number(prev) + Number(cur.value), 0)
//   //                 .toFixed(2)
//   //                 .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
//   //             </CenteredKarlaText>
//   //           </View>
//   //           <View>
//   //             <CenteredKarlaText style={styles.karlaText}>
//   //               Debit
//   //             </CenteredKarlaText>
//   //             <CenteredKarlaText>
//   //               {expenses
//   //                 .filter(expense => expense.type === 'Debit')
//   //                 .reduce((prev, cur) => Number(prev) + Number(cur.value), 0)
//   //                 .toFixed(2)
//   //                 .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
//   //             </CenteredKarlaText>
//   //           </View>
//   //         </View>
//   //       </LinearGradient>
//   //       <View>
//   //         <Text style={styles.heading}>
//   //           <Ionicons name="wallet-outline" size={20} /> 7 Day Expense
//   //         </Text>
//   //         <LineChartScreen data={groupByDates()} />
//   //       </View>
//   //       <Analytics expenses={expenses} />

//   //       <View style={styles.rowContainer}>
//   //         <Text style={[styles.heading, styles.extraHeading]}>
//   //           Recent Expenses
//   //         </Text>
//   //         <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
//   //           <Text style={[styles.heading, styles.extraHeading]}>
//   //             See All
//   //             <Ionicons name="ios-arrow-forward" size={16} />
//   //           </Text>
//   //         </TouchableOpacity>
//   //       </View>
//   //       <ScrollView horizontal>
//   //         {expenses.length > 5
//   //           ? expenses
//   //               .slice(0, 5)
//   //               .map((expense, index) => (
//   //                 <CustomExpense key={index} expense={expense} />
//   //               ))
//   //           : expenses.map((expense, index) => (
//   //               <CustomExpense key={index} expense={expense} />
//   //             ))}
//   //       </ScrollView>
//   //     </PaddedContainer>
//   //   </GradientContainer>
//   // );
// };
// HomeScreen.propTypes = {
//   navigation: PropTypes.object,
//   expenses: PropTypes.array,
// };
// export default HomeScreen;

// const styles = StyleSheet.create({
//   header: {
//     color: '#000',
//     fontSize: 30,
//     fontFamily: 'poppins',
//     textAlign: 'left',
//   },
//   light: {
//     textAlign: 'center',
//     fontFamily: 'poppins',
//     fontSize: 16,
//     color: '#000',
//   },
//   money: {
//     color: '#000',
//     fontSize: 45,
//     fontFamily: 'ReadexPro-Regular',
//     marginVertical: 5,
//     letterSpacing: 0.1,
//   },
//   oval: {
//     width: 80,
//     height: 80,
//     borderWidth: 1.5,
//     borderRadius: 120,
//     transform: [{scaleX: 3}, {rotate: '30deg'}],
//     position: 'absolute',
//     left: 100,
//     top: 5,
//     borderColor: '#8f106033',
//   },
//   heading: {
//     fontFamily: 'Karla-Regular',
//     fontSize: 22,
//     textAlign: 'center',
//     marginVertical: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: '#fff',
//   },
//   tabBarTitle: {
//     fontSize: 23,
//     padding: 10,
//     color: '#fff',
//     fontFamily: 'Poppins',
//   },
//   tabStyles: {
//     // borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#181824',
//   },
//   logoutButton: {
//     marginRight: 10,
//     paddingLeft: 5,
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     backgroundColor: '#494c59',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   linearGradient: {
//     borderRadius: 20,
//     padding: 10,
//     marginHorizontal: 50,
//   },
//   extraHeading: {
//     textAlign: 'left',
//     fontWeight: '600',
//     fontFamily: 'Karla-Regular',
//     fontSize: 18,
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   karlaText: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 12,
//     marginBottom: -5,
//     color: '#000',
//   },
//   verticalMargin: {marginVertical: 10},
// });
import React, {useEffect} from 'react';
import {ExpenseWay, ExpenseType} from '../state/store';
import {App} from '../state/store';
import {Button} from 'react-native';

export default function () {
  const expense = {
    expenseType: ExpenseType.Debit,
    value: 100,
    description: 'test',
    date: new Date(Date.now()).toISOString(),
    expenseWay: ExpenseWay.Cash,
  };
  const updatedExpense = {
    expenseType: ExpenseType.Credit,
    value: 100,
    description: 'test',
    date: new Date(Date.now()).toISOString(),
    expenseWay: ExpenseWay.Cash,
  };
  const notes = {
    noteText: 'testing 1',
    date: new Date(Date.now()).toISOString(),
  };
  const updatedNotes = {
    noteText: 'testing 23',
    date: new Date(Date.now()).toISOString(),
  };
  return (
    <>
      <Text>HomeScreen</Text>
      <Button onPress={() => App.addExpense(expense)} title="Add Expense" />
      <Button
        onPress={() => App.updateExpense(updatedExpense, '2')}
        title="Update Expense"
      />
      <Button onPress={() => App.deleteExpense('4')} title="Delete Expense" />
      <Button onPress={() => App.addNote(notes)} title="Add Note" />
      <Button onPress={() => App.deleteNote('1')} title="Delete Note" />
      <Button
        onPress={() => App.updateNote(updatedNotes, '2')}
        title="Update Note"
      />
    </>
  );
}

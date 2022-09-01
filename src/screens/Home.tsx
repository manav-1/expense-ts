import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomExpense from '../customComponents/customHomeExpense';
import LineChartScreen from './Line';
import Analytics from '../customComponents/Analytics';
import {
  GradientContainer,
  PaddedScrollViewContainer as PaddedContainer,
  Title,
  CenteredKarlaText,
} from '../customComponents/styledComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {App, ExpenseIF, ExpenseType} from '../state/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {observer} from 'mobx-react';
import {groupBy} from 'lodash';
import {useTheme} from 'react-native-paper';

const HomeScreen = observer(({navigation}: {navigation: any}) => {
  const {colors}: {colors: any} = useTheme();
  const [expenses, setExpenses] = React.useState<ExpenseIF[]>([]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('expense_user');
      navigation.push('Login');
    } catch (e) {}
  };
  const groupByDates = () => {
    const groupedByDate = groupBy(
      expenses
        .filter(expense => expense.expenseType === ExpenseType.Debit)
        .map(item => ({...item, date: new Date(item.date).toDateString()})),
      'date',
    );
    let obj: {[key: string]: number} = {};
    Object.keys(groupedByDate).forEach(key => {
      obj[key] = Number(
        groupedByDate[key]
          .reduce((prev, cur) => Number(prev) + Number(cur.value), 0)
          .toFixed(2),
      );
    });
    if (Object.keys(obj).length > 7) {
      const sevenDay: {[key: string]: number} = {};
      Object.keys(obj).forEach(key => {
        if (new Date().getDate() - new Date(key).getDate() <= 7) {
          sevenDay[key] = obj[key];
        }
      });
      return sevenDay;
    }
    return obj;
  };

  React.useEffect(() => {
    (() => {
      navigation.addListener('beforeRemove', (e: React.ChangeEvent) =>
        e.preventDefault(),
      );
    })();
  }, [navigation]);
  React.useEffect(() => {
    setExpenses(App.expenses);
  }, []);

  const styles = StyleSheet.create({
    header: {
      color: colors.primaryText,
      fontSize: 30,
      fontFamily: 'Poppins-Regular',
      textAlign: 'left',
    },
    light: {
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      color: colors.primaryText,
    },
    money: {
      color: colors.primaryText,
      fontSize: 45,
      fontFamily: 'ReadexPro-Regular',
      marginVertical: 5,
      letterSpacing: 0.1,
    },
    oval: {
      width: 80,
      height: 80,
      borderWidth: 1.5,
      borderRadius: 120,
      transform: [{scaleX: 3}, {rotate: '30deg'}],
      position: 'absolute',
      left: 100,
      top: 5,
      borderColor: '#8f106033',
    },
    heading: {
      fontFamily: 'Karla-Regular',
      fontSize: 22,
      textAlign: 'center',
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
    },
    tabBarTitle: {
      fontSize: 23,
      padding: 10,
      color: '#fff',
      fontFamily: 'Poppins-Regular',
    },
    tabStyles: {
      // borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.primaryBackground,
    },
    logoutButton: {
      marginRight: 10,
      paddingLeft: 5,
      width: 40,
      height: 40,
      borderRadius: 25,
      backgroundColor: '#494c59',
      justifyContent: 'center',
      alignItems: 'center',
    },
    linearGradient: {
      borderRadius: 20,
      padding: 10,
      marginHorizontal: 50,
    },
    extraHeading: {
      textAlign: 'left',
      fontWeight: '600',
      fontFamily: 'Karla-Regular',
      fontSize: 18,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    karlaText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
      marginBottom: -5,
      color: colors.primaryText,
    },
    verticalMargin: {marginVertical: 10},
  });

  return (
    <GradientContainer>
      <View style={styles.tabStyles}>
        <Text style={styles.tabBarTitle}>Home</Text>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <PaddedContainer>
        <LinearGradient
          style={styles.linearGradient}
          colors={[colors.graphColorPrimary, colors.graphColorSecondary]}
          start={{x: 0, y: 0.2}}
          end={{x: 1, y: 1}}>
          <Text style={styles.light}>This Month&apos;s Money</Text>
          <View style={styles.verticalMargin}>
            <View style={styles.oval} />
            <Title style={styles.money}>
              ₹
              {expenses &&
                expenses
                  ?.reduce((prev: number, cur): number => {
                    if (cur.expenseType === ExpenseType.Credit) {
                      return Number(prev) + Number(cur.value);
                    } else {
                      return Number(prev) - Number(cur.value);
                    }
                  }, 0)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Title>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <CenteredKarlaText style={styles.karlaText}>
                Credit
              </CenteredKarlaText>
              <CenteredKarlaText>
                {expenses
                  ?.filter(
                    expense => expense.expenseType === ExpenseType.Credit,
                  )
                  .reduce((prev, cur) => Number(prev) + Number(cur.value), 0)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </CenteredKarlaText>
            </View>
            <View>
              <CenteredKarlaText style={styles.karlaText}>
                Debit
              </CenteredKarlaText>
              <CenteredKarlaText>
                {expenses
                  ?.filter(expense => expense.expenseType === ExpenseType.Debit)
                  .reduce((prev, cur) => Number(prev) + Number(cur.value), 0)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </CenteredKarlaText>
            </View>
          </View>
        </LinearGradient>
        <View>
          <Text style={styles.heading}>
            <Ionicons name="wallet-outline" size={20} /> 7 Day Expense
          </Text>
          <LineChartScreen data={groupByDates()} />
        </View>
        {expenses && expenses.length > 0 && <Analytics expenses={expenses} />}

        <View style={styles.rowContainer}>
          <Text style={[styles.heading, styles.extraHeading]}>
            Recent Expenses
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
            <Text style={[styles.heading, styles.extraHeading]}>
              See All
              <Ionicons name="ios-arrow-forward" size={16} />
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {expenses && expenses.length > 5
            ? expenses
                ?.slice(0, 5)
                .map((expense, index) => (
                  <CustomExpense
                    key={index}
                    expense={expense}
                    deleteItem={() =>
                      App.deleteExpense(String(expense.expenseId))
                    }
                  />
                ))
            : expenses?.map((expense, index) => (
                <CustomExpense
                  key={index}
                  expense={expense}
                  deleteItem={() =>
                    App.deleteExpense(String(expense.expenseId))
                  }
                />
              ))}
        </ScrollView>
      </PaddedContainer>
    </GradientContainer>
  );
});

export default HomeScreen;

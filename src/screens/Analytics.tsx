import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  PaddedScrollViewContainer as PaddedContainer,
  GradientContainer,
  CenteredKarlaText,
} from '../customComponents/styledComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import {groupBy} from 'lodash';
import CustomExpense from '../customComponents/customHomeExpense';
import Analytics from '../customComponents/Analytics';
import LineScreen from './Line';
import {App, ExpenseIF} from '../state/store';
import {observer} from 'mobx-react';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const now = new Date().getFullYear();
const YEARS = Array.from(Array(5), (_, i) => i + (now - 4)).reverse();

const AnalyticsScreen = observer(() => {
  const [selectedMonth, setSelectedMonth] = React.useState(
    MONTHS[new Date().getMonth()],
  );
  const [selectedYear, setSelectedYear] = React.useState(
    YEARS[YEARS.indexOf(new Date().getFullYear())],
  );
  const [expenses, setExpenses] = React.useState<ExpenseIF[]>([]);
  const [expensesForAnalytics, setExpensesForAnalytics] = React.useState<
    ExpenseIF[]
  >([]);
  const setEFA = (month: string, year: number) => {
    setExpensesForAnalytics(
      expenses.filter(
        expense =>
          new Date(expense.date).getMonth() === MONTHS.indexOf(month) &&
          new Date(expense.date).getFullYear() === year,
      ),
    );
  };
  const groupByDates = (expenses: ExpenseIF[]) => {
    const groupedByDate = groupBy(
      expenses.filter(expense => expense.expenseType === 'Debit'),
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
    return obj;
  };

  React.useEffect(() => {
    App.loadExpenses();
    setExpenses(App.expenses);
    setEFA(MONTHS[new Date().getMonth()], new Date().getFullYear());
  }, []);
  return (
    <GradientContainer>
      <View style={styles.tabStyles}>
        <Text style={styles.tabBarTitle}>Analytics</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <SelectDropdown
            renderDropdownIcon={() => (
              <Ionicons name="chevron-down" color="#fff" size={20} />
            )}
            dropdownOverlayColor="#161622AA"
            defaultButtonText={'Select Month'}
            data={MONTHS}
            buttonTextAfterSelection={item => item}
            rowTextForSelection={item => item}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonText}
            defaultValue={selectedMonth}
            onSelect={selectedItem => {
              setSelectedMonth(selectedItem);
              setEFA(selectedItem, selectedYear);
            }}
          />
          <SelectDropdown
            renderDropdownIcon={() => (
              <Ionicons name="chevron-down" color="#fff" size={20} />
            )}
            dropdownOverlayColor="#161622AA"
            defaultButtonText={'Select Year'}
            data={YEARS}
            buttonTextAfterSelection={item => item}
            rowTextForSelection={item => item}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonText}
            defaultValue={selectedYear}
            onSelect={selectedItem => {
              setSelectedYear(selectedItem);
              setEFA(selectedMonth, selectedItem);
            }}
          />
        </View>
      </View>
      <PaddedContainer>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {expensesForAnalytics.length > 0 ? (
            <CenteredKarlaText
              style={{
                color: '#fff',
                fontFamily: 'Karla-Medium',
                fontSize: 22,
              }}>
              Expenses for {selectedMonth} {selectedYear}
            </CenteredKarlaText>
          ) : null}
        </View>
        {expensesForAnalytics.length === 0 ? (
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Karla-Regular',
            }}>
            No Expenses to Show
          </Text>
        ) : null}

        <View style={{padding: 10}} />
        {expensesForAnalytics.length > 0 ? (
          <>
            <LineScreen data={groupByDates(expensesForAnalytics)} />
            <View
              style={{
                padding: 15,
                borderRadius: 10,
                backgroundColor: '#FFC290',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <CenteredKarlaText
                style={{
                  color: '#000',
                  marginBottom: 10,
                  fontSize: 18,
                  fontFamily: 'Karla-Bold',
                }}>
                Total Number of Transactions:&nbsp;
                {expensesForAnalytics.length}
              </CenteredKarlaText>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                }}>
                <View>
                  <CenteredKarlaText style={{color: '#000'}}>
                    Debit Transactions:&nbsp;
                    {
                      expensesForAnalytics.filter(
                        expense => expense.expenseType === 'Debit',
                      ).length
                    }
                  </CenteredKarlaText>
                  <CenteredKarlaText style={{color: '#000'}}>
                    Value:&nbsp;
                    {expensesForAnalytics
                      .filter(expense => expense.expenseType === 'Debit')
                      .reduce(
                        (prev, cur) => Number(prev) + Number(cur.value),
                        0,
                      )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </CenteredKarlaText>
                </View>
                <View>
                  <CenteredKarlaText style={{color: '#000'}}>
                    Credit Transactions:&nbsp;
                    {
                      expensesForAnalytics.filter(
                        expense => expense.expenseType === 'Credit',
                      ).length
                    }
                  </CenteredKarlaText>
                  <CenteredKarlaText style={{color: '#000'}}>
                    Value:&nbsp;
                    {expensesForAnalytics
                      .filter(expense => expense.expenseType === 'Credit')
                      .reduce(
                        (prev, cur) => Number(prev) + Number(cur.value),
                        0,
                      )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </CenteredKarlaText>
                </View>
              </View>
            </View>
            <Analytics
              contributionData
              expenses={expensesForAnalytics}
              yearlyExpenses={expenses.filter(
                expense =>
                  new Date(expense.date).getFullYear() === selectedYear,
              )}
            />
          </>
        ) : null}
        <View style={{padding: 10}} />

        <View style={{padding: 10}} />
        <ScrollView horizontal>
          {expensesForAnalytics.map((expense, index) => (
            <CustomExpense
              key={index}
              expense={expense}
              deleteItem={() => App.deleteExpense(String(expense.expenseId))}
            />
          ))}
        </ScrollView>
      </PaddedContainer>
    </GradientContainer>
  );
});

const styles = StyleSheet.create({
  tabBarTitle: {
    fontSize: 25,
    padding: 10,
    margin: 5,
    color: '#fff',
    fontFamily: 'Karla-Regular',
  },
  tabStyles: {
    // borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181824',
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
  buttonStyle: {
    width: 130,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Karla-Regular',
    fontSize: 15,
  },
});

export default AnalyticsScreen;

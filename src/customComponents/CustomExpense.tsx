/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Chip} from 'react-native-paper';
import PropTypes from 'prop-types';
import ExpandableText from './ExpandableText';

const styles = StyleSheet.create({
  expenseName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Karla-Regular',
    color: '#fff',
    marginVertical: 0,
  },
  money: {
    fontSize: 15,
    fontFamily: 'Karla-Regular',
    color: '#fff',
  },
  moneyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    marginBottom: 10,
    padding: 30,
    width: Dimensions.get('window').width / 2 - 25,
    borderWidth: 1.2,
    borderColor: '#e1f8ff',
    backgroundColor: '#1e1e2d',
    borderRadius: 15,
  },
  chipStyle: {
    height: 30,
    width: 100,
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
    backgroundColor: '#aad4e3',
  },
  chipText: {
    fontSize: 10,
    color: '#000',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  expandableText: {
    paddingLeft: 5,
    marginTop: 35,
    marginBottom: 5,
  },
});

const NewCustomExpense = ({
  expense,
  deleteItem,
  editItem,
}: {
  expense: any;
  deleteItem?: Function;
  editItem?: Function;
}) => {
  const getWayIcon = (way: String) => {
    switch (way) {
      case 'Cash':
        return <FontAwesome5 name="money-bill-wave" size={10} color="#000" />;
      case 'Debit_Card':
        return <FontAwesome5 name="credit-card" size={10} color="#000" />;
      case 'Bank':
        return <FontAwesome5 name="building" size={10} color="#000" />;
      case 'UPI':
        return <FontAwesome5 name="funnel-dollar" size={10} color="#000" />;
      case 'Credit_Card':
        return <FontAwesome5 name="money-check-alt" size={10} color="#000" />;
      case 'Net_Banking':
        return <FontAwesome5 name="network-wired" size={10} color="#000" />;
      default:
        return null;
    }
  };
  const getExpenseType = (type: String) =>
    type === 'Debit' ? (
      <Ionicons name="trending-down-outline" size={20} color="#000" />
    ) : (
      <Ionicons name="trending-up-outline" size={20} color="#000" />
    );
  return (
    <View
      style={[
        {
          marginVertical: 5,
          paddingHorizontal: 5,
          paddingBottom: 5,
          width: '100%',
          borderRadius: 5,
          backgroundColor:
            expense.expenseType === 'Debit' ? '#C46e5c44' : '#A6CF9844',
          borderWidth: 1,
          borderColor: expense.expenseType === 'Debit' ? '#DB7A67' : '#709E60',
        },
      ]}>
      <View
        style={{
          position: 'absolute',
          top: 5,
          left: 5,
          flexDirection: 'row',
        }}>
        <Chip
          mode="outlined"
          style={[styles.chipStyle]}
          icon={() => getExpenseType(expense.expenseType)}>
          <Text style={styles.chipText}>{expense.expenseType}</Text>
        </Chip>
        <Chip
          mode="outlined"
          style={styles.chipStyle}
          icon={() => getWayIcon(expense.expenseWay)}>
          <Text style={styles.chipText}>{expense.expenseWay}</Text>
        </Chip>
      </View>
      <ExpandableText
        customStyle={styles.expandableText}
        text={expense.description}
        value={`₹ ${expense.value}`}
      />
      <Text style={[styles.expenseName, {fontSize: 13, paddingLeft: 5}]}>
        {new Date(expense.date).toDateString()}
      </Text>
      {deleteItem && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteItem(expense.expenseId)}>
          <FontAwesome5 name="times-circle" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      {editItem && (
        <TouchableOpacity
          style={[styles.deleteButton, {right: 40, top: 6}]}
          onPress={() => editItem(expense)}>
          <FontAwesome5 name="edit" size={16} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default NewCustomExpense;

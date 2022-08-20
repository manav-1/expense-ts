/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import CustomExpense from './CustomExpense';
import PropTypes from 'prop-types';

const ExpenseAccordion = ({
  title,
  expenses,
  deleteExpenses,
  editItem,
}: {
  title: String;
  expenses: any[];
  deleteExpenses: Function;
  editItem: Function;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setExpanded(!expanded)}
        style={styles.accordionButton}>
        <Text style={styles.accordionTitle}>{title}</Text>

        <Ionicons
          color="#fff"
          size={24}
          name={expanded ? 'chevron-up' : 'chevron-down'}
        />
      </TouchableOpacity>
      {expanded ? (
        <ScrollView
          style={{
            display: 'flex',
            width: '100%',
          }}
          contentContainerStyle={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {expenses.map((expense, index) => (
            <CustomExpense
              key={index}
              expense={expense}
              editItem={editItem}
              deleteItem={deleteExpenses}
            />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    color: '#fff',
    fontFamily: 'Karla-Regular',
    fontSize: 20,
    marginBottom: 10,
  },
  accordionExpenseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  accordionContainer: {
    marginVertical: 20,
    width: '100%',
  },
});

ExpenseAccordion.propTypes = {
  title: PropTypes.string,
  expenses: PropTypes.array,
  deleteExpenses: PropTypes.func,
  editItem: PropTypes.func,
};

export default ExpenseAccordion;

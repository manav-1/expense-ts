/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTheme, Headline} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Logo1 = require('../../assets/logo1.png');
const Logo2 = require('../../assets/logo2.png');
const Logo3 = require('../../assets/logo3.png');
const Logo4 = require('../../assets/logo4.png');

const HomeScreen = ({navigation}: {navigation: any}) => {
  const logo = [Logo1, Logo2, Logo3, Logo4];
  const Logo = logo[Math.floor(Math.random() * logo.length)];
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accent + '66',
    },
    text: {
      fontSize: 40,
      fontFamily: 'NotoSansMono-Bold',
      position: 'absolute',
      bottom: 0,
      letterSpacing: -3,
      lineHeight: 45,
      color: colors.primary,
      textAlign: 'center',
    },
  });
  React.useEffect(() => {
    const checkLoggedIn = async () => {
      if (await AsyncStorage.getItem('expense_user')) {
        navigation.push('HomeNav');
      } else {
        navigation.push('Login');
      }
    };
    setTimeout(checkLoggedIn, 3000);
  }, [navigation]);
  return (
    <View style={[StyleSheet.absoluteFill, styles.textContainer]}>
      <Image
        source={Logo}
        style={{
          width: 250,
          height: 250,
          position: 'absolute',
          top: 100,
        }}
      />
      <Headline
        style={{
          position: 'absolute',
          top: 400,
          fontFamily: 'NotoSansMono-Regular',
          padding: 10,
          color: colors.primary,
          backgroundColor: colors.accent,
        }}>
        Expense Manager
      </Headline>
      <Text style={styles.text}>Take hold{'\n'}of your finance$</Text>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default HomeScreen;

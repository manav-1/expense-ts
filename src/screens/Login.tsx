/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {ExpenseClient} from '../axios/client';

import {snackbar} from '../state/snackbar';

// Styled Components
import {
  MainContainer,
  Title,
  Input,
  Button,
  ButtonText,
  Login,
  LoginContainer,
  BgImage,
  SignText,
  RowContainer,
  IconText,
} from '../customComponents/styledComponents';
import {observer} from 'mobx-react';

const source = {
  uri: 'https://images.unsplash.com/photo-1596679593281-41c14166a24a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=100',
};

const LoginScreen = observer(({navigation}: {navigation: any}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    (() => {
      navigation.addListener('beforeRemove', (e: {preventDefault: () => any}) =>
        e.preventDefault(),
      );
    })();
    const checkLoggedIn = async () => {
      if (await AsyncStorage.getItem('expense_user')) {
        navigation.push('HomeNav');
      }
    };
    checkLoggedIn();
  }, [navigation]);

  const handleLogin = async () => {
    const validationSchema = Yup.object({
      email: Yup.string().email().required('Please Enter your email'),
      password: Yup.string()
        .min(6, 'Please Enter more than  6 letters')
        .max(25)
        .required('Please Enter your password'),
    });
    validationSchema
      .validate({email, password})
      .then(async obj => {
        const {data} = await ExpenseClient.post('/auth/login', {
          userEmail: email,
          userPassword: password,
        });
        if (data.success) {
          await AsyncStorage.setItem('expense_user', data.data.token);
          navigation.push('HomeNav');
        }
      })
      .catch(err => {
        snackbar.openSnackBar(err.message);
      });
    // firebase.auth().createUserWithEmailAndPassword();
  };

  const handleGoogleLogin = async () => {
    snackbar.openSnackBar("Google Login isn't supported yet");
  };

  const handleFacebookLogin = async () => {
    snackbar.openSnackBar("Facebook login isn't supported yet");
  };
  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={source}
      resizeMode="cover">
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#000B',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        {/* <BgImage
          style={{ transform: [{ rotate: '-5deg' }, { scale: 1.2 }] }}
          source={Img}
        /> */}
        <MainContainer>
          <Title>Login Here</Title>
          <Input
            placeholder="Enter your username/ email"
            placeholderTextColor="#000A"
            value={email}
            onChangeText={(val: React.SetStateAction<string>) => setEmail(val)}
          />
          <Input
            placeholder="Enter your password"
            placeholderTextColor="#000A"
            value={password}
            onChangeText={(val: React.SetStateAction<string>) =>
              setPassword(val)
            }
          />
          <Button onPress={handleLogin}>
            <ButtonText>Login</ButtonText>
          </Button>
          <LoginContainer>
            <Login onPress={handleGoogleLogin}>
              <Ionicons name="logo-google" size={45} color="#182e28" />
              <IconText>Google</IconText>
            </Login>
            <Login onPress={handleFacebookLogin}>
              <Ionicons name="logo-facebook" size={45} color="#182e28" />
              <IconText>Facebook</IconText>
            </Login>
          </LoginContainer>
          <RowContainer>
            <SignText>Dont have an Account </SignText>
            <TouchableOpacity
              onPress={() => {
                navigation.push('Signup');
              }}>
              <SignText style={{color: '#fff', fontWeight: '700'}}>
                Sign Up
              </SignText>
            </TouchableOpacity>
          </RowContainer>
        </MainContainer>
      </View>
    </ImageBackground>
  );
});

export default LoginScreen;

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {snackbar} from '../state/snackbar';
// import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
// import Img from '../../assets/abstract-6.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {ExpenseClient} from '../axios/client';

const source = {
  uri: 'https://images.unsplash.com/photo-1623911381192-5936d58af80a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=100',
};

const SignupScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    (() => {
      navigation.addListener('beforeRemove', (e: {preventDefault: () => any}) =>
        e.preventDefault(),
      );
    })();
  }, [navigation]);
  const handleSignup = async () => {
    const validationSchema = Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email().required('Please Enter your email'),
      password: Yup.string()
        .min(6, 'Please Enter more than  6 letters')
        .max(25)
        .required('Please Enter your password'),
    });
    validationSchema
      .validate({email, password, name})
      .then(async obj => {
        const userData = {
          userName: obj.name,
          userEmail: obj.email,
          userPassword: obj.password,
        };
        const {data} = await ExpenseClient.post('/auth/signup', userData);
        if (data.success) {
          await AsyncStorage.setItem('expense_user', data.data.token);
          snackbar.openSnackBar('Signup Successful');
          navigation.push('Login');
        }
      })
      .catch(err => {
        snackbar.openSnackBar(err.message);
      });
  };
  const handleGoogleLogin = async () => {
    snackbar.openSnackBar('Google Login Coming Soon');
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
          style={{ transform: [{ rotate: '5deg' }, { scale: 1.2 }] }}
          source={Img}
        /> */}
        <MainContainer>
          <Title>SignUp Here</Title>
          <Input
            placeholder="Enter your name"
            placeholderTextColor="#000A"
            value={name}
            onChangeText={(val: React.SetStateAction<string>) => setName(val)}
          />
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
          <Button onPress={handleSignup}>
            <ButtonText>Sign Up</ButtonText>
          </Button>
          <LoginContainer>
            <Login onPress={handleGoogleLogin}>
              <Ionicons name="logo-google" size={40} color="#e3b1c6" />
              <IconText>Google</IconText>
            </Login>
            <Login onPress={handleFacebookLogin}>
              <Ionicons name="logo-facebook" size={40} color="#e3b1c6" />
              <IconText>Facebook</IconText>
            </Login>
          </LoginContainer>
          <RowContainer>
            <SignText>Already have an account </SignText>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <SignText style={{color: '#fff', fontWeight: '700'}}>
                Login
              </SignText>
            </TouchableOpacity>
          </RowContainer>
        </MainContainer>
      </View>
    </ImageBackground>
  );
};

SignupScreen.propTypes = {
  navigation: PropTypes.object,
};
export default SignupScreen;

import {StatusBar, Text} from 'react-native';
import * as React from 'react';
import {DefaultTheme, Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/HomeStack';
import {snackbar} from './src/state/snackbar';
import {Snackbar} from 'react-native-paper';
import {observer} from 'mobx-react';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#181D31',
    accent: '#678983',
  },
};
const App = observer(() => {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <StackNavigation />
        <StatusBar hidden />
        <Snackbar
          visible={snackbar.open}
          duration={3000}
          style={{backgroundColor: '#e1f8ff'}}
          onDismiss={() => snackbar.closeSnackBar()}>
          <Text style={{color: '#000'}}>{snackbar.text}</Text>
        </Snackbar>
      </NavigationContainer>
    </Provider>
  );
});

export default App;

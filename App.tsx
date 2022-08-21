import {StatusBar, Text} from 'react-native';
import * as React from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/HomeStack';
import {snackbar} from './src/state/snackbar';
import {Snackbar} from 'react-native-paper';
import {observer} from 'mobx-react';
import {Appearance} from 'react-native';
import {darkTheme, lightTheme} from './src/state/theme';

const App = observer(() => {
  return (
    <Provider
      theme={Appearance.getColorScheme() === 'light' ? lightTheme : darkTheme}>
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

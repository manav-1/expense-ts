import {DefaultTheme} from 'react-native-paper';
const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primaryBackground: '#181824',
    primaryHeading: '#fff',
    primaryText: '#000',
    primary: '#181d31',
    accent: '#678983',
    secondary: '',
    graphColorPrimary: '#ffc290',
    graphColorSecondary: '#e1f8ff',
    creditBackground: '',
    creditBorder: '',
    debitBackground: '',
    debitBorder: '',
    chipBackground: '',
    chipText: '',
    wayChartColors: [
      '#FFA290',
      '#FFB290',
      '#FFC290',
      '#FFD290',
      '#FFE290',
      '#FFF290',
    ],
  },
};
const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primaryBackground: '#181824',
    primaryHeading: '#fff',
    primaryText: '#000',
    secondary: '',
    primary: '#181d31',
    accent: '#678983',
    graphColorPrimary: '#ffc290',
    graphColorSecondary: '#e1f8ff',
    creditBackground: '',
    creditBorder: '',
    debitBackground: '',
    debitBorder: '',
    chipBackground: '',
    chipText: '',
    wayChartColors: [
      '#FFA290',
      '#FFB290',
      '#FFC290',
      '#FFD290',
      '#FFE290',
      '#FFF290',
    ],
  },
};

export type Theme = {
  primaryBackground: string;
  primaryHeading: string;
  primaryText: string;
  secondary: string;
  primary: string;
  accent: string;
  graphColorPrimary: string;
  graphColorSecondary: string;
  creditBackground: string;
  creditBorder: string;
  debitBackground: string;
  debitBorder: string;
  chipBackground: string;
  chipText: string;
  wayChartColors: string[];
};
export {lightTheme, darkTheme};

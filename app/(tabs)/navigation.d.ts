// navigation.d.ts

import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined; // ou qualquer tipo de parâmetro que você deseja passar
  Cadastro: undefined; // ou qualquer tipo de parâmetro que você deseja passar
  Main: undefined; // ou qualquer tipo de parâmetro que você deseja passar
};

// Defina a navegação como um tipo
export type RootStackNavigationProp = NavigationProp<RootStackParamList>;

import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import CadastroScreen from './CadastroScreen';
import Homescreen from '../Homescreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Home" component={Homescreen} />
    </Stack.Navigator>
  );
}

export default App;

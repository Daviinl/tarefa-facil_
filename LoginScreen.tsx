import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { makeRedirectUri } from 'expo-auth-session';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

const firebaseConfig = {
  apiKey: "AIzaSyDkcK2BdLytBB1YlhS7FB5Y6rOXbK-0Xqk",
  authDomain: "tarefa-facil-00.firebaseapp.com",
  projectId: "tarefa-facil-00",
  storageBucket: "tarefa-facil-00.appspot.com",
  messagingSenderId: "303747806577",
  appId: "1:303747806577:web:256360c526451e0f2c32d0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface Props {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com', // Substitua pelo seu client ID
    redirectUri: makeRedirectUri(),
  });

  useEffect(() => {
    const saveUserToken = async (token: string) => {
      try {
        await AsyncStorage.setItem('userToken', token);
      } catch (error) {
        console.error('Erro ao salvar o token:', error);
      }
    };

    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          console.log('Usuário logado com sucesso:', userCredential.user);
          const token = await userCredential.user.getIdToken();
          await saveUserToken(token);
          navigation.navigate('Main'); // Navega para a tela principal após o login
        })
        .catch((error) => {
          console.error('Erro no login:', error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/iconetarefa.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.googleButton}
        disabled={!request}
        onPress={() => promptAsync()}>
        <Ionicons name="logo-google" size={20} color="white" style={styles.googleIcon} />
        <Text style={styles.buttonText}>Entrar com o Google</Text>
      </TouchableOpacity>

      {/* Texto "Ou" entre o botão do Google e o campo de email */}
      <Text style={styles.orText}>Ou</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <View style={styles.linkContainer}>
        <Text style={styles.noAccountText}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Cadastre-se!</Text>
        </TouchableOpacity>
      </View>

      {/* Botão "Entrar" com estilo azul escuro e texto branco */}
      <TouchableOpacity
        style={styles.enterButton}
        onPress={() => console.log('Entrar pressionado')}>
        <Text style={styles.enterButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
  },
  logo: {
    marginBottom: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#ccc', 
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 5,
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  googleIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#A9A9A9', // Cor cinza
    marginVertical: 10,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10,
  },
  noAccountText: {
    color: 'black',
  },
  linkText: {
    color: '#0000FF',
    fontWeight: 'bold',
  },
  enterButton: {
    backgroundColor: '#00008B', // Azul escuro
    borderRadius: 5,
    width: '100%',
    padding: 15,
    alignItems: 'center',
    marginTop: 20, // Espaçamento entre "Cadastre-se" e "Entrar"
  },
  enterButtonText: {
    color: 'white', // Texto branco
    fontWeight: 'bold',
  },
});

export default LoginScreen;

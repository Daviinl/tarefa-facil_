import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from './firebaseConfig'; // Importe o auth do arquivo de configuração
import { signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { makeRedirectUri } from 'expo-auth-session';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const redirectUri = makeRedirectUri({
  scheme: 'myapp',
});

const LoginScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com', // Substitua pelo seu Client ID
    redirectUri,
  });

  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para a mensagem de sucesso

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
          const token = await userCredential.user.getIdToken();
          await saveUserToken(token);
          setSuccessMessage("Logado com sucesso!"); // Define a mensagem de sucesso
          setTimeout(() => {
            setSuccessMessage(null); // Remove a mensagem após 3 segundos
          }, 3000);
          navigation.navigate('Home'); // Navega para a tela principal após o login
        })
        .catch((error) => {
          console.error('Erro no login:', error);
        });
    }
  }, [response]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        await AsyncStorage.setItem('userToken', token);
        setSuccessMessage("Logado com sucesso!"); // Define a mensagem de sucesso
        setTimeout(() => {
          setSuccessMessage(null); // Remove a mensagem após 3 segundos
        }, 3000);
        navigation.navigate('Home'); // Navega para a tela principal após o login
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
        // Você pode adicionar uma mensagem de erro aqui se desejar
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/iconetarefa.png')} style={styles.logo} />
      {successMessage && ( // Renderiza a mensagem de sucesso se existir
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
      <TouchableOpacity style={styles.googleButton} disabled={!request} onPress={() => promptAsync()}>
        <Ionicons name="logo-google" size={20} color="white" style={styles.googleIcon} />
        <Text style={styles.buttonText}>Entrar com o Google</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Ou</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        autoCapitalize="none"
        value={senha}
        onChangeText={setSenha}
      />
      <View style={styles.linkContainer}>
        <Text style={styles.noAccountText}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.enterButton} onPress={handleLogin}>
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
  successMessage: {
    color: 'green', // Cor verde para a mensagem de sucesso
    fontSize: 16,
    marginVertical: 10, // Espaçamento acima e abaixo da mensagem
  },
});

export default LoginScreen;

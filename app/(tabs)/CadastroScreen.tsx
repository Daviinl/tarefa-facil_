// CadastroScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig'; // Importando o auth

const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para a mensagem de sucesso

const CadastroScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmada, setSenhaConfirmada] = useState('');

  const handleCadastro = async () => {
    if (senha !== senhaConfirmada) {
      console.error("As senhas não coincidem!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      console.log('Usuário cadastrado:', userCredential.user);
      setSuccessMessage("Cadastro realizado com Sucesso"); // Define a mensagem de sucesso
          setTimeout(() => {
            setSuccessMessage(null); // Remove a mensagem após 3 segundos
          }, 3000);
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('userToken', token);

    
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backToLoginContainer}>
        <Ionicons name="arrow-back" size={20} color="#0000FF" style={styles.backIcon} />
        <Text style={styles.backToLoginText}>Voltar para Login</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        value={senhaConfirmada}
        onChangeText={setSenhaConfirmada}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F3F3FF",
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 16,
      paddingTop: 80,
    },
    backToLoginContainer: {
      position: 'absolute',
      top: 40,
      left: 20,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    backIcon: {
      marginRight: 5,
    },
    backToLoginText: {
      color: '#0000FF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    title: {
      fontSize: 24,
      marginTop: 30,
      marginBottom: 20,
    },
    input: {
      width: 300,
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 5,
      paddingHorizontal: 20,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    button: {
      backgroundColor: '#00008B',
      width: 300,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  }
  
);

export default CadastroScreen;

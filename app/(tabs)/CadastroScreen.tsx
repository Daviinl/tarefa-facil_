import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Utilize o hook useNavigation

const CadastroScreen: React.FC = () => {
  const navigation = useNavigation(); // Obtenha a prop navigation
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    console.log('Usuário cadastrado:', email, senha);
    // Implementação da lógica de cadastro
  };

  return (
    <View style={styles.container}>
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
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      {/* Botão de Cadastrar */}
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Botão de Voltar para Login */}
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    justifyContent: 'flex-start', // Mover para o topo
    alignItems: 'center',
    padding: 16,
    paddingTop: 80, // Espaçamento do topo
  },
  title: {
    fontSize: 24,
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
    backgroundColor: '#6200EE', // Cor de fundo roxa
    width: 300,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10, // Espaçamento entre os botões
  },
  buttonText: {
    color: '#FFF', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFF', // Cor de fundo branca para o botão secundário
    borderWidth: 1,
    borderColor: '#6200EE', // Cor da borda roxa
  },
  secondaryButtonText: {
    color: '#6200EE', // Texto roxo para o botão secundário
  },
});

export default CadastroScreen;

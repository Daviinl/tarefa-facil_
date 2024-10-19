// Homescreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Homescreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3FF',
  },
  title: {
    fontSize: 24,
  },
});

export default Homescreen;

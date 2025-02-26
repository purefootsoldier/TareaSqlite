import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("El valor es :  \n" + result);
  } else {
    alert('No hay valores almacenados bajo esa clave');
  }
}

async function deleteValueFor(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    alert('Valor eliminado.');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

export default function App() {
  const [key, onChangeKey] = useState('Llave');
  const [value, onChangeValue] = useState('Valor');
  const [getKey, onChangeGetKey] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Securestoree</Text>
      <Text style={styles.paragraph}>Ingrese la clave y el valor que desea almacenar</Text>

      <TextInput
        style={styles.textInput}
        clearTextOnFocus
        onChangeText={(text) => onChangeKey(text)}
        value={key}
      />
      <TextInput
        style={styles.textInput}
        clearTextOnFocus
        onChangeText={(text) => onChangeValue(text)}
        value={value}
      />

      <Button
        title="Guardar"
        onPress={() => {
          save(key, value);
          onChangeKey('Llave');
          onChangeValue('Valor');
        }}
      />

      <Text style={styles.paragraph}>Ingrese la clave para el valor que desea eliminar</Text>
      <Button
        title="Eliminar"
        onPress={() => {
          deleteValueFor(key);
          onChangeKey();
        }}
      />

      <Text style={styles.paragraph}>Enter your key </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => onChangeGetKey(text)}
        value={getKey}
        placeholder="Ingrese la clave para el valor que desea obtener"
      />
      <Button
        title="Obtener"
        onPress={() => {
          getValueFor(getKey);
          onChangeGetKey('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 4,
  },
});
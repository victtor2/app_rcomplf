import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({navigation}: any) {

    const [email, setemail] = useState("")
    const [contrasenia, setcontrasenia] = useState("")

    // Función para validar email
    const validateEmail = (email: string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
     };

    function login(){

        // Validar email
        if (!validateEmail(email)) {
            Alert.alert("Error", "El email no tiene un formato válido.");
            return;
        }
  
      // Validar contraseña (mínimo 6 caracteres)
        if (contrasenia.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        // Iniciar sesión en Firebase
        signInWithEmailAndPassword(auth, email, contrasenia)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigation.navigate("Drawer")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

  return (
    <View>
      <Text>LOGIN</Text>
        <TextInput 
            placeholder='Ingresar su email'
            style={styles.input}
            onChangeText={(texto) => setemail(texto)}
            value={email}
        />

        <TextInput 
            placeholder='Ingresar su contraseña'
            style={styles.input}
            onChangeText={(texto) => setcontrasenia(texto)}
            value={contrasenia}
        />
        <Button 
            title='login' 
            onPress={() => login()}   
        />
        <Text onPress={()=> navigation.navigate("Register")}>¿Tienes una cuenta? Registrate aquí</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        margin: 10,
        fontSize: 20
      }
})
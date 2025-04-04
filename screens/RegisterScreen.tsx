import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegisterScreen({navigation}: any) {

    const [email, setemail] = useState("")
    const [contrasenia, setcontrasenia] = useState("")

    function register(){
        createUserWithEmailAndPassword(auth, email, contrasenia)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        navigation.navigate("Login")
        //console.log(user.uid);
        
        // ...
     })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
     });
    }

  return (
    <View>
          <Text>REGISTER</Text>
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
                title='Register' 
                onPress={() => register()}
                color={'green'} 
            />
        </View>
  )
}

const styles = StyleSheet.create({
    input:{
        borderWidth:3,
        margin:10,
        fontSize:18,
        width:"80%"
      },
})
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, get, set } from 'firebase/database';
import { auth, db } from '../config/Config';
import { onAuthStateChanged } from "firebase/auth";

export default function ScoreScreen() {
    const [id, setid] = useState("")
    const [game, setgame] = useState("")
    const [score, setscore] = useState("")
    const [date, setdate] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            
            setid(uid);
            console.log(uid);
            

            // ...
          } else {
            // User is signed out
            // ...
          }
        });

    }, [])
    

    function save ( ){

      // Validaciones
  if (!game.trim()) {
    Alert.alert("⚠️ Campo requerido", "Por favor ingresa el nombre del juego.");
    return;
  }

  if (!score.trim()) {
    Alert.alert("⚠️ Campo requerido", "Por favor ingresa el puntaje.");
    return;
  }

  if (isNaN(Number(score))) {
    Alert.alert("⚠️ Puntaje inválido", "El puntaje debe ser un número.");
    return;
  }

  if (!date.trim()) {
    Alert.alert("⚠️ Campo requerido", "Por favor ingresa la fecha.");
    return;
  }

      const scoresRef = ref(db, `gamers/${id}/scores`);
      get(scoresRef).then((snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : {};
        const count = Object.keys(data).length;
        const nuevoId = `score${count + 1}`;

        set(ref(db, 'gamers/' + id + '/scores/' + nuevoId), {
            game: game,
            score: score,
            date: date,
            
        }).then(() => {
          Alert.alert("✅ Guardado", `Tu score fue guardado como ${nuevoId}`);
          // Limpia los campos
          setgame("");
          setscore("");
          setdate("");
        }).catch((error) => {
          Alert.alert("❌ Error", "No se pudo guardar el score.");
        });
      }).catch((error) => {
        Alert.alert("❌ Error", "No se pudo leer la base de datos.");
      });
   
    }


  return (
    <View>
      <Text style={styles.title}>Save Score</Text>

        <TextInput
        placeholder="ID"
        style={styles.input}
        onChangeText={(texto) => setid(texto)}
        value={id}
        editable={false}
        />

        <TextInput
        style={styles.input}
        placeholder="Name Game"
        onChangeText={(texto) => setgame(texto)}
        value={game}       
        />

        <TextInput
        style={styles.input}
        placeholder="Score Store"
        onChangeText={(texto) => setscore(texto)}
        value={score}
        keyboardType="numeric"
        />

        <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={date}
        onChangeText={(texto) => setdate(texto)}
        />

        <Button title="Save Score" onPress={ () => save()} />
    </View>
  )
}

const styles = StyleSheet.create({

    title: {
        fontSize: 22,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center'
      },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        fontSize: 16
      },
    container: {
        padding: 20,
        marginTop: 30
      },
})
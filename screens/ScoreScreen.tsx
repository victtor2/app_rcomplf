import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { ref, set } from 'firebase/database';
import { db } from '../config/Config';


export default function ScoreScreen() {
    const [id, setid] = useState("")
    const [game, setgame] = useState("")
    const [score, setscore] = useState("")
    const [date, setdate] = useState("")

    function save ( ){
        set(ref(db, 'gamers/' + id), {
            game: game,
            score: score,
            date: date,
            
        });
    }


  return (
    <View>
      <Text style={styles.title}>Save Score</Text>

        <TextInput
        style={styles.input}
        placeholder="ID"
        value={game}
        onChangeText={setid}
        />

        <TextInput
        style={styles.input}
        placeholder="Name Game"
        value={game}
        onChangeText={setgame}
        />

        <TextInput
        style={styles.input}
        placeholder="Score Store"
        value={score}
        onChangeText={setscore}
        keyboardType="numeric"
        />

        <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={date}
        onChangeText={setdate}
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
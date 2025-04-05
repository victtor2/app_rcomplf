import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, onValue } from "firebase/database";
import { auth, db } from '../config/Config';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function RecordScreen({navigation}:any) { 

    const [uid, setuid] = useState("")
    const [datos, setdatos] = useState([])

    const [totalScore, setTotalScore] = useState(0);
    const [promedio, setPromedio] = useState(0);

    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
                  if (user) { 
                    const UID = user.uid;
                    setuid(UID);
                    
                  } else {
            
                  }
                });
    }, [])

    useEffect(() => {
        leer()


    }, [uid])
    
    
    function logout(){
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        setuid("")
        setdatos([])
        navigation.navigate("Stack")

        }).catch((error) => {
        // An error happened.
        });
    }


    function leer() {
        const scoresRef = ref(db, 'gamers/' + uid + '/scores');
        onValue(scoresRef, (snapshot) => {
          const data = snapshot.val();
          if (!data) return;
      
          let records = [];
          let suma = 0;
          let cantidad = 0;
      
          for (let key in data) {
            const item = { id: key, ...data[key] };
            records.push(item);
      
            // Verificamos que el score sea un número antes de sumarlo
            const puntuacion = parseFloat(item.score); // Nos aseguramos de convertirlo a número
      
            if (!isNaN(puntuacion)) {
              suma += puntuacion;
              cantidad++;
            }
          }
      
          // Calculamos el promedio solo si tenemos puntajes
          const promedioFinal = cantidad > 0 ? parseFloat((suma / cantidad).toFixed(2)) : 0;
      
          setdatos(records as any);
          setTotalScore(suma); // Guardamos la suma total de los scores
          setPromedio(promedioFinal); // Guardamos el promedio calculado
        });
      }
      


  return (
    <View>
      <Text>RecordScreen</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}>
        Total de puntos: {totalScore}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}>
        Promedio de puntuación: {promedio}
        </Text>
      <FlatList 
        data={ datos}
        renderItem={({item}: any) => 
        <Text>{item.score}</Text>
        }
      />
      <Button title='Cerrar Sesión' onPress={()=> logout()} color={'red'} />
    </View>
  )
}

const styles = StyleSheet.create({})
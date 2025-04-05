import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, onValue } from "firebase/database";
import { auth, db } from '../config/Config';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function RecordScreen({navigation}:any) { 

    const [uid, setuid] = useState("")
    const [datos, setdatos] = useState([])
    
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


    function leer(){
        const starCountRef = ref(db, 'gamers/' + uid);
                onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                //console.log(data);
                let record = []
                for(let key in data){
                    record.push( {id: key, ...data[key]})
                }

                setdatos(record as any)

                });

    }


  return (
    <View>
      <Text>RecordScreen</Text>
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
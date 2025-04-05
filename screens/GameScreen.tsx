import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tarjeta  from '../components/Tarjeta';

export default function GameScreen() {

    const [data, setData] = useState("")

    useEffect(() => {
        getData()
        //console.log(data);
        
    }, [])
    
    // LEER API
    const getData = async () => {
        try{
            const resp = await fetch('https://jritsqmet.github.io/web-api/videojuegos.json');
            const json = await resp.json();
            setData(json.videojuegos);
        }catch(err){

        }
    }

    return (
        <View>
        <Text>LISTA VIDEOJUEGOS</Text>
        <FlatList
            data={data}
            renderItem={ ( {item} )=>
            <Tarjeta games = {item} />
            }
        />
    </View>
    )
}

const styles = StyleSheet.create({})
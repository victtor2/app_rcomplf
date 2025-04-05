import { Alert, Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function Tarjeta( props : any) {
    //console.log(props.games.titulo);
    const [modalVisible, setmodalVisible] = useState(false)

    function detalles(desarrollador: String, opiniones: String){
        Alert.alert("Creador: " + desarrollador, "Opinión: " + opiniones);
      }

  return (
    
    <TouchableOpacity 
    style={styles.btn}
    /*onPress={() => detalles(
        props.games.desarrollador,
        props.games.opiniones?.opiniones_positivas?.detalles?.[0]?.opinion ?? 'No disponible'
    )}*/
    onPress={ () => setmodalVisible(true)}
    >
        <Text>{props.games.titulo}</Text>
        <Image 
            source={{ uri: props.games.imagen}}
            style={styles.img}
        />
        <Text>$ {props.games.precio}</Text>
        <Text>{props.games.plataforma}</Text>
        <Modal visible={modalVisible} transparent={true}>
            <View style={styles.modal}>
                <Text style={{fontSize:30, textAlign:'center'}}>{props.games.titulo}</Text>
                <Image 
                    source={{ uri: props.games.imagen}}
                    style={styles.imgc}
                />
                <Text style={{fontSize:30, textAlign:'center'}}>Creado por: {props.games.desarrollador}</Text>
                <Text style={styles.modalText}>
                    Opinión: {props.games.opiniones.opiniones_positivas.detalles[0].opinion}
                </Text>
                <Button title='Salir' onPress={() => setmodalVisible(false)}/>
            </View>
        </Modal>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    img:{
        width: 100,
        height: 100
    },
    imgc:{
        width: 300,
        height: 300,
        margin: 'auto'
        
    },
    btn:{
        backgroundColor: "6666",
        margin: 20
    },
    modal: {
        backgroundColor: "18a117",
        justifyContent:'center',
        flex:1,
        alignItems: 'center'
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    }
})
import { Imge, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Form from '../components/Form'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function login() {
  return (
   <SafeAreaView style={styles.container}edges={['top', 'bottom']}>
    
     
        <Form></Form>
    
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
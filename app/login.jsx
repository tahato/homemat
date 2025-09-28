import { Imge, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Form from '../components/Form'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function login() {
  return (
   <SafeAreaView style={{flex:1}} edges={['top', 'bottom']} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={[{ flex: 1 ,width:'100%'},styles.container]}
                    
                >
        <Form></Form>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
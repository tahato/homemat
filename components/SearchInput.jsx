import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import React from 'react'

export default function SearchInput() {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
        <EvilIcons name='search' size={30}/>
        </TouchableOpacity>
        <TextInput className='flex-1  text-xl mx-2'  style={{flex:1}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#F5F5F5",
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:20,
    margin:15,
    padding:2,
    elevation:7
  }
})
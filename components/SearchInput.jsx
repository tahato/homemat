import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function SearchInput({search,setSearch}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <EvilIcons name='search' size={30} />
      </TouchableOpacity>
      <TextInput
        style={{ flex: 1 }}
        value={search}
        onChangeText={setSearch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    margin: 15,
    marginTop: 0,
    padding: 2,
    elevation: 7
  }
})
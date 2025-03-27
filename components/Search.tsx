import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
type Props = {
    placeholder?: string;
    onPress?: () => void;
}


const Search = ({placeholder, onPress} : Props) => {
  return (
    <View style={styles.searchbar}>
      <TextInput style={styles.input} placeholder='Tìm kiếm'/>
      <TouchableOpacity style={styles.btnSearch}>
        <Ionicons name='search' color = {'white'} size = {30}/>
      </TouchableOpacity>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    input:{
        borderWidth: 0,
        borderRadius: 12,
        flex: 1,
        backgroundColor: '#F1F2F6',
    },
    btnSearch: {
        borderRadius: 12,
        backgroundColor: '#F27657',
        height: 50,
        width: 50,
        justifyContent:'center',
        alignItems:'center',

    },
    searchbar: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent:'space-between',
        gap: 10,
        color: 'red',
    }

})


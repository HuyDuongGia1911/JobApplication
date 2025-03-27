import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
const jobDescription = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity style={styles.buttons} onPress={() => router.push("/")}>
          <Ionicons name='arrow-back' size={24}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={() => router.push("/")}>
          <Ionicons name='share-social' size={24}/>
        </TouchableOpacity>
      </View>
      <View style={styles.jobImageContainer}>
        <Image 
          style = {styles.jobImage}
          source={require('@/assets/images/anh.png')} 
        />
      </View>
    </View>
  )
}

export default jobDescription

const styles = StyleSheet.create({
  container: {
    
    paddingHorizontal: 30,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    borderWidth: 0,
    height: 40,
    width: 40,
    backgroundColor: '#e8e8e8',
    borderRadius: 4,
    //giua ngang
    alignItems: 'center',
    // giua doc
    justifyContent: 'center',
  },
  jobImage: {
    height: 40,
    width: 40,
    alignContent: 'center',
    justifyContent: 'center',
  },
  jobImageContainer: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'purple',
  },
});
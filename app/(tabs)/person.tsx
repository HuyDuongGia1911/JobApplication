import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
const person = () => {
   return (
      <>
          <Stack.Screen options={{headerShown: false}}/>
          <View style={styles.container}>
            <View style={styles.topView}>
              <TouchableOpacity style={styles.menu} onPress={() => router.push('/(events)/jobDescription')}>
              <Ionicons name = 'menu' color={'black'} size={24}/>
              </TouchableOpacity>
              <Image style = {styles.avatar}
                source={require('@/assets/images/anh.png')}
              />
            </View>
            <View>
              <Text style={styles.hello}>Hello Test</Text>
              <Text style={styles.hello2}>Tìm công việc của bạn</Text>
            </View>
          </View>
      </>
    )
}

export default person

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9FB',
    paddingHorizontal: 30,
  },
  menu: {
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
  avatar: {
 
    height: 40,
    width: 40,
    borderRadius: 3,

  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    marginVertical: 10,
  },
  hello: {
    fontFamily: 'Arial',
    fontSize: 35,
  },
  hello2: {
    fontFamily: 'Arial',
    fontWeight: '800',
    fontSize: 35,
  },
})
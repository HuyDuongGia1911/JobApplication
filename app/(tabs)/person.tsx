import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const person = () => {
  
  const [editField, setEditField] = useState<null | 'phone' | 'email' | 'password'>(null);
  const [phone, setPhone] = useState('9999 9999')
  const [email, setEmail] = useState('test@gmail.com')
  const [password, setPassword] = useState({current: '', new:'', confirm:''})


  const handleSave = ()=>{
    if (editField ==='password'){
      if (password.new !== password.confirm){
        Alert.alert('Error', 'Password does not match')
        return
      }
      Alert.alert('Success', 'Password updated successfully')
      setPassword({current:'', new:'', confirm:''})
    }
    setEditField(null)
  }

   return (
      <>
        <Stack.Screen options={{headerShown: false}}/>
          
          <View style={styles.container}>

            <View style = {styles.avatarSection}>
              <View>
                <Image style= {styles.avatar} source={require('@/assets/images/favicon.png')} />
                <TouchableOpacity style = {styles.editAvatar}>
                  <Feather  name= "camera" size={18} color="#fff" />
                </TouchableOpacity>
              </View>

              <Text style ={styles.name}> Hoang Bao </Text>
            </View>

            <Text style= {styles.editProfile}> Edit Profile</Text>
            <View style ={styles.infoBox}>
              <Text> Phone number</Text>
              <View style ={styles.inputRow}>
                <Text style = {styles.input}> {phone}</Text>
                <TouchableOpacity onPress= {() => setEditField('phone')}>
                    <Feather name = "edit-2" size={16} color ="#333" />
                </TouchableOpacity>
              </View>
            </View>

            <View style ={styles.infoBox}>
              <Text style = {styles.label}> Password </Text>
              <View style ={styles.inputRow} >
                <Text style ={styles.iput}> ***** </Text>
                <TouchableOpacity onPress={() => setEditField('password')}>
                  <Feather name = "edit-2" size={16} color ="#333" />   
                </TouchableOpacity>
              </View>
            </View>
            
            <View style ={styles.infoBox}>
              <Text style = {styles.label}> Email </Text>
              <View style ={styles.inputRow}>
                <Text>*****</Text>
                <TouchableOpacity onPress ={() => setEditField('email')}>
                  <Feather name = "edit-2" size={16} color ="#333" />
                </TouchableOpacity>
              </View>
            </View>
          <TouchableOpacity style={styles.bottomRow}>
            <Text style={styles.bottomText}>Setting</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </TouchableOpacity>
            
            {/* visible: xem modal co hien thi hay khong */}
            {/* !!editFiled chuyen doi thanh boolean, neu khac null => true else false */}
          <Modal visible = {!!editField} transparent animationType="slide">
            <View style = {styles.modalContainer}>
              <View>
              {editField === 'phone'
                  ? 'Edit Phone Number'
                  : editField === 'email'
                  ? 'Edit Email'
                  : 'Change Password'}
              </View>
              
              {editField === ''}
            </View>
          </Modal>


          </View>
      </>
    )
}

export default person

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  editAvatar: {
    position: 'absolute', //can chinh theo vi tri phan tu cha gan nhat
    bottom: 0,
    right :0,
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 5, //tao khoang cach giua cac canh cua phan tu
    
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  editProfile: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#000',

  },
  infoBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,

  }
})
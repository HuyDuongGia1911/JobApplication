import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, {useState} from 'react'

import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'


const jobDescription = () => {
  const [selected, setSelected] = useState(0);
  
    const Switch_Selected = async ( index : number) => {
      setSelected(index);
    }
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
      <View style = {styles.jobTitleBox}>
        <Text style={styles.jobTitleText}>Software Engineer</Text>
      </View>
      <View style ={styles.companyInfoBox}>
        <Text style = {styles.companyInfoText}>GIAHU /</Text>
        <Ionicons style = {styles.companyInfoText2} name='location' size={24}/>
        <Text style = {styles.companyInfoText2}>US</Text>
      </View>
      <View style = {styles.tabs}>
        <TouchableOpacity style={[styles.tabBox, selected === 0 ? styles.tabActive : styles.tabNormal]} onPress={() => Switch_Selected(0)}>
          <Text style={[selected === 0 ? styles.tabActiveText : styles.tabNormalText]}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBox, selected === 1 ? styles.tabActive : styles.tabNormal]} onPress={() => Switch_Selected(1)}>
        <Text style={[selected === 1 ? styles.tabActiveText : styles.tabNormalText]}>Qualification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBox, selected === 2 ? styles.tabActive : styles.tabNormal]} onPress={() => Switch_Selected(2)}>
        <Text style={[selected === 2 ? styles.tabActiveText : styles.tabNormalText]}>Responsibility</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.contentTab}>
        {selected === 0 ? (
          <View>
            <Text>1</Text>
            <Text>1</Text>
            <Text>1</Text>
            <Text>1</Text>
            <Text>1</Text>
          </View>
        )
          : selected === 1 ?(
            <Text>2</Text>
            
          )
          : (
            <Text>3</Text>
          )
        }
      </View>
      <View>
        <TouchableOpacity><Text>Tim</Text></TouchableOpacity>
        <TouchableOpacity><Text>Apply for job</Text></TouchableOpacity>
      </View>
    </View>
  )
}

export default jobDescription

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: '#fff',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobImage: {
    height:'100%',
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
  jobImageContainer: {
    marginTop: 40,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'black',
    marginBottom: 20,
  },
  jobTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  jobTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  companyInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  companyInfoText: {
    fontSize: 15,
  },
  companyInfoText2: {
    fontSize: 15,
    textShadowColor: 'black',
    color: '#a9a9a9'
  },
  tabs:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: "center",
    gap: 10,
  },
  tabBox: {
    borderWidth: 0,
    borderRadius: 10,
    height: 40,
    width: "100%",
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,
    
  },
  tabNormal:{
    backgroundColor: '#EEEEEE'
  },
  tabNormalText:{
    color: '#AAAAAA'
  },
  tabActive:{
    backgroundColor: '#2F264F'
  },
  tabActiveText:{
    color: 'white',
  },

  contentTab:{
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    padding: 10,
    height: 600,
  }
})
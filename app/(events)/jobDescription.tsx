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
        <View style={styles.headerContainer}>
        <View style={styles.jobImageContainer}>
          <Image 
            style = {styles.jobImage}
            source={require('@/assets/images/anh.png')} 
          />
        </View>
        <View style = {styles.companyName}>
          <Text style={styles.companyNameText}>GIAHU</Text>
        </View>
        <View style={styles.jobInfoContainer}>
          <View style={styles.jobInfoBox}>
            <Text style={styles.jobInfoText}>Software Engineer</Text>
          </View>
          <View style={styles.jobInfoBox}>
          <Text style={styles.jobInfoText}>Full-time</Text>
          </View>
        </View>
        <View style ={styles.companyInfoBox}>
          <View>
            <Text style={styles.companyInfoText}>$ 160.000/Year</Text> 
          </View>
          <View style={styles.companyLocation}> 
            <Text style = {styles.companyInfoText}>TDM /</Text>
            <Ionicons style = {styles.companyInfoText2} name='location' size={24}/>
            <Text style = {styles.companyInfoText2}>BinhDuong</Text>
          </View>
        </View>
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
            <Text>test</Text>
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
      <View style = {styles.bottomContainer}>
        <TouchableOpacity style={styles.heartContainer}>
          <Ionicons  name='heart-outline' size={50} color={'#A3A09F'}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyContainer}>
          
            <Text style = {styles.applyText}>Apply Now</Text>
          
        </TouchableOpacity>
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
    backgroundColor: 'white',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobImage: {
    height:'100%',
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  jobImageContainer: {
    marginTop: 10,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#EBF2FC',
    
    
    
  },
  companyName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor: '#EBF2FC',
  },
  companyNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  companyInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  
  },
  companyInfoText: {
    fontSize: 15,
    fontWeight: 'bold',
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
  },
  companyLocation:{
    justifyContent: 'center',
    flexDirection: 'row', 
    backgroundColor: '#EBF2FC',
  },
  jobInfoContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    
    gap: 10,
    
  },
  jobInfoBox:{
    backgroundColor: 'blue',
    borderWidth: 0,
    borderRadius: 4,
  },
  jobInfoText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  headerContainer:{
    marginBottom: 20,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
    backgroundColor: '#EBF2FC',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bottomContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: "center",
    gap: 10,
    width: '100%',
  },
  heartContainer:{
    borderWidth: 1,
    borderColor: '#A3A09F',
    borderRadius: 10,
  },
  applyContainer:{
    width: '85%',
    height: 50,
    
    backgroundColor: '#F97459',
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  applyText:{
    fontSize:25,
    color: 'white',
  },
})
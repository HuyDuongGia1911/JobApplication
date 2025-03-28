import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Search from '@/components/Search'
import { router } from 'expo-router'

const index = () => {
  const [selected, setSelected] = useState(0);

  const Switch_Selected = async ( index : number) => {
    setSelected(index);
  }
  const sampleData = [
    { id: '1', title: 'Software Engineer' , corp: 'GIAHU',image: require('@/assets/images/anh.png'), nation: 'US'},
    { id: '2', title: 'Data Analyst', corp: 'GIAHU', image: require('@/assets/images/anh.png'), nation: 'US'},
    { id: '3', title: 'Product Manager', corp: 'GIAHU', image: require('@/assets/images/anh.png'), nation: 'US'},
    { id: '4', title: 'UX Designer' , corp: 'GIAHU', image: require('@/assets/images/anh.png'), nation: 'US'},
    { id: '5', title: 'Cybersecsurity Specialist' , corp: 'GIAHU', image: require('@/assets/images/anh.png')},
    { id: '6', title: 'AI Engineer', corp: 'GIAHU', image: require('@/assets/images/anh.png'), nation: 'US'},
  ];
  
  
  
  
  return (
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
      <View>
        <Search />
      </View>

      
      <View style={styles.btnSelect}>
        <TouchableOpacity style={[styles.btnSelectTouch, selected === 0 ? styles.btnSelectClickActive : styles.btnSelectClick]} onPress={() => Switch_Selected(0)}>
          <Text style= {[selected === 0 ? styles.textBtnSelectActive : styles.textBtnSelect]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnSelectTouch, selected === 1 ? styles.btnSelectClickActive : styles.btnSelectClick]} onPress={() => Switch_Selected(1)}>
          <Text style={[selected === 1 ? styles.textBtnSelectActive : styles.textBtnSelect]}>Trang 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnSelectTouch, selected === 2 ? styles.btnSelectClickActive : styles.btnSelectClick]} onPress={() => Switch_Selected(2)}>
          <Text style={[selected === 2 ? styles.textBtnSelectActive : styles.textBtnSelect]}>Trang 3</Text>
        </TouchableOpacity>
      </View>
      {selected === 0 ? (
        <View style={styles.cardsContainer}>
          <View style={styles.cardsHeaderContainer}>
                    <Text style={styles.popularJobs}>Popular Jobs</Text>
                    <TouchableOpacity>
                      <Text style={styles.showAllBtn}>Show all</Text>
                    </TouchableOpacity>
            </View>
            <FlatList 
              data={sampleData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.jobCardsContainer}>
                  <Image style={styles.jobImages} source={item.image}/>
                  <Text style={styles.jobCorp}>Cong ty {item.corp}</Text>
                  <View style={styles.jobCardsDescription}>
                    <Text style={styles.jobTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                    <Text style={styles.jobNation}>{item.nation}</Text>
                  </View>
                </TouchableOpacity> 
              )}
              horizontal
              style={styles.flatlistCustom}
            />
          <View>
          <View style={styles.cardsHeaderContainer}>
                    <Text style={styles.popularJobs}>Full-time Jobs</Text>
                    <TouchableOpacity>
                      <Text style={styles.showAllBtn}>Show all</Text>
                    </TouchableOpacity>
            </View>
            <FlatList 
              data={sampleData.slice(0, 4)}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.jobCardsContainer2}>
                  <Image style={styles.jobImages} source={item.image}/>
                  <View style={styles.jobCardsDescription2}>
                      <Text style={styles.jobCorp}>Cong ty {item.corp}</Text>
                      <View style={styles.jobCardsDescription}>
                        <Text style={styles.jobTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                        <Text style={styles.jobNation}>{item.nation}</Text>
                      </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              style={styles.flatlistCustom}
            />
          </View>
        </View>
        
      ) : selected === 1 ? (
        <View>
          <Text>trang 2ss</Text>
          
        
        </View>
      ) : (
        <View>
          <Text>trang 3</Text>
        </View>
      )}
    </View>
  ) 
  
}

export default index

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

  btnSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },

  btnSelectTouch: {
    borderWidth: 1,
    flex: 1,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },

  btnSelectClick: {
    borderColor: '#a9a9a9'
  },

  btnSelectClickActive: {
    borderColor: 'black',
    color: 'black',
  },

  textBtnSelect: {
    color: '#a9a9a9'
  },

  textBtnSelectActive: {
    color: 'black'
  },
  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
    marginVertical: 30,
  },
  cardsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularJobs: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  showAllBtn: {
    fontSize: 20,
    color: '#a9a9a9',
  },
  jobCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  
  jobTitle: {
    fontFamily: 'serif',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1,
  },
  jobImages: {
    height: 70,
    width: 70,
    borderRadius: 5,
    borderWidth: 8,
    borderColor: '#F1F2F6'
  },
  jobCorp: {
    color: '#a9a9a9',
    letterSpacing: 1
  },
  
  jobNation: {
    color: '#a9a9a9'
  },

  jobCardsContainer: {
    width: 300,
    borderRadius: 20,
    gap: 10,
    padding: 20,
    marginEnd: 20,
    borderWidth: 14,
    borderColor: '#F1F2F6'
  },
  jobCardsContainer2: {
    width: '100%',
    borderRadius: 20,
    gap: 10,
    padding: 20,
    marginEnd: 20,
    borderWidth: 14,
    borderColor: '#F1F2F6',
    flexDirection: 'row',
  },
  
  jobCardsDescription: {
    gap: 5
  },
  jobCardsDescription2: {
    flexDirection: 'column'
  },
  flatlistCustom: {
    height: 250,
  },
  
  }
)
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Search from '@/components/Search'
import { router } from 'expo-router'
import { account, collection_job_id, collection_user_id, databases, databases_id } from '@/lib/appwrite'


const index = () => {
  const [selected, setSelected] = useState(0);
  //tao bien luu du lieu theo dang mang
  const [userId, setUserId] = useState<string>('')
  const [dataJob, setDataJob] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>()

  useEffect(() => {
      load_data();
      load_user_id()
      load_data_user()
  },[userId])


  const Switch_Selected = async ( index : number) => {
    setSelected(index);

  }

  const load_user_id = async () => {
      const result = await account.get()
      setUserId(result.$id)
      console.log(result.$id)
  }
  
  const load_data_user = async () => {
    if(userId) {
      try{
        const result = await databases.getDocument(
          databases_id,
          collection_user_id,
          userId
        )
        setDataUser(result)
      }catch{}
    }
  }
  
  //tao ham lay du lieu, api
  const load_data = async () => {
      try{
        const result = await databases.listDocuments(
          databases_id, // databaseId
          collection_job_id, // collectionId
        );
          setDataJob(result.documents);
      
      }
      catch(error){
        console.log(error);
      }
  }

  const click = () => {
    console.log(dataUser)
  }

  
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.topView}>
            {/* <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text>Login</Text>
            </TouchableOpacity> */}
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.hello}>Welcome Back!</Text>
              <Text style={styles.hello2}>My name</Text>
            </View>
            <Image style = {styles.avatar}
              source={{ uri : 'https://randomuser.me/api/portraits/men/1.jpg'}}
              // dataUser ? dataUser.id_image : undefined
            />
        </View>
        <View style = {styles.searchContainer}>
          <Search />
        </View>
      </View>
      <ScrollView contentContainerStyle ={styles.cardsContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cardsHeaderContainer}>
          <Text style={styles.popularJobs}>Popular Jobs</Text>
          <TouchableOpacity>
            <Text style={styles.showAllBtn}>Show all</Text>
          </TouchableOpacity>
        </View>
          <FlatList 
            data={dataJob}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.jobCardsContainer} 
                onPress={() => router.push({ pathname: "/jobDescription", params: { jobId: item.$id } })}
              >
                <Image style={styles.jobImages} source={{ uri: item.image }} />
                <Text style={styles.jobCorp}>Công ty {item.corp_name}</Text>
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
            data={dataJob.slice(0, 4)}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.jobCardsContainer2}>
                <Image style={styles.jobImages} source={{uri: item.image}}/>
                <View style={styles.jobCardsDescription2}>
                    <Text style={styles.jobCorp}>Cong ty {item.corp_name}</Text>
                    <View style={styles.jobCardsDescription}>
                      <Text style={styles.jobTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                      <Text style={styles.jobNation}>{item.nation}</Text>
                    </View>
                </View>
              </TouchableOpacity>
            )}
            style={styles.flatlistCustom}
          />
        </View>
      </ScrollView>
    </View>
  ) 
  
}

export default index

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9FB',
    
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
  headerContainer: {
    backgroundColor: '#4A80F0',
    paddingHorizontal: 30,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    paddingTop: 30,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 15,

  },

  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  welcomeTextContainer: {
    flex: 1, 
  },
  hello: {
    fontFamily: 'Arial',
    fontSize: 25,
    color: 'white',
  },
  hello2: {
    fontFamily: 'Arial',
    fontWeight: '800',
    fontSize: 30,
    marginTop: 5,
    color: 'white',
  },
  searchContainer: {
    width: '100%',
    marginBottom: 20,
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
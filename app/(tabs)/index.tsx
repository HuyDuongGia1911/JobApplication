import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Search from '@/components/Search';
import { router } from 'expo-router';
import { account, collection_job_id, collection_user_id, databases, databases_id } from '@/lib/appwrite';

const index = () => {
  const [selected, setSelected] = useState(0);
  const [userId, setUserId] = useState<string>('');
  const [dataJob, setDataJob] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    load_data();
    load_user_id();
    load_data_user();
  }, [userId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    Promise.all([
      load_data(),
      load_user_id(),
      load_data_user()
    ]).finally(() => {
      setRefreshing(false);
    });
  }, []);

  const Switch_Selected = async (index: number) => {
    setSelected(index);
  };

  const load_user_id = async () => {
    try {
      const result = await account.get();
      setUserId(result.$id);
    } catch (error) {
      console.log(error);
    }
  };
  
  const load_data_user = async () => {
    if (userId) {
      try {
        const result = await databases.getDocument(
          databases_id,
          collection_user_id,
          userId
        );
        setDataUser(result);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const load_data = async () => {
    try {
      const result = await databases.listDocuments(
        databases_id,
        collection_job_id,
      );
      setDataJob(result.documents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#4A80F0' }}>
      {/* Header cố định */}
      <View style={styles.headerContainer}>
        <View style={styles.topView}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.hello}>Welcome Back!</Text>
            <Text style={styles.hello2}>My name</Text>
          </View>
          <Image 
            style={styles.avatar}
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          />
        </View>
        <View style={styles.searchContainer}>
          <Search />
        </View>
      </View>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#4A80F0']} 
            tintColor="#4A80F0" 
          />
        }
      >
          <View style={styles.cardsContainer}>
            {/* Popular Jobs Section */}
            <View style={styles.cardsHeaderContainer}>
              <Text style={styles.popularJobs}>Company</Text>
              <TouchableOpacity>
                <Text style={styles.showAllBtn}>Show all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalScrollContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 30, paddingRight: 10 }}
              >
                {dataJob.map((item: any) => (
                  <TouchableOpacity 
                    key={item.$id}
                    style={styles.jobCardsContainer} 
                    onPress={() => router.push({ pathname: "/jobDescription", params: { jobId: item.$id } })}
                  >
                    <Image style={styles.jobImages} source={{ uri: item.image }} />
                    <View style={styles.jobCardsDescription}>
                      <Text style={styles.jobTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                      <Text style={styles.jobNation}>{item.nation}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>


              {/* Category Section */}
            <View style={{ marginBottom: 20 }}>
              <View style={styles.cardsHeaderContainer}>
                <Text style={styles.popularJobs}>Category</Text>
                <TouchableOpacity>
                  <Text style={styles.showAllBtn}>Show all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.categoryGrid}>
                {[
                  { title: 'Accounting', jobs: '7+ Jobs', color: '#e6f4ec', icon: 'shield-checkmark' },
                  { title: 'Banking', jobs: '6+ Jobs', color: '#e6e9f4', icon: 'business' },
                  { title: 'Engineering', jobs: '11+ Jobs', color: '#fff4e6', icon: 'construct' },
                  { title: 'Health Care', jobs: '2+ Jobs', color: '#f4e6ef', icon: 'medkit' },
                ].map((item, index) => (
                  <View key={index} style={[styles.categoryCard, { backgroundColor: item.color }]}>
                    <View style={styles.categoryIcon}>
                      <Ionicons name={item.icon as any} size={24} color="#333" />
                    </View>
                    <Text style={styles.categoryTitle}>{item.title}</Text>
                    <Text style={styles.categorySubtitle}>{item.jobs}</Text>
                  </View>
                ))}
              </View>
            </View>




            
            {/* Latest Jobs Section */}
            <View style={[styles.cardsHeaderContainer, { marginTop: 20 }]}>
              <Text style={styles.popularJobs}>Latest Jobs</Text>
              <TouchableOpacity>
                <Text style={styles.showAllBtn}>Show all</Text>
              </TouchableOpacity>
            </View>
            

            <View style={styles.horizontalScrollContainer}>
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingLeft: 30, paddingRight: 10 }}
  >
    {dataJob.slice(0, 4).map((item: any) => (
      <TouchableOpacity 
        key={item.$id}
        style={[styles.jobCardsContainer2, styles.horizontalJobCard]}
        onPress={() => router.push({ pathname: "/jobDescription", params: { jobId: item.$id } })}
      >
        <Image style={styles.jobImages} source={{uri: item.image}}/>
        <View style={styles.jobCardsDescription2}>
          <Text style={styles.jobCorp}>Cong ty {item.corp_name}</Text>
          <View style={styles.jobCardsDescription}>
            <Text style={styles.jobTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
            <Text style={styles.jobNation}>{item.nation}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>
          </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4A80F0',
    paddingHorizontal: 30,
    paddingTop: 50, // Điều chỉnh theo kích thước tai thỏ
    paddingBottom: 45, // Tăng padding bottom để tạo không gian cho phần border radius
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  hello: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#FFFFFF',
  },
  hello2: {
    fontFamily: 'Arial',
    fontWeight: '800',
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 5,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 15,
  },
  searchContainer: {
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25, // Tạo hiệu ứng chồng lên phần header
  },
  cardsContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },
  cardsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  popularJobs: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  showAllBtn: {
    fontSize: 18,
    color: '#a9a9a9',
  },
  horizontalScrollContainer: {
    marginHorizontal: -30,
    marginBottom: 20,
  },
  horizontalJobCard: {
    width: 300, 
    marginRight: 15, 
    borderWidth: 1,
    borderColor: '#F1F2F6',
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
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#4A80F0'
  },
  jobCorp: {
    color: '#a9a9a9',
    letterSpacing: 1
  },
  jobNation: {
    color: '#a9a9a9'
  },
  jobCardsContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#4A80F0',
    backgroundColor: '#FFFFFF',
  },
  jobCardsContainer2: {
    width: '100%',
    borderRadius: 20,
    gap: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 14,
    borderColor: '#F1F2F6',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  jobCardsDescription: {
    gap: 5,
  },
  jobCardsDescription2: {
    flexDirection: 'column',
    marginLeft: 15,
    flex: 1,
  },

  // category card
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  categoryCard: {
    width: '47%',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#555',
  },
  
});

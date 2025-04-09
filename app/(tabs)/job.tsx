import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Job = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['All', 'Developer', 'Designer', 'HR Manager', 'Entrepreneur'];

  const jobs = [
    {
      id: '1',
      title: 'Developer',
      company: 'Sponce',
      salary: '$ 4370 / Year',
      location: 'Vietnam',
      status: 'Open',
      type: 'Full-time',
      image: 'https://via.placeholder.com/50x50.png?text=Dev',
    },
    {
      id: '2',
      title: 'Designer',
      company: 'Google',
      salary: '$ 770 / Year',
      location: 'Sofia',
      status: 'Close',
      type: 'Full-time',
      image: 'https://via.placeholder.com/50x50.png?text=Des',
    },
    {
      id: '3',
      title: 'HR Manager',
      company: 'Facebook',
      salary: '$ 8470 / Year',
      location: 'Norway',
      status: 'Apply',
      type: 'Part-Time',
      image: 'https://via.placeholder.com/50x50.png?text=HR',
    },
    {
      id: '4',
      title: 'Entrepreneur',
      company: 'Google',
      salary: '$ 3470 / Year',
      location: 'Colombia',
      status: 'Open',
      type: 'Full-time',
      image: 'https://via.placeholder.com/50x50.png?text=Ent',
    },
  ];

  const filteredJobs =
    selectedTab === 0
      ? jobs
      : jobs.filter((job) => job.title === tabs[selectedTab]);

  const renderJobItem = ({ item }: { item: any }) => (
    <View style={styles.jobItem}>
      <Image source={{ uri: item.image }} style={styles.jobImage} />
      <View style={styles.jobInfo}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.jobCompany}>{item.company}</Text>
        <Text style={styles.jobLocation}>{item.location}</Text>
      </View>
      <View style={styles.jobRight}>
        <Text style={styles.jobSalary}>{item.salary}</Text>
        <Text style={styles.jobType}>{item.type}</Text>
        <TouchableOpacity
          style={[
            styles.statusButton,
            {
              backgroundColor:
                item.status === 'Open'
                  ? '#34C759'
                  : item.status === 'Close'
                  ? '#FF3B30'
                  : '#007AFF',
            },
          ]}
          onPress={() => router.push(`/jobDescription?jobId=${item.id}`)}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style ={styles.menu_btn}>
          <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Save Job List</Text>
      </View>

      {/* Sub Header */}
      <View style={styles.subHeader}>
        <Text style={styles.savedText}>You Saved 100 Jobs</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/30' }}
          style={styles.subHeaderIcon}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabButton,
                selectedTab === index && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === index && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Job List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default Job;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: '#fff',
    elevation: 3,
    position: 'relative'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
    position: 'absolute', 
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menu_btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  savedText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  subHeaderIcon: {
    width: 30,
    height: 30,
  },
  tabsWrapper: {
    paddingVertical: 10,
  },
  tabScroll: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tabButtonActive: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  jobItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  jobImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  jobInfo: {
    flex: 1,
    marginLeft: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  jobCompany: {
    fontSize: 14,
    color: '#666',
  },
  jobLocation: {
    fontSize: 12,
    color: '#aaa',
  },
  jobRight: {
    alignItems: 'flex-end',
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  jobType: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  statusButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
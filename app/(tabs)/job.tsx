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
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const tabs = ['All', 'Developer', 'Designer', 'HR Manager', 'Entrepreneur'];

  const jobs = [
    {
      id: '1',
      title: 'Developer',
      company: 'Sponce',
      salary: '$ 4370 / Year',
      location: 'Vietnam',
      type: 'Full-time',
      image: 'https://via.placeholder.com/50x50.png?text=Dev',
    },
    {
      id: '2',
      title: 'Designer',
      company: 'Google',
      salary: '$ 770 / Year',
      location: 'Sofia',
      type: 'Full-time',
      image: 'https://via.placeholder.com/50x50.png?text=Des',
    },
    {
      id: '3',
      title: 'HR Manager',
      company: 'Facebook',
      salary: '$ 8470 / Year',
      location: 'Norway',
      type: 'Part-Time',
      image: 'https://via.placeholder.com/50x50.png?text=HR',
    },
    {
      id: '4',
      title: 'Entrepreneur',
      company: 'Google',
      salary: '$ 3470 / Year',
      location: 'Colombia',
      type: 'Full-time',
      image: 'https://via.placeholder.com/50x50.png?text=Ent',
    },
  ];

  const filteredJobs =
    selectedTab === 0
      ? jobs
      : jobs.filter((job) => job.title === tabs[selectedTab]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const renderJobItem = ({ item }: { item: any }) => {
    const isSaved = savedJobs.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.jobItem}
        onPress={() => router.push(`/jobDescription?jobId=${item.id}`)}
      >
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
            onPress={() => toggleSaveJob(item.id)}
            style={{ padding: 4 }}
          >
            <Ionicons
              name={isSaved ? 'heart' : 'heart-outline'}
              size={24}
              color={isSaved ? '#FF3B30' : '#999'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Save Job List</Text>
        </View>


      <View style={styles.subHeader}>
        <Text style={styles.savedText}>You Saved {savedJobs.length} Jobs</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/30' }}
          style={styles.subHeaderIcon}
        />
      </View>

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
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
});

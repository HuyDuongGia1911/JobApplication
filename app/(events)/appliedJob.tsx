import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRouter } from 'expo-router';

const appliedJob = () => {
  // Danh sách job đã apply
  const [appliedJobs, setappliedJobs] = useState([
    {
      id: '1',
      title: 'Developer',
      company: 'Sponce',
      salary: '$ 4370 / Year',
      location: 'Vietnam',
      type: 'Full-time',
      image: 'https://via.placeholder.com/50x50.png?text=Dev',
      status: 'Đang chờ duyệt',
    },
    {
      id: '2',
      title: 'Designer',
      company: 'Google',
      salary: '$ 770 / Year',
      location: 'Sofia',
      type: 'Full-time',
      image: 'https://via.placeholder.com/50x50.png?text=Des',
      status: 'Đã duyệt',
    },
  ]);

  const renderJobItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.jobItem}>
        <Image source={{ uri: item.image }} style={styles.jobImage} />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobCompany}>{item.company}</Text>
          <Text style={styles.jobLocation}>{item.location}</Text>
          <Text style={styles.jobStatus}>
            Trạng thái: 
            <Text style={{ fontWeight: 'bold', color: item.status === 'Đã duyệt' ? '#34C759' : '#FF9500' }} >
              {' '}{item.status}
            </Text>
          </Text>
        </View>
        <View style={styles.jobRight}>
          <Text style={styles.jobSalary}>{item.salary}</Text>
          <Text style={styles.jobType}>{item.type}</Text>
          <Ionicons name="checkmark-done" size={24} color="#34C759" />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back_btn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Applied Job List</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.savedText}>You Applied {appliedJobs.length} Jobs</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/30' }}
          style={styles.subHeaderIcon}
        />
      </View>

      <FlatList
        data={appliedJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

export default appliedJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  back_btn: {
    position: 'absolute',
    left: 16,
    padding: 6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  savedText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  subHeaderIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  jobItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  jobInfo: {
    flex: 1,
    marginLeft: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  jobCompany: {
    fontSize: 14,
    color: '#777',
  },
  jobLocation: {
    fontSize: 12,
    color: '#aaa',
  },
  jobStatus: {
    fontSize: 12,
    marginTop: 4,
    color: '#444',
  },
  jobRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 8,
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

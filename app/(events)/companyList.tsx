import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router'; // Thêm expo-router để điều hướng

const companies = [
  { id: '1', name: 'Google', jobs: 5, icon: 'google', color: '#4285F4' },
  { id: '2', name: 'Facebook', jobs: 2, icon: 'facebook', color: '#1877F2' },
  { id: '3', name: 'Microsoft', jobs: 4, icon: 'microsoft', color: '#F25022' },
  { id: '4', name: 'Amazon', jobs: 1, icon: 'aws', color: '#FF9900' }, // Thay icon amazon thành aws
  { id: '5', name: 'Apple', jobs: 3, icon: 'apple', color: '#333333' },
  { id: '6', name: 'Netflix', jobs: 3, icon: 'netflix', color: '#E50914' },
  { id: '7', name: 'Samsung', jobs: 4, icon: 'cellphone', color: '#1428A0' },
  { id: '8', name: 'Tesla', jobs: 2, icon: 'car-electric', color: '#CC0000' },
  { id: '9', name: 'Adobe', jobs: 3, icon: 'adobe-acrobat-reader', color: '#FF0000' },
  { id: '10', name: 'LinkedIn', jobs: 2, icon: 'linkedin', color: '#0077B5' },
  { id: '11', name: 'Spotify', jobs: 4, icon: 'spotify', color: '#1DB954' },
  { id: '12', name: 'Twitter', jobs: 1, icon: 'twitter', color: '#1DA1F2' },
];

const { width } = Dimensions.get('window');
const cardSize = width / 2 - 32;

const companyList = () => {


  const handleCompanyPress = (companyId: string) => {
    // Điều hướng đến CompanyDescription với companyId
    router.push({ pathname: '/companyDescription', params: { companyId } });
  };

  const renderItem = ({ item }: { item: typeof companies[0] }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => handleCompanyPress(item.id)} 
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <MaterialCommunityIcons name={item.icon as any} size={28} color="#fff" />
      </View>
      <Text style={styles.companyName}>{item.name}</Text>
      <Text style={styles.jobCount}>{item.jobs} jobs</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#1e293b" />
        <Text style={styles.backText}>Back to home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Company List</Text>

      <FlatList
        data={companies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default companyList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    width: cardSize,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
    textAlign: 'center',
  },
  jobCount: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
});


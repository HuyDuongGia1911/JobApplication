import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Message = () => {
  const router = useRouter();

  const users = [
    { id: '1', name: 'Hoang Bao 1', status: 'Online', lastSeen: '3 days ago' },
    { id: '2', name: 'Hoang Bao 2', status: 'Offline', lastSeen: '12 min ago' },
    { id: '3', name: 'Hoang Bao 3', status: 'Online', lastSeen: '' },
    { id: '4', name: 'Hoang Bao 4', status: 'Offline', lastSeen: '1 day ago' },
    { id: '5', name: 'Hoang Bao 5', status: 'Online', lastSeen: '' },
  ];

  const handleUserPress = (userId: string, userName: string) => {
    router.push({
      pathname: "/chat",
      params: { userId, userName },
    });
  };
  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.back_btn}>
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text style={styles.header}>Message</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userItem}
            onPress={() => handleUserPress(user.id, user.name)}
            activeOpacity={0.7}
          >
            <View style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text
                style={[styles.statusText, user.status === 'Online' ? styles.online : styles.offline]}
              >
                {user.status}
              </Text>
            </View>
            {user.lastSeen ? <Text style={styles.lastSeen}>{user.lastSeen}</Text> : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9FB',
    height: 50,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 50,
  },
  back_btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    fontSize: 14,
    marginTop: 2,
  },
  online: {
    color: 'green',
  },
  offline: {
    color: 'red',
  },
  lastSeen: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    right: 15,
  },
});

export default Message;
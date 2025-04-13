import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Stack } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { account } from '@/lib/appwrite';
import { collection_user_id, databases, databases_id } from '@/lib/appwrite'

const Person = () => {
  const [editField, setEditField] = useState<null | 'phone' | 'email' | 'password' | 'name'>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [userName, setUserName] = useState('');
  const [dataUser, setDataUser] = useState<any>();
  const [userId, setUserId] = useState<string>('');

  const handleSave = async () => {
    try {
      if (editField === 'password') {
        if (passwords.new !== passwords.confirm) {
          Alert.alert('Error', 'Password does not match');
          return;
        }

        await account.updatePassword(passwords.new, passwords.current);
        Alert.alert('Success', 'Password updated successfully');
        setPasswords({ current: '', new: '', confirm: '' });
      }

      if (editField === 'phone') {
        await account.updatePrefs({ phone });
        Alert.alert('Success', 'Phone number updated successfully');
      }

      if (editField === 'email') {
        await account.updateEmail(email, passwords.current);
        Alert.alert('Success', 'Email updated successfully');
      }

      if (editField === 'name') {
        await account.updateName(userName);
        Alert.alert('Success', 'Name updated successfully');
      }
    } catch (error: any) {
      console.log('Update failed:', error);
      Alert.alert('Error', error.message || 'Something went wrong');
    }

    setEditField(null);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/login');
    } catch (error) {
      console.log('Logout Error:', error);
    }
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
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await account.get();
        setEmail(user.email);
        if (user.prefs?.phone) setPhone(user.prefs.phone);
      } catch (err) {
        console.log('User not logged in, redirecting to login...');
        router.replace('/(auth)/login');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const user = await account.get();
        console.log("(NOBRIDGE) LOG USER NAME:", user.name);
        setUserName(user.name);
      } catch (error) {
        console.error("Không lấy được thông tin user:", error);
      }
    };

    getAuthUser();
  }, []);

  useEffect(() => {
    load_user_id();
    load_data_user();
  }, [userId]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.avatarSection}>
          <View>
            <Image style={styles.avatar} source={{ uri: dataUser?.id_image ? dataUser.id_image : 'https://randomuser.me/api/portraits/men/1.jpg' }} />
            <TouchableOpacity style={styles.editAvatar}>
              <Feather name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}> {userName} </Text>
        </View>

        <Text style={styles.editProfile}> Edit Profile</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}> Name </Text>
          <View style={styles.inputRow}>
            <Text style={styles.input}>{userName}</Text>
            <TouchableOpacity onPress={() => setEditField('name')}>
              <Feather name="edit-2" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}> Phone number</Text>
          <View style={styles.inputRow}>
            <Text style={styles.input}>{phone}</Text>
            <TouchableOpacity onPress={() => setEditField('phone')}>
              <Feather name="edit-2" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}> Email </Text>
          <View style={styles.inputRow}>
            <Text style={styles.input}>*******</Text>
            <TouchableOpacity onPress={() => setEditField('email')}>
              <Feather name="edit-2" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}> Password </Text>
          <View style={styles.inputRow}>
            <Text style={styles.input}>*******</Text>
            <TouchableOpacity onPress={() => setEditField('password')}>
              <Feather name="edit-2" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          
        <TouchableOpacity style={styles.appliedJobsButton} onPress={() => router.push('/appliedJob')}>
            <Text style={styles.buttonText}>Applied Jobs</Text>
            <Ionicons name="checkmark-done" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
            <Ionicons name="log-out-outline" size={18} color="#fff" />
          </TouchableOpacity>

        </View>

        <Modal visible={!!editField} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editField === 'phone'
                  ? 'Edit Phone Number'
                  : editField === 'email'
                    ? 'Edit Email'
                    : editField === 'name'
                      ? 'Edit Name'
                      : 'Change Password'}
              </Text>

              {editField === 'name' && (
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter your name"
                  value={userName}
                  onChangeText={setUserName}
                />
              )}

              {editField === 'phone' && (
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              )}

              {editField === 'email' && (
                <>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Enter new email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Enter current password"
                    secureTextEntry
                    value={passwords.current}
                    onChangeText={(text) => setPasswords({ ...passwords, current: text })}
                  />
                </>
              )}

              {editField === 'password' && (
                <>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Current password"
                    secureTextEntry
                    value={passwords.current}
                    onChangeText={(text) => setPasswords({ ...passwords, current: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="New password"
                    secureTextEntry
                    value={passwords.new}
                    onChangeText={(text) => setPasswords({ ...passwords, new: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Confirm new password"
                    secureTextEntry
                    value={passwords.confirm}
                    onChangeText={(text) => setPasswords({ ...passwords, confirm: text })}
                  />
                </>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setEditField(null)}>
                  <Text style={{ color: 'red' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                  <Text style={{ color: 'blue' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

export default Person;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  editProfile: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#000',
  },
  infoBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  appliedJobsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4F4F',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 15,
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAppliedJobs, updateApplicationStatus } from '@/lib/appwrite';
import Application from '@/components/Application';
import {account } from '@/lib/appwrite';

const AppliedList = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const apps = await getAppliedJobs(userId);
      setApplications(apps);
      setLoading(false);
    };

    if (userId) {
        console.log('userId:', userId);
      fetchData();
    }
  }, [userId]);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await account.get(); // lấy user từ Appwrite
        console.log('Đăng nhập với user:', user);
        setUserId(user.$id);
      } catch (err) {
        console.error('Lỗi khi lấy user:', err);
      }
    };
  
    getCurrentUser();
  }, []);
  const handleStatusChange = async (appId: string, status: string) => {
    await updateApplicationStatus(appId, status);
    const updated = applications.map(app =>
      app.$id === appId ? { ...app, status } : app
    );
    setApplications(updated);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách ứng viên</Text>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Application
            app={item}
            onStatusChange={(status) => handleStatusChange(item.$id, status)}
          />
        )}
      />
    </View>
  );
};

export default AppliedList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
});

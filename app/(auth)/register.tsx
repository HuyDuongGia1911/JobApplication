import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert
} from 'react-native';
import { account, collection_user_id, databases, databases_id, ID } from '../../lib/appwrite';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      const user_id = ID.unique();
      await account.create(user_id, email, password);
      await databases.createDocument(
        databases_id,
        collection_user_id,
        user_id,
        {
          isAdmin: 0,
          id_image: null,
        }
      );
      Alert.alert('Thành công', 'Đăng ký thành công, vui lòng đăng nhập.');
      router.replace('/(auth)/login');
    } catch (error: any) {
      Alert.alert('Lỗi đăng ký', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng ký</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10,
    marginBottom: 15, fontSize: 16
  },
  button: {
    backgroundColor: '#007AFF', padding: 15, borderRadius: 10,
    alignItems: 'center', marginBottom: 10
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#007AFF', textAlign: 'center', marginTop: 10 },
});

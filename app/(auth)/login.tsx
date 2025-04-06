import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { router, useRouter } from 'expo-router';
import { account, ID } from '../../lib/appwrite';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
        console.log(password, email)
        await account.createEmailPasswordSession(email, password);
        
        router.replace('/(tabs)/person');
    } catch (error: any) {
        console.log('Error:', error);

        Alert.alert('Login failed', error.message);
    }
        
    };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Login" onPress={handleLogin} />
      <Button title='Regsiter' onPress={() => router.push('/(auth)/register')}/>
    </View>
  );
}

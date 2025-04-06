import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { account, collection_user_id, databases, databases_id, ID } from '../../lib/appwrite';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
        const user_id = ID.unique()
        await account.create(user_id, email, password);
        await create_database_of_user(user_id)
        router.replace('/(auth)/login');
    } catch (error : any) {
      Alert.alert('Register failed', error.message);
    }
  };

  const create_database_of_user = async (user_id: string) => {
    try{
        const result = await databases.createDocument(
            databases_id,
            collection_user_id,
            user_id,
            {
                isAdmin: 0,
                id_image: null
            }
        )

    }catch(error){
        console.log(error)
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

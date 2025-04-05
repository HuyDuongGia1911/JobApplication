import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  Keyboard,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type MessageType = {
  id: string;
  text: string;
  role: 'Recruiter' | 'Candidate';
};

const Chat = () => {
  const router = useRouter();
  const {userId, userName}= useLocalSearchParams<{
    userId: string;
    userName: string;
  }>();

const [message, setMessage] = useState('');
const [messages, setMessages] = useState<MessageType[]> ([
  { id: '1', text: 'mày cút ', role: 'Recruiter' },
  { id: '2', text: 'chào tôi muốn ứng tuyển', role: 'Candidate' },
]);

const flatListRef = useRef<FlatList>(null);

const handleSendMessage =() =>
{
  if (message.trim()==='') return;

  const newMessage: MessageType = {
    id: Date.now().toString(),
    text: message.trim(),
    role: 'Candidate',
  };

  setMessages((prev) => [...prev, newMessage]);
  setMessage(''); 

  setTimeout(() => {
    flatListRef.current?.scrollToEnd({ animated: true});
    }, 100);

    Keyboard.dismiss();   
};

const renderMessage = ({item}: { item: MessageType}) => {
  const isUser = item.role === 'Candidate';
  return(
    <View
      style ={[styles.messageBubble,
        isUser ? styles.userBubble : styles.recruiterBubble,
      ]}>
      <Text style={styles.messageText}> {item.text} </Text>
      </View>
  );
};
return(
  <KeyboardAvoidingView

  >
    {/* Header */}
    <View style= {styles.headerContainer}>
      <TouchableOpacity style={styles.back_btn} onPress = {() => router.back()}>
        <Ionicons name ='arrow-back' size={24} color = "black"> </Ionicons>
      </TouchableOpacity>
      <Text style ={styles.header_username}> {userName}</Text>
    </View>

    {/* Tin nhắn */}
    <FlatList
    ref={flatListRef}
    data = {messages}
    keyExtractor={(item) => item.id}
    renderItem={renderMessage}
    contentContainerStyle = {styles.messageContainer}
    onContentSizeChange = {() => flatListRef.current?.scrollToEnd({ animated: true})}
    />
  
      {/* Nhap tin nhan */}{}


  </KeyboardAvoidingView>
)





};

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9FB',
    height: 50,
    paddingHorizontal: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  back_btn:{
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_username:{
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  messageContainer:{
    padding: 15,
    flexGrow: 1,
    justifyContent: 'flex-end',
    
  },

  messageBubble:{
    padding: 10,
    maxWidth: '80%',
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 5,
  },
  userBubble:{
    alignSelf: 'flex-end',
    
  }

});

export default Chat;
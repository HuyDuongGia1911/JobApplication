import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from 'expo-router';
const Layout = () => {
  return (<Tabs>
    <Tabs.Screen name="index" options={{
      title: "Home",
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
      <Ionicons name={focused ? "home" : "home-outline"} color={color} size={24}/>

      )
    }}/>
    <Tabs.Screen name="message" options={{
      headerShown: false,
      title: "Message",
      tabBarIcon: ({color, focused}) => (
      <Ionicons name = {focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} color = {color} size={24}/>
      )
    }}/>
    <Tabs.Screen name="job" options={{
      title: "Job",
      tabBarIcon: ({color, focused}) => (
      <Ionicons name = {focused ? "file-tray-full" : "file-tray-full-outline"} color = {color} size={24}/>
      )
    }}/>
    <Tabs.Screen name="person" options={{
      title: "Person",
      tabBarIcon: ({color, focused}) => (
      <Ionicons name = {focused ? "person-circle" : "person-circle-outline"} color = {color} size={24}/>
      )
    }}/>
  </Tabs>);
}

export default Layout;
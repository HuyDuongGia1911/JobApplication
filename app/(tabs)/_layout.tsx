import { Tabs } from "expo-router";
  import { Ionicons } from "@expo/vector-icons";
const Layout = () => {
  return (<Tabs>
    <Tabs.Screen name="index" options={{
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
      <Ionicons name={focused ? "stopwatch" : "stopwatch-outline"} color={color} size={24}/>

      )
    }}/>
  
    <Tabs.Screen name="person" options={{
      title: "person",
      tabBarIcon: ({color, focused}) => (
      <Ionicons name = {focused ? "notifications" : "notifications-outline"} color = {color} size={24}/>
      )
    }}/>
  </Tabs>);
}

export default Layout;
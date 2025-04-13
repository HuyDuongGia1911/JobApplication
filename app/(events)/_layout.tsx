import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SavedJobsProvider } from '@/app/saveJobsContext';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="jobDescription"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="submit"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="appliedJob"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

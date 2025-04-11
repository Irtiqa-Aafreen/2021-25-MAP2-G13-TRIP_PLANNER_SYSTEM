import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons'; // Correct import for Entypo
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the header for all tabs
        tabBarActiveTintColor:Colors.black
      }}
    >
      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: 'My Trip',
          tabBarIcon: ({ color }) => <Entypo name="location-pin" size={24} color={color} />, // Icon for My Trip
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: 'Discover', // Optional label for discover tab
          tabBarIcon: ({ color }) => <Entypo name="compass" size={24} color={color} />, // Icon for Discover
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile', // Optional label for profile tab
          tabBarIcon: ({ color }) => <Entypo name="user" size={24} color={color} />, // Icon for Profile
        }}
      />
    </Tabs>
  );
}

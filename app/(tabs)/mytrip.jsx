import { View, Text, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Ionicons } from '@expo/vector-icons'; // Corrected import
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';

export default function MyTrip() {

  const [userTrips, setUserTrips] = useState([]);
  
  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));  // For title and icon fade-in
  const [scaleAnim] = useState(new Animated.Value(0.8)); // For card scaling in
  
  useEffect(() => {
    // Trigger fade-in and scale-in animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Fully visible
        duration: 1000, // 1-second fade-in
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1, // Normal size
        friction: 5, // Bounciness
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.white,
      height: '100%',
    }}>

      {/* Title and Add Icon with fade-in animation */}
      <Animated.View 
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: fadeAnim, // Fade-in effect
        }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
        }}>
          My Trips
        </Text>
        <Ionicons name="add-circle" size={30} color="black" />
      </Animated.View>
      
      {/* Conditional rendering for StartNewTripCard with scale-in animation */}
      {userTrips?.length == 0 ? (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <StartNewTripCard />
        </Animated.View>
      ) : null}
      
    </View>
  );
}

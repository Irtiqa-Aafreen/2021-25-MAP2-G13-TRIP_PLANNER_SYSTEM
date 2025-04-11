import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Animated } from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'; // Import moment.js for date manipulation
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Track selected dates
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current; // For title fade-in
  const slideCalendarAnim = useRef(new Animated.Value(100)).current; // Slide-in for calendar
  const slideButtonAnim = useRef(new Animated.Value(100)).current; // Slide-in for button

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    // Start fade-in animation for the title
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Start slide-in animations for the calendar and button
    Animated.timing(slideCalendarAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideButtonAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [navigation]);

  // Function to handle date changes
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
    }
    console.log(`Selected ${type}:`, date);
  };

  // Function for continue button to log selected dates
  const OnDateSelectionContinue = () => {
    if (!selectedStartDate || !selectedEndDate) {
      ToastAndroid.show('Please select both start date and end date', ToastAndroid.LONG);
      return;
    }

    const startDate = moment(selectedStartDate);
    const endDate = moment(selectedEndDate);
    const totalNoOfDays = endDate.diff(startDate, 'days') + 1; // Add 1 to include both start and end dates

    setTripData({
      ...tripData,
      startDate: startDate,
      endDate: endDate,
      totalNoOfDays: totalNoOfDays,
    });

    router.push('/create-trip/select-budget');

    console.log('Total Number of Days:', totalNoOfDays);
    console.log('Start Date:', selectedStartDate);
    console.log('End Date:', selectedEndDate);
  };

  return (
    <View style={styles.container}>
      {/* Title with fade-in animation */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Travel Dates</Text>
      </Animated.View>

      <View style={{ marginTop: 30 }} />

      {/* Calendar Picker with slide-in animation */}
      <Animated.View style={{ transform: [{ translateY: slideCalendarAnim }] }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          minRangeDuration={2}
          maxRangeDuration={10}
          selectedRangeStyle={{ backgroundColor: Colors.black }}
          selectedDayTextStyle={{ color: Colors.white }}
        />
      </Animated.View>

      {/* Continue button with slide-in animation */}
      <Animated.View style={{ transform: [{ translateY: slideButtonAnim }] }}>
        <TouchableOpacity 
          onPress={OnDateSelectionContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 100,
    backgroundColor: 'white',
    height: '100%',
  },
  title: {
    fontSize: 35,
    fontFamily: 'outfit-bold',
    marginTop: 20,
  },
  continueButton: {
    padding: 15,
    backgroundColor: Colors.black,
    borderRadius: 20,
    marginTop: 25,
  },
  continueButtonText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: Colors.white,
    fontSize: 20,
  },
});

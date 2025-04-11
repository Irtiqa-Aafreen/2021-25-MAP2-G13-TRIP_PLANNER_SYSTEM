import { View, Text, FlatList, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext'; // Import the context
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function SelectBudget() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option   
  const { tripData, setTripData } = useContext(CreateTripContext); // Use the context to access data and set state
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedOption) {
      // Update tripData when an option is selected
      setTripData((prevData) => ({
        ...prevData,
        budget: selectedOption?.title // Assuming the 'title' field stores the budget value
      }));
    }
  }, [selectedOption, setTripData]); // Only depend on selectedOption and setTripData

  const onClickContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show('Select Your Budget', ToastAndroid.LONG);
      return;
    }

    router.push('/create-trip/review-trip');
  };

  // Function to handle card selection
  const handleSelect = (item) => {
    setSelectedOption(item); // Set the entire item (not just the id)
    console.log('Selected option details:', item); // Log the full selected option details
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Choose spending habits for your trip</Text>
      </View>

      <FlatList
        data={SelectBudgetOptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)} // Handle card selection
            activeOpacity={0.8}
          >
            <View style={styles.cardContainer}>
              <OptionCard options={item} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent} // Optional: Adjust content layout
        showsVerticalScrollIndicator={false} // Hide the scroll indicator (optional)
      />

      {/* Continue button with corrected onPress */}
      <TouchableOpacity 
        onPress={onClickContinue} // Invoke the function correctly
        style={{
          padding: 15,
          backgroundColor: Colors.black,
          borderRadius: 115,
          marginTop: 20,
        }}>
        <Text style={{
          textAlign: 'center',
          color: 'white',
          fontFamily: 'outfit-medium',
          fontSize: 20,
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    padding: 25,
    backgroundColor: 'white',
    flex: 1, // Allow the container to take up the full screen height
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
    marginTop: 10,
  },
  subtitleContainer: {
    marginTop: 20,
    marginBottom: 10, // Add some margin for spacing
  },
  subtitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  cardContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white', // Default background color for the cards
  },
  listContent: {
    paddingBottom: 20, // Add padding at the bottom for better scroll experience
  },
});

import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { router, useNavigation } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SelectTravelList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useContext } from 'react';

export default function SelectTraveler() {
    const navigation = useNavigation();
    const [selectedTraveler, setSelectedTraveler] = useState(null); // State to track selected card
    const { tripData, setTripData } = useContext(CreateTripContext);

    // Animation refs for title and cards
    const titleAnim = useRef(new Animated.Value(-100)).current; // Title falling from top
    const cardAnims = SelectTravelList.map(() => useRef(new Animated.Value(-100)).current); // Create an animation ref for each card

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });

        // Animate title falling from the top
        Animated.timing(titleAnim, {
            toValue: 0, // End position
            duration: 500, // Duration in ms
            useNativeDriver: true, // Use native driver for smoother animations
        }).start();

        // Animate the traveler cards one by one with stagger effect
        const animations = cardAnims.map((anim) => {
            return Animated.timing(anim, {
                toValue: 0, // Move to the final position
                duration: 500, // Duration for each card animation
                useNativeDriver: true,
            });
        });

        // Stagger the animations (delay between each animation)
        Animated.stagger(100, animations).start();
    }, [navigation]);

    useEffect(() => {
        setTripData({
            ...tripData,
            travelerCount: selectedTraveler,
        });
    }, [selectedTraveler]);

    const handleSelect = (item) => {
        setSelectedTraveler(item.id); // Update state with selected card's id
        console.log('Selected Traveler:', item.title); // Optional: Log the selected traveler
    };

    return (
        <View style={styles.container}>
            {/* Animated title */}
            <Animated.View style={{ transform: [{ translateY: titleAnim }] }}>
                <Text style={styles.title}>Who's Traveling</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Choose your Travelers</Text>
                </View>
            </Animated.View>

            {/* FlatList for displaying cards inside ScrollView with staggered animation */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.gap}></View>
                <FlatList
                    data={SelectTravelList}
                    keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
                    renderItem={({ item, index }) => (
                        <Animated.View
                            style={{
                                transform: [{ translateY: cardAnims[index] }], // Apply staggered animation for each card
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleSelect(item)} // Handle card selection
                                activeOpacity={0.8}
                            >
                                <View
                                    
                                >
                                    <OptionCard 
                                    style={[
                                        styles.cardContainer,
                                        selectedTraveler === item.id && styles.selectedCard, // Apply selected style
                                    ]}
                                    options={item} />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                />
                <TouchableOpacity
                    onPress={() => router.push('/create-trip/select-dates')}
                    style={styles.continueButton}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 100,
        backgroundColor: Colors.white,
        height: '100%',
    },
    title: {
        fontSize: 35,
        fontFamily: 'outfit-bold',
        marginTop: 10,
    },
    subtitleContainer: {
        marginTop: 20,
    },
    subtitle: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
    gap: {
        marginBottom: 30, // Gap between subtitle and cards
    },
    scrollContainer: {
        flexGrow: 1, // Ensures FlatList content can scroll
    },
    cardContainer: {
        marginBottom: 20,
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'white', // Default card background color
    },
    selectedCard: {
        backgroundColor: 'white', // Dark black color for the selected card
        borderRadius:2,
    },
    continueButton: {
        padding: 15,
        backgroundColor: Colors.black,
        borderRadius: 115,
        marginTop: 20,
    },
    continueButtonText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'outfit-medium',
        fontSize: 20,
    },
});

import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CreateTripContext } from './../../context/CreateTripContext';
import { useRouter } from 'expo-router';
import MapViewComponent from './MapViewComponent'; // Import MapViewComponent

export default function SearchPlace() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [locations, setLocations] = useState([]); // State to store search results
    const [selectedLocation, setSelectedLocation] = useState(null); // State to store the selected location
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search',
        });
    }, [navigation]);

    const handleSearch = async (query) => {
        if (!query) {
            setLocations([]); // Clear locations if input is empty
            return;
        }
    
        try {
            const encodedQuery = encodeURIComponent(query);
            const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&addressdetails=1`;
    
            console.log("Request URL:", apiUrl); // Log the URL
    
            const response = await fetch(apiUrl, {
                headers: {
                    'User-Agent': 'YourAppName/1.0', // Replace with your app name and version
                },
            });
    
            // Log the response status and headers
            console.log("Response Status:", response.status);
            console.log("Response Headers:", response.headers);
    
            // Log the full response text if it isn't JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const responseText = await response.text();
                console.log('Non-JSON response:', responseText); // Log the non-JSON response
                throw new Error('Expected JSON, received HTML or other format');
            }
    
            const data = await response.json();
            console.log("Response Data:", data); // Log the JSON response data
            setLocations(data); // Set the search results
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while searching for places. Please try again later.');
        }
    };
    

    const handleSelectLocation = (location) => {
        setSelectedLocation(location); // Store the selected location
        setLocations([]); // Clear the search results
        setSearchQuery(location.display_name); // Update the input with the selected location
        
        const { lat, lon, display_name } = location;

        // Update tripData in the context
        setTripData((prevData) => ({
            ...prevData,
            locationInfo: {
                name: display_name,
                coordinates: {
                    latitude: lat,
                    longitude: lon,
                },
                photoRef: null // Leave null or remove this as OSM doesn't provide photos
            }
        }));

        console.log('Selected Location:', display_name); // Log the selected location
        
        // Navigate to /create_trip/select-traveler after selecting a location
        router.push('/create-trip/select-traveler');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search Place"
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text); // Update the search query
                    handleSearch(text); // Trigger search as user types
                }}
                onSubmitEditing={() => handleSearch(searchQuery)} // Optional: Trigger search on submit
            />
            {locations.length > 0 && (
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.place_id.toString()} // Ensure unique keys
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelectLocation(item)} style={styles.locationItem}>
                            <Text style={styles.locationText}>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
            {selectedLocation && (
                <Text style={styles.selectedText}>Selected Location: {selectedLocation.display_name}</Text>
            )}
            {selectedLocation && (
                <MapViewComponent location={{
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lon,
                    name: selectedLocation.display_name,
                }} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 100,
        backgroundColor: Colors.white,
        flex: 1,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderRadius: 7,
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        marginTop: 20,
    },
    locationItem: {
        padding: 10,
    },
    locationText: {
        color: 'black', // Change this to the desired color
        fontSize: 16,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 16,
        color: 'green', // You can change this to any color you like
    },
});

// MapViewComponent.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ location }) => {
    if (!location) return null; // Do not render the map if no location is selected

    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: parseFloat(location.latitude),
                    longitude: parseFloat(location.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude),
                    }}
                    title={location.name}
                    description={location.address || 'Selected location'}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        marginTop: 20,
        height: 300, // Adjust height as needed
    },
    map: {
        ...StyleSheet.absoluteFillObject, // Fill the entire container
    },
});

export default MapViewComponent;

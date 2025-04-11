import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function OptionCard({ options, selectedOptions }) {
    // Determine if the current card is selected
    const isSelected = selectedOptions && selectedOptions.title === options.title;

    return (
        <View style={[styles.card, isSelected && styles.selectedCard]}>
            <View style={styles.row}>
                <Text style={styles.title}>{options.title}</Text>
                <Text style={[styles.icon, { color: getIconColor(options.icon) }]}>{options.icon}</Text>
            </View>
            <Text style={styles.desc}>{options.desc}</Text>
            <Text style={styles.people}>People: {options.people}</Text>
        </View>
    );
}

// Helper function to assign different colors based on the icon
const getIconColor = (icon) => {
    switch (icon) {
        case '✈':
            return '#007BFF'; // Blue for airplane
        case '🥂':
            return '#FF6347'; // Tomato for champagne
        case '🍻':
            return '#FFD700'; // Gold for beer
        case '👨‍👩‍👦‍👦':
            return '#32CD32'; // LimeGreen for family
        default:
            return '#000'; // Default color
    }
};

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
    },
    selectedCard: {
        color:Colors.black,
        backgroundColor: '#000', // Change background color to black when selected
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    icon: {
        fontSize: 30,
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontFamily: 'outfit-bold',
    },
    desc: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    people: {
        fontSize: 14,
        color: 'black',
    },
});

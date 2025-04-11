import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useRouter } from 'expo-router';
export default function StartNewTripCard() {

    const router=useRouter();
  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:25
    }}>
      <Ionicons name="location" size={30} color="black" />
      <Text style={{
        fontSize:25,
        fontFamily:'outfit-medium', marginTop:10,
      }}>
        No trips planned yet
      </Text>

      <Text style={{
        fontSize:20,
        fontFamily:'outfit', marginTop:10,
        textAlign:'center',
        color: '#808080',
      }}>
        Looks like it's time to plan a new trip! let's get stared travel together
      </Text>

      <TouchableOpacity
        onPress={()=>router.push('/create-trip/search-place')}
      style={{
        padding:10,
        backgroundColor:Colors.black,
        borderRadius:15,
        paddingHorizontal:30
      }}>
        <Text style={{
            color:Colors.white,
            fontFamily:'outfit-medium',
            fontSize:17
        }}>
            Start a new Trip
        </Text>
      </TouchableOpacity>
    </View>
  )
}
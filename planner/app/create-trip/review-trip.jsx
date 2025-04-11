import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import { CreateTripContext } from '../../context/CreateTripContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export default function ReviewTrip() {
    const navigation=useNavigation();
    const {tripData,setTripData}=useContext(CreateTripContext)

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    })
  return (
    <View>
      <Text style={{
        marginTop:100,
        marginLeft:30,
        fontFamily:'outfit-bold',
        fontSize:35
      }}>Review your Trip</Text>
      <View style={{
        marginTop:20,
        marginLeft:30,
        marginRight:30
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:20
        }}>Before generating your trip,  please review your selection</Text>

        {/* destination */}
        <View style={{
          marginTop:20,
          display:'flex',
          flexDirection:'row',
          gap:20
        }}>
        <Entypo name="location-pin" size={34} color="black" />
        <View>
          <Text style={{
            fontFamily:'outfit',
            fontSize:20,
            color:Colors.gray
          }}>Destination</Text>
          <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20
          }}>{tripData?.locationInfo?.name}</Text>
        </View>
        </View>

            {/* date selected info */}
        <View style={{
          marginTop:25,
          display:'flex',
          flexDirection:'row',
          gap:20
        }}>
        <Entypo name="calendar" size={34} color="black" />
        <View>
          <Text style={{
            fontFamily:'outfit',
            fontSize:20,
            color:Colors.gray
          }}>Travel Date</Text>
          <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20
          }}>{moment(tripData?.startDate).format('DD MMM')+
           "  To   "
          +moment(tripData?.endDate).format('DD MMM')+ "   "}
          ({tripData?.totalNoOfDays} days)
          </Text>
        </View>
        </View>

        {/* Travel info */}
        <View style={{
          marginTop:25,
          display:'flex',
          flexDirection:'row',
          gap:20
        }}>
        <FontAwesome5 name="bus" size={34} color="black" />
        <View>
          <Text style={{
            fontFamily:'outfit',
            fontSize:20,
            color:Colors.gray
          }}>Travel Information</Text>
          <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20
          
          }}>{tripData?.traveler?.title}</Text>
        </View>
        </View>
      </View>
    </View>
    
  )
}
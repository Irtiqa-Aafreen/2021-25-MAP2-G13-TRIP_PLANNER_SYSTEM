import { Image, View, Text, StyleSheet, TouchableOpacity,  }
from 'react-native';
import { AppRegistry } from 'react-native';
import React from 'react'
import 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useRouter } from 'expo-router';

export default function Login() {

  const router=useRouter();
  return (
    <View style={styles.container}>
      <Image source={require('./../assets/images/login.pgg.jpg')}
      style={{
        width:'100%',
        height:500
      }}
        />
        <View style={styles.container}>
          <Text style={{
            fontSize:28,
            fontFamily:'Outfit-Bold',
            textAlign:'center',
            padding:15
          }}>AI Travel Planner</Text>
          <Text style={{
            fontFamily:'outfit',
            fontSize:17,
            textAlign:'center',
            color:Colors.gray
          }}>
            Discover your next adventures effortlessly. Personalised at your fingertips. Travel smarter with AI-driven insights.
          </Text>

          
          <TouchableOpacity style={styles.button}
          onPress={()=>router.push('/auth/sign-in')}>
            <Text style={{color:Colors.white,
              textAlign:'center',
              fontFamily:'outfit',
              fontSize:17
            }} >
              Get Started
            </Text>
          </TouchableOpacity>


        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    backgroundColor: Colors.white,
    marginTop:-20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    height:'100',
    
  },
  button:{
    padding:15,
    backgroundColor:Colors.black,
    borderRadius:99,
    marginTop:'20%',
    width:'90%',
    alignSelf:'center'
  }
})
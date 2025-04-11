import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen'; 
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../configs/Firebaseconfig';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  // Animation Values
  const [fadeAnim] = useState(new Animated.Value(0)); // For fading in
  const [slideAnim] = useState(new Animated.Value(100)); // For sliding up
  const [scaleAnim] = useState(new Animated.Value(0.8)); // For scaling buttons

  useEffect(() => {
    // Parallel animation for fading in and sliding up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Fully visible
        duration: 1000, // Duration in ms
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Move to original position
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1, // Bounce to original scale
        friction: 5, // Bounciness factor
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter Email & Password", ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Email:", email);
        console.log("Password:", password);
        // Navigate to the tab layout (mytrip) after successful login
        router.replace("/mytrip");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        ToastAndroid.show("Invalid Credentials", ToastAndroid.LONG);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      {/* Title and Subtitle with fade-in animation */}
      <Animated.Text style={[styles.titleText, { opacity: fadeAnim }]}>
        Let's Sign You In
      </Animated.Text>
      <Animated.Text style={[styles.subtitleText, { opacity: fadeAnim }]}>
        Welcome Back
      </Animated.Text>
      <Animated.Text style={[styles.subtitleText, { opacity: fadeAnim }]}>
        You've been missed
      </Animated.Text>

      {/* Input fields with slide-up animation */}
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter Your Email" 
            value={email}
            onChangeText={(value) => setEmail(value)} 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your password" 
            secureTextEntry 
            value={password}
            onChangeText={(value) => setPassword(value)} 
          />
        </View>
      </Animated.View>

      {/* Sign In and Create Account buttons with scale animation */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('auth/sign-up')} style={styles.createaccButton}>
          <Text style={styles.createaccButtonText}>Create Account</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 80,
    backgroundColor: Colors.white || '#FFFFFF', 
    height: '100%',
    margin: 0,
    marginLeft: 0,
  },
  titleText: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginTop: 30
  },
  subtitleText: {
    fontFamily: 'outfit',
    fontSize: 30,
    color: '#808080',
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'outfit',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000',
  },
  signInButton: {
    padding: 20,
    backgroundColor: Colors.black || '#000',
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1
  },
  signInButtonText: {
    color: Colors.white || '#FFF',
    fontSize: 16,
    fontFamily: 'outfit',
  },
  createaccButton: {
    padding: 20,
    backgroundColor: Colors.white || '#FFFFFF',
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  createaccButtonText: {
    color: Colors.black || '#000',
    fontSize: 16,
    fontFamily: 'outfit',
  },
});

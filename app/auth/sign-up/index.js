import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { auth } from '../../../configs/Firebaseconfig';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';

export default function CreateAccount() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');

  const OnCreateAccount = async () => {
    if (!email || !password || !fullname) {
      ToastAndroid.show('Please enter all details', ToastAndroid.BOTTOM);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      router.replace('/mytrip');

      // Set the display name for the user
      await updateProfile(user, { displayName: fullname });

      console.log('User ID:', user.uid);
      console.log('Full Name:', user.displayName);
      console.log('Password:', password);

      ToastAndroid.show('Account created successfully!', ToastAndroid.BOTTOM);
      router.replace('auth/sign-in');
    } catch (error) {
      const errorMessage = error.message;
      console.log('Error:', errorMessage);
      ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.titleText}>Create New Account</Text>

      {/* Input fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          onChangeText={(value) => setFullname(value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>

      {/* Create Account and Sign In buttons */}
      <TouchableOpacity style={styles.createButton} onPress={OnCreateAccount}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('auth/sign-in')}
        style={styles.signinButton}
      >
        <Text style={styles.signinButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000',
  },
  createButton: {
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signinButton: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 30,
  },
  signinButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

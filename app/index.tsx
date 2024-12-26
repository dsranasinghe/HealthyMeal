import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      
      {/* Banner Image */}
      <Image source={require('../assets/images/girl.png')} style={styles.bannerImage} />
      
      <Text style={styles.title}>Healthy Meal Recipes</Text>
      <Text style={styles.subtitle}>Eat healthy, live better!</Text>
      
      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/signin")}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/signup")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  bannerImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

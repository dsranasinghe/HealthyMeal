import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CustomAlert from "../utils/customAlerts";
import { useAppContext } from "./context/AppContext"; 

const mockUsers = [
  { email: "testuser@example.com", password: "password123", username: "Test User" },
  { email: "john.doe@example.com", password: "123456", username: "John" },
];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsernameInput] = useState(""); 
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const router = useRouter();
  const { setUsername } = useAppContext(); // Use AppContext to set username

  // Helper function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  };

  // Helper function for basic password validation
  const isValidPassword = (password: string) => {
    return password.length >= 6; // Password must be at least 6 characters long
  };

  const handleSignUp = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedUsername = username.trim();

    // Validate inputs
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      setAlertMessage("All fields are required.");
      setAlertVisible(true);
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setAlertMessage("Please enter a valid email address.");
      setAlertVisible(true);
      return;
    }

    if (!isValidPassword(trimmedPassword)) {
      setAlertMessage("Password must be at least 6 characters long.");
      setAlertVisible(true);
      return;
    }

    if (mockUsers.find((u) => u.email === trimmedEmail)) {
      setAlertMessage("Account creation failed. Email already exists.");
      setAlertVisible(true);
      return;
    }

    // Add new user to mockUsers array
    mockUsers.push({ email: trimmedEmail, password: trimmedPassword, username: trimmedUsername });
    setUsername(trimmedUsername); // Save username in AppContext
    setAlertMessage("Account created successfully!");
    setAlertVisible(true);

    setTimeout(() => {
      setAlertVisible(false);
      router.push("/HomeScreen"); // Navigate to HomeScreen
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsernameInput}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Create a password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/signin")}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.signInText}>Sign in now</Text>
        </Text>
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#333",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  footerText: {
    color: "#666",
    marginTop: 10,
  },
  signInText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

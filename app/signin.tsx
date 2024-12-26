import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CustomAlert from "../utils/customAlerts";
import { useAppContext } from "./context/AppContext";

const mockUsers = [
  { email: "testuser@example.com", password: "password123", username: "Test User" },
  { email: "john.doe@example.com", password: "123456", username: "John" },
];

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const router = useRouter();

const { setUsername } = useAppContext();

const handleLogin = () => {
  const user = mockUsers.find((u) => u.email === email && u.password === password);

  if (user) {
    setAlertMessage("Login successful");
    setAlertVisible(true);
    setUsername(user.username); // Update the context with the username
    setTimeout(() => {
      setAlertVisible(false);
      router.push("/HomeScreen"); // Navigate without query parameters
    }, 2000);
  } else {
    setAlertMessage("Login failed. Please try again.");
    setAlertVisible(true);
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey, Welcome Back</Text>
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
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
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
});

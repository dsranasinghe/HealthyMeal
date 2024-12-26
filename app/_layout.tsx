import { Stack } from "expo-router";
import { AppProvider } from "./context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Define the screens */}
        <Stack.Screen name="index" /> {/* Welcome Page */}
        <Stack.Screen name="signin" /> {/* Sign In Page */}
        <Stack.Screen name="signup" /> {/* Sign Up Page */}
        <Stack.Screen name="HomeScreen" /> {/* Home Screen */}
        <Stack.Screen name="RecipeDetail" /> {/* Recipe Detail Screen */}
      </Stack>
    </AppProvider>
  );
}

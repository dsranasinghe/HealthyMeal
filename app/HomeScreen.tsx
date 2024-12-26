import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppContext } from "./context/AppContext";

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  vegetarian: boolean;
}

// Fetch 20 random recipes from TheMealDB API
const fetchRecipes = async (): Promise<Recipe[]> => {
  try {
    const randomRecipePromises = Array.from({ length: 20 }, () =>
      fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => res.json())
    );

    const randomRecipes = await Promise.all(randomRecipePromises);

    // Transform API response to match your Recipe interface
    return randomRecipes.map((response) => {
      const meal = response.meals[0];
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        summary: "A delicious recipe from TheMealDB.",
        vegetarian: meal.strCategory === "Vegetarian",
      };
    });
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return [];
  }
};

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();
  const { username, setRecipeId, savedRecipes, saveRecipe } = useAppContext();

  useEffect(() => {
    fetchRecipes().then(setRecipes);
  }, []);

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.summary.replace(/<[^>]*>/g, "")}
        </Text>
        <Text style={styles.status}>{item.vegetarian ? "Vegetarian" : "Non-Vegetarian"}</Text>
        <View style={styles.cardButtons}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveRecipe(item.id.toString())} // Save recipe
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => {
              setRecipeId(item.id.toString()); // Set recipe ID in context
              router.push(`/RecipeDetailScreen`);
            }}
          >
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar with Username */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Welcome, {username}</Text>
      </View>

      <Text style={styles.header}>Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipeCard}
        contentContainerStyle={styles.list}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{savedRecipes.length} Saved</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  topBar: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
  },
  topBarText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: "#FFF",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  saveButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  detailsButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

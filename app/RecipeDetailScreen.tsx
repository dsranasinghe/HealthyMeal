import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useAppContext } from "./context/AppContext";

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
}

// Fetch recipe details by ID
const fetchRecipeById = async (id: string): Promise<RecipeDetail | null> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0] || null;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};

export default function RecipeDetailScreen() {
  const { recipeId } = useAppContext(); // Access recipeId from context
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

  useEffect(() => {
    if (recipeId) {
      fetchRecipeById(recipeId).then(setRecipe);
    }
  }, [recipeId]);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading recipe details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <Text style={styles.category}>Category: {recipe.strCategory}</Text>
        <Text style={styles.area}>Cuisine: {recipe.strArea}</Text>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructions}>{recipe.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  category: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  area: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  instructions: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

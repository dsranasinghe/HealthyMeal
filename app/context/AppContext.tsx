import React, { createContext, useContext, useState } from "react";

interface AppContextProps {
  username: string | null;
  setUsername: (username: string | null) => void;
  recipeId: string | null;
  setRecipeId: (id: string | null) => void;
  savedRecipes: string[]; 
  saveRecipe: (id: string) => void; 
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [recipeId, setRecipeId] = useState<string | null>(null); 
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  
  const saveRecipe = (id: string) => {
    if (!savedRecipes.includes(id)) {
      setSavedRecipes((prev) => [...prev, id]); // Add recipe ID to the saved list
    }
  };

  return (
    <AppContext.Provider
      value={{ username, setUsername, recipeId, setRecipeId, savedRecipes, saveRecipe }}
    >

      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

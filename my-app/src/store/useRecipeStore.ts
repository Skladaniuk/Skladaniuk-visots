import { create } from "zustand";
import { getAllMeals, getCategories, searchMeals } from "../api/api";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  [key: string]: string | undefined; // Додаємо, щоб працювати з динамічними інгредієнтами
}

interface RecipeStore {
  recipes: Recipe[];
  categories: string[];
  selectedCategory: string;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  favourites: Recipe[];
  selectedRecipes: Recipe[];
  fetchRecipes: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  addToFavourites: (recipe: Recipe) => void;
  removeFromFavourites: (idMeal: string) => void;
  toggleSelectRecipe: (recipe: Recipe) => void;
  getCombinedIngredients: () => Record<string, number>;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  categories: [],
  selectedCategory: "",
  currentPage: 1,
  itemsPerPage: 10,
  searchQuery: "",
  favourites: [],
  selectedRecipes: [],

  fetchRecipes: async () => {
    const data = await getAllMeals();
    set({ recipes: data });
  },

  fetchCategories: async () => {
    const data = await getCategories();
    set({ categories: data.map((c: any) => c.strCategory) });
  },

  setPage: (page) => set({ currentPage: page }),

  setSearchQuery: async (query: string) => {
    set({ searchQuery: query });
    if (query) {
      const data = await searchMeals(query);
      set({ recipes: data || [] });
    } else {
      const data = await getAllMeals();
      set({ recipes: data });
    }
  },

  addToFavourites: (recipe) => {
    const { favourites } = get();
    if (!favourites.find((fav) => fav.idMeal === recipe.idMeal)) {
      set({ favourites: [...favourites, recipe] });
    }
  },

  removeFromFavourites: (idMeal) => {
    set({
      favourites: get().favourites.filter((fav) => fav.idMeal !== idMeal),
      selectedRecipes: get().selectedRecipes.filter(
        (fav) => fav.idMeal !== idMeal
      ),
    });
  },

  toggleSelectRecipe: (recipe) => {
    const { selectedRecipes } = get();
    const isSelected = selectedRecipes.find((r) => r.idMeal === recipe.idMeal);
    if (isSelected) {
      set({
        selectedRecipes: selectedRecipes.filter(
          (r) => r.idMeal !== recipe.idMeal
        ),
      });
    } else {
      set({ selectedRecipes: [...selectedRecipes, recipe] });
    }
  },

  getCombinedIngredients: () => {
    const { selectedRecipes } = get();
    const ingredientsMap: Record<string, number> = {};

    selectedRecipes.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`] as string;
        const measure = recipe[`strMeasure${i}`] as string;

        if (ingredient && ingredient.trim()) {
          const key = `${ingredient} (${measure})`;
          ingredientsMap[key] = (ingredientsMap[key] || 0) + 1;
        }
      }
    });

    return ingredientsMap;
  },
}));

import axios from "axios";
import { AxiosError } from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const api = axios.create({
  baseURL: API_URL,
});

export const getAllMeals = async () => {
  const response = await api.get("/search.php?s=");
  return response.data.meals;
};

export const getMealById = async (id: string) => {
  try {
    const response = await api.get(`/lookup.php?i=${id}`);
    return response.data.meals[0];
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get("/categories.php");
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const searchMeals = async (searchTerm: string) => {
  try {
    const response = await api.get(`/search.php?s=${searchTerm}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error searching meals:", error);
    return [];
  }
};

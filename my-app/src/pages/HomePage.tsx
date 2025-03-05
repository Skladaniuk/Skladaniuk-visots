import { useState, useEffect } from "react";
import { useRecipeStore } from "../store/useRecipeStore";
import { searchMeals } from "../api/api";
import RecipeList from "../components/RecipeList/RecipeList";
import SearchBar from "../components/SearchBar/SearchBar";
import CategorySelector from "../components/CategorySelector/CategorySelector";
import Pagination from "../components/Pagination/Pagination";
import styles from "./HomePage.module.scss";
import { Recipe } from "../store/useRecipeStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { recipes, fetchRecipes, fetchCategories, categories } =
    useRecipeStore();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, [fetchRecipes, fetchCategories]);

  useEffect(() => {
    if (recipes.length > 0) {
      setFilteredRecipes(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (debouncedSearchQuery) {
        const searchResults = await searchMeals(debouncedSearchQuery);
        setFilteredRecipes(searchResults);
      } else {
        if (selectedCategory) {
          const filteredByCategory = recipes.filter(
            (recipe) => recipe.strCategory === selectedCategory
          );
          setFilteredRecipes(filteredByCategory);
        } else {
          setFilteredRecipes(recipes);
        }
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchQuery, recipes, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category) {
      const filteredByCategory = recipes.filter(
        (recipe) => recipe.strCategory === category
      );
      setFilteredRecipes(filteredByCategory);
    } else {
      setFilteredRecipes(recipes);
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.homePage}>
      <h1>Recipes</h1>
      <button
        className={styles.favoritesButton}
        onClick={() => navigate("/favourites")}
      >
        Go to Favorites
      </button>

      <SearchBar
        value={debouncedSearchQuery}
        onChange={(e) => setDebouncedSearchQuery(e.target.value)}
      />

      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />

      <RecipeList recipes={paginatedRecipes} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;

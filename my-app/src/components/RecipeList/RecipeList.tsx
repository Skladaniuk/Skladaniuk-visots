import React from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../../store/useRecipeStore";
import { useRecipeStore } from "../../store/useRecipeStore";
import styles from "./RecipeList.module.scss";

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useRecipeStore();

  const toggleFavourite = (recipe: Recipe) => {
    if (favourites.some((fav) => fav.idMeal === recipe.idMeal)) {
      removeFromFavourites(recipe.idMeal);
    } else {
      addToFavourites(recipe);
    }
  };

  return (
    <div className={styles.recipeList}>
      {recipes.length > 0 ? (
        recipes.map((meal) => (
          <div key={meal.idMeal} className={styles.recipeCard}>
            <Link to={`/recipe/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
            </Link>
            <p>{meal.strCategory}</p>
            <button
              className={styles.favouriteButton}
              onClick={() => toggleFavourite(meal)}
            >
              {favourites.some((fav) => fav.idMeal === meal.idMeal)
                ? "Remove from Favourites"
                : "Add to Favourites"}{" "}
            </button>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;

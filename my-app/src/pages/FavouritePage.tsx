import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/useRecipeStore";
import styles from "./FavouritePage.module.scss";

const FavouritePage = () => {
  const {
    favourites,
    removeFromFavourites,
    selectedRecipes,
    toggleSelectRecipe,
    getCombinedIngredients,
  } = useRecipeStore();
  const navigate = useNavigate();

  const combinedIngredients = getCombinedIngredients();

  return (
    <div className={styles.favouritesPage}>
      <h1>Favourites</h1>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        ⬅ Back to Recipes
      </button>

      {favourites.length === 0 ? (
        <p>No favourite recipes yet.</p>
      ) : (
        <div className={styles.favouritesList}>
          {favourites.map((meal) => (
            <div key={meal.idMeal} className={styles.favouriteCard}>
              <input
                type="checkbox"
                checked={selectedRecipes.some((r) => r.idMeal === meal.idMeal)}
                onChange={() => toggleSelectRecipe(meal)}
              />
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <p>{meal.strCategory}</p>
              <button
                className={styles.removeButton}
                onClick={() => removeFromFavourites(meal.idMeal)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedRecipes.length > 0 && (
        <div className={styles.ingredientsSection}>
          <h2>Combined Ingredients</h2>
          <ul>
            {Object.entries(combinedIngredients).map(([ingredient, count]) => (
              <li key={ingredient}>
                {ingredient} - {count}x
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FavouritePage;

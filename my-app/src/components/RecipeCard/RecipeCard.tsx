import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.scss";

interface RecipeCardProps {
  recipe: { idMeal: string; strMeal: string; strMealThumb: string };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className={styles.recipeCard}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <Link to={`/recipe/${recipe.idMeal}`}>View Recipe</Link>
    </div>
  );
};

export default RecipeCard;
export {};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMealById } from "../api/api";
import styles from "./RecipePage.module.scss";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getMealById(id).then(setMeal);
    }
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      });
    }
  }

  return (
    <div className={styles.recipePage}>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
      <p>
        <b>Category:</b> {meal.strCategory}
      </p>
      <p>
        <b>Area:</b> {meal.strArea}
      </p>
      <p>
        <b>Instructions:</b> {meal.strInstructions}
      </p>
      <p>
        <b>Source:</b>{" "}
        <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
          Recipe Source
        </a>
      </p>

      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <b>{ingredient.measure}</b> {ingredient.ingredient}
          </li>
        ))}
      </ul>

      <p>
        <b>Video Instructions:</b>{" "}
        <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
          Watch on YouTube
        </a>
      </p>

      <button className={styles.backButton} onClick={() => navigate("/")}>
        ⬅ Back to Recipes
      </button>
    </div>
  );
};

export default RecipePage;

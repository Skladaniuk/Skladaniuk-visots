// components/CategorySelector/CategorySelector.tsx

import React from "react";
import styles from "./CategorySelector.module.scss";

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onChange,
}) => {
  return (
    <div className={styles.categoryWrapper}>
      <select
        className={styles.categorySelect}
        onChange={(e) => onChange(e.target.value)}
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CategorySelector;

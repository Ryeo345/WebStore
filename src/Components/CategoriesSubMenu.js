import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const CategoriesSubMenu = () => {
  const { products } = useSelector((state) => state);
  const location = useLocation();
  const view = location.pathname;

  const categoryPath = (category) => {
    return "/menu/" + category.toLowerCase().split(" ").join("");
  };

  const categories = (products) => {
    const _categories = [];

    products.map((product) => {
      if (!_categories.includes(product.category)) {
        _categories.push(product.category);
      }
    });
    return _categories;
  };

  return (
    <div id="categories-container">
      <ul>
        {categories(products).map((category) => {
          const currentCategory = categoryPath(category);

          return (
            <li
              style={{ display: "inline" }}
              className="category-titles"
              key={category}
            >
              <Link
                to={currentCategory}
                className={view === currentCategory ? "selected" : ""}
              >
                {category}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesSubMenu;

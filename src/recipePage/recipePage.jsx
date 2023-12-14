import React from 'react';
import './recipePage.css'

export function RecipePage(props) {

  const recipe = props.recipe;

  function getIngredients() {
    let ingredientsTable = [];

    recipe.ingredients.forEach((ingredient) => {
      ingredientsTable.push(
        <th>{ingredient}</th>
      );
    })

    return ingredientsTable;
  }

  function getInstructions() {
    let instructionsTable = [];

    recipe.instructions.forEach((instruction, index) => {
      instructionsTable.push(
        <tr>
          <th>
            <p>{index + 1}</p>
          </th>
          <td>
            {instruction}
          </td>
        </tr>
      );
    })

    return instructionsTable;
  }

  return (
    <div className="main-content">
      <div className="recipe">
        <h1>{recipe.title}</h1>
        <div className="serving">
          <a>{recipe.servingSize}</a>
        </div>
        <div className="recipe__ingredients">
          <h4>Ingredients</h4>
          <table className="ingredients_table">
            <tbody>
              <tr>
                {getIngredients()}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recipe__subtitle">
          <h4>Instructions</h4>
          <table className="instructions_table">
            <tbody>
              {getInstructions()}
            </tbody>
          </table>
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        alt="food_pic"
      />
  </div>

  );
}
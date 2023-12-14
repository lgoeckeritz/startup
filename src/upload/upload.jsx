import React from 'react';
import { useNavigate } from 'react-router';
import { Recipe } from './recipe';
//the reason all the css is imbedded is that this css was effecting the rest of the
//pages and I didn't know why. This was just the simplest solution to me

export function Upload(props) {

  const navigate = useNavigate();

  const [title, setTitle] = React.useState('');
  const [servingSize, setServingSize] = React.useState('');
  const author = props.author;
  const [cookTime, setCookTime] = React.useState('');
  let ingredients = [];
  let instructions = [];

  const [ingredient_html, setIngredientHTML] = React.useState([]);
  const [instruction_html, setInstructionHTML] = React.useState([]);

  React.useEffect(() => {
    addIngredient();
    addInstruction();
  }, [])

  function submit() {
    saveRecipe(new Recipe(title, author, servingSize, cookTime, ingredients, instructions, null));
    navigate('/recipes');
  }

  async function saveRecipe(recipe) {
    try {
      const response = await fetch('/api/recipe', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(recipe),
        });
      
      // Store what the service gave as recipeList
      const recipeList = await response.json();

      localStorage.setItem('recipeList', JSON.stringify(recipeList));
    } catch {
      // Get existing recipes from localStorage or create an empty array
      const recipeList = JSON.parse(localStorage.getItem("recipeList")) || [];

      // Add the new recipe to the array
      recipeList.push(recipe);

      // Save the updated recipeList back to localStorage
      localStorage.setItem("recipeList", JSON.stringify(recipeList));
    }
  }

  function addIngredient() {
    let ingredient = '';
    ingredients.push(ingredient);
    let new_ing = (
      <div>
        <input
          onChange={(e) => ingredient = e.target.value}
          type="text"
          className="ingredient"
          name="ingredients[]"
          required=""
          style={{
            width: "100%",
            paddingBottom: 10,
            paddingTop: 10,
            marginTop: 5,
            border: "1px solid #ccc",
            borderRadius: 4

          }}
        />
      </div>
    )
    setIngredientHTML([...ingredient_html, new_ing]);
  }

  function removeIngredient() {
    const updatedIng = ingredient_html.slice(0, -1);
    setIngredientHTML(updatedIng);
    ingredients.pop();
  }

  function addInstruction() {
    let instruction = '';
    ingredients.push(instruction);
    let new_ins = (
      <div>
        <textarea
          onChange={(e) => instruction = e.target.value}
          className="instruction"
          name="instructions[]"
          required=""
          style={{
            width: "100%",
            paddingBottom: 10,
            paddingTop: 10,
            marginTop: 5,
            border: "1px solid #ccc",
            borderRadius: 4
          }}
          defaultValue={""}
        />
      </div>
    )
    setInstructionHTML([...instruction_html, new_ins]);
  }

  function removeInstruction() {
    const updatedIns = instruction_html.slice(0, -1);
    setInstructionHTML(updatedIns);
    instructions.pop();
  }

  return (
    <body>
      <div
        className="recipe-form"
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: 20,
          width: 400
        }}
      >
        <h2>Upload Your Recipe</h2>
        <form id="recipe-form" style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="title" style={{ fontWeight: "bold", marginTop: 10 }}>
            Title:
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
            required=""
            style={{
              width: "100%",
              paddingBottom: 10,
              paddingTop: 10,
              marginTop: 5,
              border: "1px solid #ccc",
              borderRadius: 4
            }}
          />
          <label htmlFor="serving-size" style={{ fontWeight: "bold", marginTop: 10 }}>
            Serving Size:
          </label>
          <input
            onChange={(e) => setServingSize(e.target.value)}
            type="text"
            id="serving-size"
            name="serving-size"
            required=""
            style={{
              width: "100%",
              paddingBottom: 10,
              paddingTop: 10,
              marginTop: 5,
              border: "1px solid #ccc",
              borderRadius: 4
            }}
          />
          <label htmlFor="cook-time" style={{ fontWeight: "bold", marginTop: 10 }}>
            Cook Time:
          </label>
          <input
            onChange={(e) => setCookTime(e.target.value)}
            type="text"
            id="cook-time"
            name="cook-time"
            required=""
            style={{
              width: "100%",
              paddingBottom: 10,
              paddingTop: 10,
              marginTop: 5,
              border: "1px solid #ccc",
              borderRadius: 4
            }}
          />
          <div className="ingredients" style={{ marginTop: 15 }}>
            <label style={{ fontWeight: "bold" }}>Ingredients:</label>
            <div
              className="ingredient-row"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div>{ingredient_html}</div>
              
              <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column" }}>
                <button
                type="button"
                className="add-ingredient"
                onClick={() => addIngredient()}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: 10
                }}
              >
                Add Ingredient
              </button>
              {ingredient_html.length > 1 && (
                <button
                type="button"
                className="add-ingredient"
                onClick={() => removeIngredient()}
                style={{
                  backgroundColor: "#c23b22",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginTop: "10px"
                }}
              >
                Remove Ingredient
              </button>
              )}</div>
              
            </div>
          </div>
          <div className="instructions" style={{ marginTop: 15 }}>
            <label style={{ fontWeight: "bold" }}>Instructions:</label>
            <div
              className="instruction-row"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div>{instruction_html}</div>

              <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column" }}>
                <button
                  type="button"
                  className="add-instruction"
                  onClick={() => addInstruction()}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "10px 15px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginLeft: 10
                  }}
                >
                  Add Instruction
                </button>

                {instruction_html.length > 1 && (
                  <button
                  type="button"
                  className="add-instruction"
                  onClick={() => removeInstruction()}
                  style={{
                    backgroundColor: "#c23b22",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "10px 15px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginLeft: 10,
                    marginTop: "10px"
                  }}
                >
                  Remove Instruction
                </button>
                )}
              </div>
            </div>
          </div>
          <div className="button-container" style={{ display: "flex", flex: "row" }}>
            <button
              type="button"
              id="cancel-button"
              onClick={() => navigate('/recipes')}
              style={{
                marginTop: 20,
                fontFamily: '"Roboto", sans-serif',
                textTransform: "uppercase",
                outline: 0,
                background: "white",
                width: "100%",
                border: "2px solid #c23b22",
                padding: 15,
                color: "#c23b22",
                fontSize: 15,
                WebkitTransition: "all 0.3 ease",
                transition: "all 0.3 ease",
                cursor: "pointer",
                marginRight: 5
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-button"
              onClick={() => submit()}
              style={{
                marginTop: 20,
                fontFamily: '"Roboto", sans-serif',
                textTransform: "uppercase",
                outline: 0,
                background: "#b76e79",
                width: "100%",
                border: "2px solid #b76e79",
                padding: 15,
                color: "white",
                fontSize: 15,
                WebkitTransition: "all 0.3 ease",
                transition: "all 0.3 ease",
                cursor: "pointer",
                marginRight: 5
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </body>
  );
}
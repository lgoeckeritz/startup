document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("recipe-form");
    const ingredients = document.querySelector(".ingredients");
    const instructions = document.querySelector(".instructions");

    // Handle adding ingredients
    const addIngredientButton = document.querySelector(".add-ingredient");
    addIngredientButton.addEventListener("click", function () {
        const ingredientRow = document.createElement("div");
        ingredientRow.classList.add("ingredient-row");

        const ingredientInput = document.createElement("input");
        ingredientInput.type = "text";
        ingredientInput.classList.add("ingredient");
        ingredientInput.name = "ingredients[]";
        ingredientInput.required = true;

        const removeIngredientButton = document.createElement("button");
        removeIngredientButton.type = "button";
        removeIngredientButton.classList.add("remove-button"); // Add the "remove-button" class
        removeIngredientButton.textContent = "Remove";
        removeIngredientButton.addEventListener("click", function () {
            ingredients.removeChild(ingredientRow);
        });

        ingredientRow.appendChild(ingredientInput);
        ingredientRow.appendChild(removeIngredientButton);
        ingredients.appendChild(ingredientRow);
    });

    // Handle adding instructions
    const addInstructionButton = document.querySelector(".add-instruction");
    addInstructionButton.addEventListener("click", function () {
        const instructionRow = document.createElement("div");
        instructionRow.classList.add("instruction-row");

        const instructionTextarea = document.createElement("textarea");
        instructionTextarea.classList.add("instruction");
        instructionTextarea.name = "instructions[]";
        instructionTextarea.required = true;

        const removeInstructionButton = document.createElement("button");
        removeInstructionButton.type = "button";
        removeInstructionButton.classList.add("remove-button"); // Add the "remove-button" class
        removeInstructionButton.textContent = "Remove";
        removeInstructionButton.addEventListener("click", function () {
            instructions.removeChild(instructionRow);
        });

        instructionRow.appendChild(instructionTextarea);
        instructionRow.appendChild(removeInstructionButton);
        instructions.appendChild(instructionRow);
    });
  
    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", function () {
        // Redirect to recipes.html
        window.location.href = "recipes.html";
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get user inputs
        const title = document.getElementById("title").value;
        const servingSize = document.getElementById("serving-size").value;
        const author = localStorage.getItem("userName") || "Guest User";
        const cookTime = document.getElementById("cook-time").value;

        const ingredientInputs = document.querySelectorAll(".ingredient");
        const ingredients = Array.from(ingredientInputs).map((input) => input.value);

        const instructionTextareas = document.querySelectorAll(".instruction");
        const instructions = Array.from(instructionTextareas).map((textarea) => textarea.value);

        // Create a Recipe object
        const newRecipe = new Recipe(title, author, servingSize, cookTime, ingredients, instructions, null);

        // Get existing recipes from localStorage or create an empty array
        const recipeList = JSON.parse(localStorage.getItem("recipeList")) || [];

        // Add the new recipe to the array
        recipeList.push(newRecipe);

        // Save the updated recipeList back to localStorage
        localStorage.setItem("recipeList", JSON.stringify(recipeList));

        // You can redirect to another page or display a success message here
        alert("Recipe uploaded successfully!");
        // Optionally, redirect to another page
        window.location.href = "recipes.html"; // Redirect to the home page

        // Clear the form
        form.reset();
        ingredients.innerHTML = ''; // Clear added ingredient rows
        instructions.innerHTML = ''; // Clear added instruction rows
    });
});

class Recipe {

    constructor(title, author, servingSize, cookTime, ingredients, instructions, picture) {
        this.title = title || "";
        this.servingSize = servingSize || "";
        this.author = author || "";
        this.cookTime = cookTime || "";
        this.ingredients = ingredients || [];
        this.instructions = instructions || [];
        this.picture = picture || null;
    }
}
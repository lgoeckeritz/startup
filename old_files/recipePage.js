window.onload = function() {
    loadRecipes();
};

async function loadRecipes() {
    // getting the latest recipes from the service
    let recipeList = [];
    try {
        const response = await fetch('/api/recipes');
        recipeList = await response.json();

        // Save the recipes in case we go offline in the future
        localStorage.setItem('recipeList', JSON.stringify(recipeList));
    } catch {
        // If there was an arror then just use the last saved recipes
        // Retrieve the recipeList from localStorage
        recipeList = JSON.parse(localStorage.getItem('recipeList'));
    }

    // Retrieve the index of the clicked card from localStorage
    const clickedCardIndex = localStorage.getItem('clickedCardIndex');

    // Check if the clickedCardIndex is valid and recipeList exists
    if (clickedCardIndex !== null && Array.isArray(recipeList)) {
        const recipe = recipeList[clickedCardIndex];

        // Update the DOM with data from the Recipe object
        document.querySelector('.recipe h1').textContent = recipe.title;
        document.querySelector('.serving a').textContent = `Serving Size: ${recipe.servingSize}`;

        // Update the Ingredients table
        const ingredientsTable = document.querySelector('.ingredients_table');
        ingredientsTable.innerHTML = ''; // Clear the table

        recipe.ingredients.forEach((ingredient) => {
            const row = ingredientsTable.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = ingredient;
        });

        // Update the Instructions table
        const instructionsTable = document.querySelector('.instructions_table');
        instructionsTable.innerHTML = ''; // Clear the table

        recipe.instructions.forEach((instruction, index) => {
            const row = instructionsTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);

            cell1.innerHTML = `<p>${index + 1}</p>`;
            cell2.textContent = instruction;
        });

        // Update the recipe image
        if (recipe.picture) {
            const imageElement = document.querySelector('img');
            imageElement.src = recipe.picture;
        }
    }
}
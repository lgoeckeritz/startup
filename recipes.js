class MainPage {
    recipeList;
    userName;
    currPage;

    constructor() {
        this.recipeList = [];
        this.userName = localStorage.getItem('userName') ?? 'Guest User';
        this.currPage = 0;

        this.setRecipeList()

        //setting the first value of recipeList to a dummy value
        const myRecipe = new Recipe(
            "My Favorite Fudge Brownie Mix",
            "Liz Goeckeritz",
            "15",
            ["Betty Crocker Fudge Brownie Mix", 
            "1/4 Cup Water", 
            "1/3 Cup Vegetable Oil", 
            "1 Egg"],
            ["Heat oven to 350F for shiny metal pan or 325F for nonstick or glass pan. Grease bottom of pan.",
            "Stir Brownie Mix, water, oil, and egg in a medium bowl until well blended. Spread in the pan.",
            "In an 11\" x 7\" pan, bake for 27-30 minutes."],
            null
        );
        
        this.recipeList[0] = myRecipe;
        localStorage.setItem('recipeList', JSON.stringify(this.recipeList));

        //setting up the recipe cards
        this.setRecipeCards();

    }

    setRecipeList() {
        // Check if there's data in localStorage
        const localStorageRecipeList = localStorage.getItem('recipeList');

        // If data exists, parse it and assign it to recipeList
        if (localStorageRecipeList) {
            try {
                this.recipeList = JSON.parse(localStorageRecipeList);
            } catch (error) {
                // Handle parsing error if needed
                console.error("Error parsing recipe list from localStorage:", error);
            }
        }
    }

    setRecipeCards() {

        for (let i = 0; i < 3; i++) {
            let arrayIndex = this.currPage * 3 + i;
            if (arrayIndex < this.recipeList.length) {

            } 
            else {
                // Hide the card using the article ID
                const articleId = "article" + i;
                const article = document.getElementById(articleId);
                article.style.display = 'none';
            }

        }



    }
}


class Recipe {

    constructor(title, author, cookTime, ingredients, instructions, picture) {
        this.title = title || "";
        this.author = author || "";
        this.cookTime = cookTime || "";
        this.ingredients = ingredients || [];
        this.instructions = instructions || [];
        this.picture = picture || null;
    }
}

window.onload = function() {
    const mainPage = new MainPage();
}

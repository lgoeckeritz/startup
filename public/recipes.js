class MainPage {
    recipeList;
    userName;
    currPage;

    constructor() {
        this.userName = localStorage.getItem('userName');
        if (this.userName == "") {
            this.getRandomUser();
        }
        this.currPage = localStorage.getItem('currPage') ? parseInt(localStorage.getItem('currPage')) : 0; // Retrieve currPage from localStorage

        this.loadRecipes();
    }

    getRandomUser() {
        fetch('https://randomuser.me/api/')
            .then((response) => response.json())
            .then((data) => {
                const user = data.results[0];
                const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
                this.userName = fullName;
                localStorage.setItem('userName', fullName);
            });
    }

    async loadRecipes() {
        // getting the latest recipes from the service
        this.recipeList = [];
        try {
            const response = await fetch('/api/recipes');
            this.recipeList = await response.json();
    
            // Save the recipes in case we go offline in the future
            localStorage.setItem('recipeList', JSON.stringify(recipeList));
        } catch {
            // If there was an arror then just use the last saved recipes
            // Retrieve the recipeList from localStorage
            this.recipeList = JSON.parse(localStorage.getItem('recipeList'));
        }
    
        this.setRecipeCards();
    }

    setRecipeCards() {

        for (let i = 0; i < 3; i++) {
            let arrayIndex = this.currPage * 3 + i;

            const articleId = "article" + i;
            const article = document.getElementById(articleId);

            if (arrayIndex < this.recipeList.length) {

                //article.style.display = 'block';
                article.hidden = false;

                const titleId = "title" + i;
                const authorId = "author" + i;
                const timeId = "time" + i;

                document.getElementById(titleId).textContent = this.recipeList[arrayIndex].title;
                document.getElementById(authorId).textContent = this.recipeList[arrayIndex].author;
                document.getElementById(timeId).textContent = this.recipeList[arrayIndex].cookTime;

                article.addEventListener('click', () => {
                    localStorage.setItem('clickedCardIndex', arrayIndex);
                });

            } 
            else {
                // Hide the card using the article ID
                article.hidden = true;
            }

        }



    }

     // Function to handle "Prev" button click
     handlePrevButtonClick() {
        if (this.currPage > 0) {
            this.currPage--;
            localStorage.setItem('currPage', this.currPage);
            this.setRecipeCards();
        }
    }

    // Function to handle "Next" button click
    handleNextButtonClick() {
        const maxPage = Math.floor((this.recipeList.length - 1) / 3);
        if (this.currPage < maxPage) {
            this.currPage++;
            localStorage.setItem('currPage', this.currPage);
            this.setRecipeCards();
        }
    }
}


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

window.onload = function() {
    const mainPage = new MainPage();

    // Get references to the "Prev" and "Next" buttons
    const prevButton = document.querySelector('button[type="button"][id="prev-button"]');
    const nextButton = document.querySelector('button[type="button"][id="next-button"]');

    // Add event listeners for the buttons
    prevButton.addEventListener('click', () => {
        mainPage.handlePrevButtonClick();
    });

    nextButton.addEventListener('click', () => {
        mainPage.handleNextButtonClick();
    });
}

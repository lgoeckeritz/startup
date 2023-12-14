export class Recipe {

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


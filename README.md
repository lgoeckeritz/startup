# Liz's Recipes

## Startup Deliverable

### Elevator pitch

What is the best thing to unite a family? Cooking up a good meal and sharing it with everyone. How can we unite a family spread across the country? Cooking up a good meal and sharing the recipe with everyone! My wife, Liz, is an amazing cook. She comes from a family of amazing cooks and she is constantly asking for recipes from various family members to compile into her own personal cookbook. Liz's Recipes makes it so easy for our family to upload our favorite recipes and have them instantly accessible to anyone in the family! Now there's no longer the risk of losing cherished recipes and everyone can share a meal with each other no matter how far away they are!

### Design

![mockMainPage](mockMainPage.png)
![mockSignIn](mockSignIn.png)


Here is a diagram that shows how people interact with the backend to see recipes.


![ServerDesign](ServerDesign.png)

### Key features

- Secure login using HTTPS
- Display of family recipes
- Ability to upload recipes
- Recipes are persistently stored
- Ability to add recipes to "favorites"
- Organization of recipes into categories
- Recipes are available for all users to see as soon as they are saved
- Ability to go back and edit or delete recipes

### Technologies

The required technologies will be implemented in the following ways.

- **HTML** - Will be implemented with the correct HTML structure for the website. Three HTML pages. One for login, one for viewing lists of recipes, and one for showing a recipe.
- **CSS** - Will be used to ensure that the website will look good on different screen sizes, and will utilize whitespace, color, and contrast to make it look good.
- **JavaScript** - Provides logic for login, display of recipes, and backend calls to retrieve and store data in the database.
- **Service** - Backend service that handles:
  - login
  - retrieving recipes
  - saving votes
- **DB** - Store users, authtokens, and recipes.
- **Login** - Register and login users. Credentials are stored privately in the database. Users are unable to login without propper credentials. 
- **WebSocket** - If new recipes are added to the website, all users will be able to see the new recipe in realtime.
- **React** - Application ported to use the React web framework.


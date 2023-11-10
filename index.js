const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetRecipes
apiRouter.get('/recipes', (_req, res) => {
  res.send(recipes);
});

// SubmitRecipe
apiRouter.post('/recipe', (req, res) => {
    recipes = updateRecipes(req.body, recipes);
  res.send(recipes);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateRecipes considers a new recipes for inclusion in the recipes.
// The recipes are saved in memory and disappear whenever the service is restarted.
let recipes = [];
function updateRecipes(newRecipe, recipes) {
  let found = false;
  //checking to make sure that this added recipe doesn't already exist
  for (const [i, prevRecipe] of recipes.entries()) {
    if (newRecipe == prevRecipe) {
      found = true;
      break;
    }
  }

  if (!found) {
    recipes.push(newRecipe);
  }

  return recipes;
}
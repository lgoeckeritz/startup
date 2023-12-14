import React, { useEffect } from 'react';
import { Recipe } from '../upload/recipe';
import { PopUps } from './popUps';
import { notifier } from './notifier';
import { Card } from './card';
import './recipes.css'
import { useNavigate } from 'react-router';

export function Recipes(props) {

    const userName = props.userName;
    let currPage = props.currPage;
    const [recipeList, setRecipeList] = React.useState(localStorage.getItem('recipeList') || []);
    const [displayMsg, setDisplay] = React.useState('none');
    const navigate = useNavigate();

    React.useEffect(() => {
        notifier.addHandler(setDisplay);
        loadRecipes();
    }, [])

    async function loadRecipes() {
        // getting the latest recipes from the service
        try {
            const response = await fetch('/api/recipes');
            setRecipeList(await response.json());
    
            // Save the recipes in case we go offline in the future
            localStorage.setItem('recipeList', JSON.stringify(recipeList));
        } catch {
            // If there was an arror then just use the last saved recipes
            // Retrieve the recipeList from localStorage
            setRecipeList(JSON.parse(localStorage.getItem('recipeList')));

        }
    }

    function recipeClick(title, index, recipe) {
        notifier.broadcastEvent(userName, title);
        localStorage.setItem('clickedCardIndex', index);
        props.onRecipeSelect(recipe);
        navigate('/recipePage');
    }

    //might not need this
    function createRecipe() {
        //may need a way to save whatever recipe is created to have it update correctly, idk
        navigate('/upload');
    }
    

    return (
        <>
            <header>
                {displayMsg != 'none' && (
                    <PopUps msg={displayMsg} onTimeOut={() => setDisplay('none')} />
                )}
                {/* TODO: see if this needs to be a function instead of a href */}
                <a>
                    <button onClick={() => navigate('/upload')} type="button">Add a Recipe</button>
                </a>
            </header>
            <main>
                <h1>Liz's Recipes</h1>
                <div className="recipe-row">
                    {(currPage * 3) + 0 < recipeList.length && (
                        <Card recipe={recipeList[(currPage * 3) + 0]} index={(currPage * 3) + 0} click={recipeClick} />
                    )}
                    {(currPage * 3) + 1 < recipeList.length && (
                        <Card recipe={recipeList[(currPage * 3) + 1]} index={(currPage * 3) + 1} click={recipeClick} />
                    )}
                    {(currPage * 3) + 2 < recipeList.length && (
                        <Card recipe={recipeList[(currPage * 3) + 2]} index={(currPage * 3) + 2} click={recipeClick} />
                    )}
                </div>
                <div className="botton-container">
                    {/* TODO: maybe have to add an onClick function or something */}
                    <button type="button" id="prev-button">
                        Prev
                    </button>
                    <button type="button" id="next-button">
                        Next
                    </button>
                </div>
            </main>
            <footer>
                <a href="https://github.com/lgoeckeritz/startup">Check me out on Github!</a>
            </footer>
        </>
    );
}
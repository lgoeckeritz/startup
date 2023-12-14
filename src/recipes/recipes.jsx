import React, { useEffect } from 'react';
import { Recipe } from './recipe';
//add in css

export function Recipes({userName, currPage}) {

  //todo: convert all this stuff from grabbing from local storage to pulling from stuff being passed in

  //const [userName, setUserName] = React.useState(userName);
  //const [currPage, setCurrPage] = React.useState(currPage);

  let recipeList = []
  let socket = null;

  useEffect(() => { // this should only run once the page has rendered
    loadRecipes();
    configureWebSocket();
  }, []);

  async function loadRecipes() {
      // getting the latest recipes from the service
      recipeList = [];
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
  
      setRecipeCards();
  }

  function setRecipeCards() {

    for (let i = 0; i < 3; i++) {
      let arrayIndex = currPage * 3 + i;

      const articleId = "article" + i;
      const article = document.getElementById(articleId);

      if (arrayIndex < recipeList.length) {

        article.hidden = false;

        const titleId = "title" + i;
        const authorId = "author" + i;
        const timeId = "time" + i;

        document.getElementById(titleId).textContent = recipeList[arrayIndex].title;
        document.getElementById(authorId).textContent = recipeList[arrayIndex].author;
        document.getElementById(timeId).textContent = recipeList[arrayIndex].cookTime;

        article.addEventListener('click', () => { 
          localStorage.setItem('clickedCardIndex', arrayIndex);
          //lets other users know when people are viewing recipes
          const title = recipeList[arrayIndex].title;
          broadcastEvent(userName, title);
        });

      } 
      else {
        // Hide the card using the article ID
        article.hidden = true;
      }
    }
  }

  // Function to handle "Prev" button click
  function handlePrevButtonClick() {
    if (this.currPage > 0) {
      this.currPage--;
      localStorage.setItem('currPage', currPage);
      this.setRecipeCards();
    }
  }

  // Function to handle "Next" button click
  function handleNextButtonClick() {
    const maxPage = Math.floor((recipeList.length - 1) / 3);
    if (currPage < maxPage) {
      currPage++;
      localStorage.setItem('currPage', currPage);
      setRecipeCards();
    }
  }

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (event) => { 
      const msg = JSON.parse(await event.data.text());
      displayMsg(msg.from, msg.value);
    };
  }

  function displayMsg(from, msg) { 
    const popupContainer = document.getElementById('popup-container');
    const popupContent = document.getElementById('popup-content');

    popupContent.innerHTML = `<p class="noMargin">${from} viewed ${msg}</p>`;
    popupContainer.style.display = 'block'

    setTimeout(() => {
      popupContainer.style.display = 'none';
    }, 5000); // 5000 milliseconds (5 seconds)
  }

  function broadcastEvent(from, value) { 
    const event = {
      from: from,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }


  return (
    <>
      <main>
        <h1>Liz's Recipes</h1>
        <div className="recipe-row">
          <article className="card card--1" id="article0">
            <div className="card__info-hover">
              <div className="card__clock-info">
                <svg className="card__clock" viewBox="0 0 24 24">
                  <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>
                <span className="card__time" id="time0">
                  15 min
                </span>
              </div>
            </div>
            <div className="card__img" />
            <a href="recipePage.html" className="card_link">
              <div className="card__img--hover" />
            </a>
            <div className="card__info">
              <span className="card__category"> Recipe</span>
              <h3 className="card__title" id="title0">
                My Favorite Fudge Brownies
              </h3>
              <span className="card__by">
                by{" "}
                <a className="card__author" title="author" id="author0">
                  Liz Goeckeritz
                </a>
              </span>
            </div>
          </article>
          <article className="card card--1" id="article1">
            <div className="card__info-hover">
              <div className="card__clock-info">
                <svg className="card__clock" viewBox="0 0 24 24">
                  <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>
                <span className="card__time" id="time1">
                  15 min
                </span>
              </div>
            </div>
            <div className="card__img" />
            <a href="recipePage.html" className="card_link">
              <div className="card__img--hover" />
            </a>
            <div className="card__info">
              <span className="card__category"> Recipe</span>
              <h3 className="card__title" id="title1">
                My Favorite Fudge Brownies
              </h3>
              <span className="card__by">
                by{" "}
                <a className="card__author" title="author" id="author1">
                  Liz Goeckeritz
                </a>
              </span>
            </div>
          </article>
          <article className="card card--1" id="article2">
            <div className="card__info-hover">
              <div className="card__clock-info">
                <svg className="card__clock" viewBox="0 0 24 24">
                  <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>
                <span className="card__time" id="time2">
                  15 min
                </span>
              </div>
            </div>
            <div className="card__img" />
            <a href="recipePage.html" className="card_link">
              <div className="card__img--hover" />
            </a>
            <div className="card__info">
              <span className="card__category"> Recipe</span>
              <h3 className="card__title" id="title2">
                My Favorite Fudge Brownies
              </h3>
              <span className="card__by">
                by{" "}
                <a className="card__author" title="author" id="author2">
                  Liz Goeckeritz
                </a>
              </span>
            </div>
          </article>
        </div>
        <div className="botton-container">
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
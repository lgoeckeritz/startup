import React from "react";
import './recipes.css'

export function Card(props) {

    const title = props.recipe.title;
    const author = props.recipe.author;
    const cookTime = props.recipe.cookTime;


    return (
        <article className="card card--1" onClick={() => props.click(title, props.index, props.recipe)}>
            <div className="card__info-hover">
                <div className="card__clock-info">
                <svg className="card__clock" viewBox="0 0 24 24">
                    <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>
                <span className="card__time">
                    {cookTime}
                </span>
                </div>
            </div>
            <div className="card__img" />
            <a className="card_link">
                <div className="card__img--hover" />
            </a>
            <div className="card__info">
                <span className="card__category"> Recipe</span>
                <h3 className="card__title" id="title1">
                    {title}
                </h3>
                <span className="card__by">
                    by{" "}
                <a className="card__author" title="author">
                    {author}
                </a>
                </span>
            </div>
        </article>
    );
}
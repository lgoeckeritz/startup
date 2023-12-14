import React, { useEffect } from 'react';
import './recipes.css'

export function PopUps(props) {

    //if this freezes the page instead of running asyncronously, this won't work
    useEffect(() => {
        setTimeout(() => {
            props.onTimeOut();
        }, 5000); // 5000 milliseconds (5 seconds)
    }, []);

    return (
        <div id="popup-container">
                <div id="popup-content">
                <p className="noMargin">{props.msg}</p>
                </div>
        </div>
    )
}
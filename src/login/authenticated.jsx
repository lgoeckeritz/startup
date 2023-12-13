import React from 'react';
import './login.css'
import { useNavigate } from 'react-router';

export function Authenticated(props) {

    const navigate = useNavigate();
      
    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        }).finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
        });
    }

    return (
        <form className="form" id="continue-form">
            <div className="continueControls">
                <div id="userName">{props.userName}</div>
                <button id="continueButton" style={{ marginBottom: "1em" }} type="reset" className="btn btn-primary" onClick={() => navigate('/recipies')}>Continue</button>
                <button id="logoutButton" type="reset" className="btn btn-secondary" onClick={() => logout()}>Logout</button>
            </div>
        </form>
    );
}
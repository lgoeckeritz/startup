import React from 'react';
import './login.css'
import { useNavigate } from 'react-router';

export function Unauthenticated(props) {

    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isRegisterVisible, setIsRegisterVisible] = React.useState(false);

    const navigate = useNavigate();

    async function login() {
        const response = await fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({username: userName, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response.ok) {
            localStorage.setItem("userName", userName);
            props.onLogin(userName);
            navigate('/recipes');
        } else {
            const body = await response.json();
            alert(`⚠ Error: ${body.msg}`);
        }
    }
      
    async function register() {
        if (userName == "" || password == "" || email == "") {
            alert(`⚠ Error: One or multiple fields are empty`);
            return;
        }
      
        const response = await fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({username: userName, email: email, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
       });
        if (response.ok) {
            localStorage.setItem("userName", userName);
            props.onLogin(userName);
            navigate('/recipes');
        } else {
            const body = await response.json();
            alert(`⚠ Error: ${body.msg}`);
        }
    }
      
    // function myAnimate() {
    //     $('#register').animate({ height: "toggle", opacity: "toggle" }, "slow");
    //     $('#login').animate({ height: "toggle", opacity: "toggle" }, "slow");
    // }

    function toggleRegister(toggle) {
        setIsRegisterVisible(toggle);
    }

    return (
        <div id="login/register" className="form">
            {isRegisterVisible == true && (
                <form className="register-form" id="register">
                    <input type="text" id="reg_name" placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
                    <input type="password" id="reg_password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    <input type="text" id="reg_email" placeholder="email address" onChange={(e) => setEmail(e.target.value)}/>
                    <button className="btn btn-primary" type="reset" onClick={() => register()}>
                        create
                    </button>
                    <p className="message">Already registered? {' '}
                        <a onClick={() => toggleRegister(false)}>
                            Sign In
                        </a>
                    </p>
                </form>
            )}
            {isRegisterVisible == false && (
                <form className="login-form" id="login">
                    <input type="text" id="name" placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
                    <input type="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="btn btn-primary" type="reset" onClick={() => login()}>
                        login
                    </button>
                    <p className="message">
                        Not registered? {' '}
                        <a onClick={() => toggleRegister(true)}>
                            Create an account
                        </a>
                    </p>
            </form>
            )}
        </div>
    );
}
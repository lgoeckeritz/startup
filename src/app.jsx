import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { RecipePage } from './recipePage/recipePage';
import { Recipes } from './recipes/mainPage';
import { Upload } from './upload/upload';
import { AuthState } from './login/authState';

//todo: somethings wrong with logging in

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [currPage, setCurrPage] = React.useState(localStorage.getItem('currPage') ? parseInt(localStorage.getItem('currPage')) : 0);
    const [currRecipe, setRecipe] = React.useState('null');

    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/' 
                    element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                                setAuthState(authState);
                                setUserName(userName);
                            }}
                        />
                    }
                    exact
                />
                <Route 
                    path='/recipes' 
                    element={
                        <Recipes
                            userName={userName}
                            currPage={currPage} 
                            onRecipeSelect={(recipe) => {
                                setRecipe(recipe);
                            }}
                        />
                    } 
                />
                <Route path='/recipePage' element={<RecipePage recipe={currRecipe}/>} />
                <Route path='/upload' element={<Upload author={userName}/>} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
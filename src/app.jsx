import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { recipePage } from './recipePage/recipePage';
import { Recipes } from './recipes/mainPage';
import { Upload } from './upload/upload';
import { AuthState } from './login/authState';

//todo: somethings wrong with logging in

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [currPage, setCurrPage] = React.useState(localStorage.getItem('currPage') ? parseInt(localStorage.getItem('currPage')) : 0); //not positive this will work

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
                        />
                    } 
                />
                <Route path='/recipePage' element={<recipePage />} />
                <Route path='/upload' element={<Upload />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
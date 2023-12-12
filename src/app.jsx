import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { recipePage } from './recipePage/recipePage';
import { Recipes } from './recipes/recipes';
import { Upload } from './upload/upload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className='body bg-dark text-light'><!-- sub-elements here --></div>
  </BrowserRouter>
);
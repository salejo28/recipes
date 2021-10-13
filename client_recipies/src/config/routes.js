import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { Register } from '../pages/Register/Register';
import { Recipes } from '../pages/Recipes/Recipes';
import { MyRecipes } from '../pages/MyRecipes/MyRecipes';

export const routes = [
  {
    path: '/',
    component: Home,
    isPrivate: false,
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/register',
    component: Register,
    isPrivate: false,
  },
  {
    path: '/recipes',
    component: Recipes,
    isPrivate: false,
  },
  {
    path: '/myRecipes',
    component: MyRecipes,
    isPrivate: true,
  },
];

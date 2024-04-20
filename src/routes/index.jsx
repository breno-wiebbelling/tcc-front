import React  from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RequireAuth } from '../components/auth';

import Home from '../pages/home';
import Simulation from "../pages/simulation/index"
import LoginPage from "../pages/user/login/index";
import CreationPage from "../pages/user/creation/index";
import UserProfile from '../pages/user/profile/index';
import NotFoundPage from "../pages/notFound/index";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path="/var"        element={ <VariablePage/> } /> */}
          <Route path="/"                           element={ <RequireAuth> <Home/>        </RequireAuth> }/>
          <Route path="/perfil"                     element={ <RequireAuth> <UserProfile/> </RequireAuth> }/>
          <Route path="/simulation/:simulationId"   element={ <RequireAuth> <Simulation/>  </RequireAuth> }/>
          
          <Route path="/login"      element={ <LoginPage/>    } />
          <Route path="/logout"     element={ <LoginPage/>    } />
          <Route path="/registro"   element={ <CreationPage/> } />
          <Route path="*"           element={ <NotFoundPage/> } />
      </Routes>
    </BrowserRouter>
  )
}


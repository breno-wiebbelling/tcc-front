import React  from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RequireAuth } from '../components/auth';

import { Home } from '../pages/home';
import { VariablePage} from "../pages/variavel/index";
import { Simulation } from "../pages/simulation/index"

import { LoginPage }   from "../pages/user/login/index";
import { CreationPage }   from "../pages/user/creation/index";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/var"        element={ <VariablePage/> } />

          <Route path="/"           element={ <RequireAuth> <Home/> </RequireAuth>} />
          {/* TODO: add require auth */}
          {/* <Route path="/"           element={ <Home/>} /> */}
          <Route path="/login"                        element={ <LoginPage/>    } />
          <Route path="/logout"                       element={ <LoginPage/>    } />
          <Route path="/registro"                     element={ <CreationPage/> } />
          <Route path="/simulation/:simulationId"     element={ <Simulation/>   } />
      </Routes>
    </BrowserRouter>
  )
}


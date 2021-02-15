import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import LoadingSpinner from './shared/UIElements/LoadingSpinner';
import LandingPage from './main/page/LandingPage';
import Footer from './shared/footer/Footer';

import logo from './logo.svg';
import './App.scss';
import Navbar from './shared/navigation/Navbar';
import OpenDrawer from './shared/navigation/OpenDrawer';
import Menu from './menu/page/Menu';
import Admin from './admin/pages/Admin';
import EditMenu from './admin/pages/EditMenu';

function App() {
  let routes;

  routes = (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Navbar />
          <OpenDrawer />
          <LandingPage />
        </Route>
        <Route path='/menu' exact>
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <Menu />
        </Route>
        <Route path='/admin' exact>
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <Admin />
        </Route>
        <Route path='/admin/menu' exact>
          <Navbar className='navigation--scrolled' />
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <EditMenu />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  )

  return (
    <main><div className='center'>{routes}</div></main>
  );
}


export default App;


import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import LoadingSpinner from './shared/UIElements/LoadingSpinner';
import LandingPage from './main/page/LandingPage';

import logo from './logo.svg';
import './App.scss';
import Navbar from './shared/navigation/Navbar';
import OpenDrawer from './shared/navigation/OpenDrawer';
import Menu from './menu/page/Menu';
import Admin from './admin/pages/Admin';
import EditMenu from './admin/pages/EditMenu';
import { useMenu } from './shared/hooks/menu-hook';
import { MenuContext } from './shared/context/menu-context';
import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';
import { ExpiryContext } from './shared/context/expiry-context';
import { useExpiry } from './shared/hooks/expiry-hook';
import { useHttpClient } from './shared/hooks/http-hook';


function App() {
  const {
    storyExpiry,
    testimonialExpiry,
    openingExpiry,
    menuExpiry,
    updateExpiry
  } = useExpiry();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    //we grab the current expiry times to use down below...
    const storedExpiry = JSON.parse(localStorage.getItem('expiry')) || { menu: 0, opening: 0, testimonial: 0, story: 0 };
    (async () => {
      try {
        /*  we fetch the expiry dates and pass them to the updateExpiry function to compare
        it with the one in the local storage and create context data which can be used to 
        fetch fresher data if needed */
        const responseData = await sendRequest(process.env.REACT_APP_EXPIRY)
        updateExpiry(responseData.expiries, storedExpiry)
        localStorage.setItem('expiry', JSON.stringify(responseData.expiries))
      } catch (err) {

      }
    })()


  }, [])

  const { menu, saveMenu, types, removeItem, addMenuItem } = useMenu();
  const { signin, signout, token, userId } = useAuth();
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
    <ExpiryContext.Provider
      value={{
        menuExpiry: menuExpiry,
        testimonialExpiry: testimonialExpiry,
        openingExpiry: openingExpiry,
        storyExpiry: storyExpiry,
        updateExpiry: updateExpiry
      }}>
      <AuthContext.Provider
        value={{
          userId: userId,
          token: token,
          isLoggedIn: !!token,
          signin: signin,
          signout: signout
        }}
      >
        <MenuContext.Provider
          value={{
            menu: menu,
            types: types,
            saveMenu: saveMenu,
            addMenuItem: addMenuItem,
            removeItem: removeItem
          }}
        >
          <main><div className='center'>{routes}</div></main>
        </MenuContext.Provider>
      </AuthContext.Provider>
    </ExpiryContext.Provider>

  );
}


export default App;


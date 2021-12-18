import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import LandingPage from './main/page/LandingPage';
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
import { OrderContext } from './shared/context/order-context';
import { useExpiry } from './shared/hooks/expiry-hook';
import { useOrder } from './shared/hooks/order-hook';
import { useHttpClient } from './shared/hooks/http-hook';
import { Order } from './order/pages/Order';
import { Checkout } from './order/pages/Checkout';
import { Orders } from './admin/pages/Orders';
import { OrderDetailsPage } from './admin/pages/OrderDetailsPage';


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

      } catch (err) {

      }
    })()
  }, [])

  const { menu, saveMenu, types, orderableList, removeItem, addMenuItem, setOrderable } = useMenu();
  const {
    signin,
    signout,
    token,
    userId,
    drawer,
    isAdminValidated,
    getIsAdminValidated,
    disableDrawer,
    enableDrawer,
  } = useAuth();

  const { add, remove, addedItems, totalPrice, clearOrder } = useOrder();



  const routes = (
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
        <Route path='/order' exact>
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <Order />
        </Route>
        <Route path='/checkout' exact>
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <Checkout />
        </Route>
        <Route path='/admin' exact>
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <Admin />
        </Route>
        <Route path='/orders' exact>
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <Orders />
        </Route>
        <Route path='/order-details/:id' exact>
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <OrderDetailsPage />
        </Route>
        <Route path='/admin/menu' exact>
          <Navbar className='navigation--scrolled' />
          <OpenDrawer />
          <EditMenu />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  )

  return (
    <OrderContext.Provider
      value={{
        addedItems: addedItems,
        totalPrice: totalPrice,
        add: add,
        remove: remove,
        clearOrder: clearOrder,
      }}
    >
      <ExpiryContext.Provider
        value={{
          menuExpiry: menuExpiry,
          testimonialExpiry: testimonialExpiry,
          openingExpiry: openingExpiry,
          storyExpiry: storyExpiry,
          updateExpiry: updateExpiry
        }}
      >
        <AuthContext.Provider
          value={{
            userId: userId,
            token: token,
            drawer: drawer,
            isLoggedIn: !!token,
            isAdminValidated: isAdminValidated,
            getIsAdminValidated: getIsAdminValidated,
            signin: signin,
            signout: signout,
            enableDrawer: enableDrawer,
            disableDrawer: disableDrawer
          }}
        >
          <MenuContext.Provider
            value={{
              menu: menu,
              types: types,
              orderableList: orderableList,
              saveMenu: saveMenu,
              addMenuItem: addMenuItem,
              removeItem: removeItem,
              setOrderable: setOrderable,
            }}
          >
            <main><div className=''>{routes}</div></main>
          </MenuContext.Provider>
        </AuthContext.Provider>
      </ExpiryContext.Provider>
    </OrderContext.Provider>
  );
}


export default App;


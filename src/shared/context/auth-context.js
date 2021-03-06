
import { createContext } from 'react';


export const AuthContext = createContext({
  userId: null,
  token: null,
  drawer: false,
  isLoggedIn: false,
  signin: () => { },
  signout: () => { },
  disableDrawer: () => { },
  enableDrawer: () => { }
});

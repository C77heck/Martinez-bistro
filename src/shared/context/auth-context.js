
import { createContext } from 'react';


export const AuthContext = createContext({
  userId: null,
  token: null,
  drawer: false,
  isLoggedIn: false,
  isAdminValidated: true,
  signin: () => { },
  signout: () => { },
  disableDrawer: () => { },
  enableDrawer: () => { }
});

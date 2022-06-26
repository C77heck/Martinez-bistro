
import { createContext } from 'react';


export const AuthContext = createContext({
  userId: null,
  token: null,
  drawer: false,
  isLoggedIn: false,
  sessionId: false,
  setUpAnalytics: () => { },
  signin: () => { },
  signout: () => { },
  disableDrawer: () => { },
  enableDrawer: () => { }
});

import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import UserStore from './store/UserStore';




export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore()}
  }>
        <React.StrictMode>
    <App />
    </React.StrictMode>
  </Context.Provider>,

  document.getElementById('root')
);



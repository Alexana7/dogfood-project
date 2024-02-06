import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app';
import { Provider } from 'react-redux';
import store, { persistor } from './storage/store';
import { PersistGate } from 'redux-persist/integration/react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
    </PersistGate> 
  </Provider>   
   );


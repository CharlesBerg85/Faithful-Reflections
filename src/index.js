import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
  <StoreProvider store={store}>
  <Router>
    <App />
  </Router>
  </StoreProvider>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Providers from './providers';
import './styles/index.scss';
import '@rainbow-me/rainbowkit/styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <TransactionProvider>
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>,
  // </TransactionProvider>,
);

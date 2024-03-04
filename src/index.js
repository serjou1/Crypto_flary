import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TransactionProvider } from './context/TransacionContext';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TransactionProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TransactionProvider>,
);

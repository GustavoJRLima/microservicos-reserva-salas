import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Reserva from './routes/Reserva';
import Sala from './routes/Sala';
import Usuario from './routes/Usuario';
import App from './routes/App';
import Home from './routes/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
  element: <App />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/reserva',
      element: <Reserva />
    },
    {
      path: '/sala',
      element: <Sala />
    },
    {
      path: '/usuario',
      element: <Usuario />
    },
  ]
}]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
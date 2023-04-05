import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import './index.css';
import GlobalProvider from './contexts/GlobalContextProvider';
import Cookies from './components/Popup/Cookies';
import styled from '@emotion/styled';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
      <Routes />
      <Cookies />
  </GlobalProvider>
);
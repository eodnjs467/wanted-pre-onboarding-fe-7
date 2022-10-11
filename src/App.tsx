import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RootRouter from './router/RootRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </>
  );
}

export default App;

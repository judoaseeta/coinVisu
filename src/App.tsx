import React from 'react';
import { Route } from 'react-router-dom'
import styles from './App.module.scss';
import AuthForm from './pages/authForm';
import Nav from './pages/nav';
import Main from './pages/main';
import Currency from './pages/currency/currency';
import Search from './pages/search';
import TopBar from './pages/topBar';

import Footer from './components/footer';
function App() {

  return (
    <div
      className={styles.container}
    >
      <TopBar />
      <Route 
        path="*"
        component={Nav}
      />
      <Route 
        path="*"
        component={AuthForm}
      />
      <Route 
        path="/"
        exact
        component={Main}
      />
      <Route 
        path="/currency/:symbol"
        component={Currency}
      />
      <Route 
        path="/search"
        component={Search}
      />
      <Footer />
    </div>
  );
}

export default App;

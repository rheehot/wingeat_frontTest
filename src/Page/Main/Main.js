import React, { useEffect } from 'react';

import Header from 'Components/Header';
import Feature from './Components/Feature';
import List from './Components/List';

import './Main.scss';

const Main = () => {
  useEffect(() => {
    if (!localStorage.getItem('items')) {
      localStorage.setItem('items', '[]');
    }
  }, []);
  return (
    <>
      <Header />
      <div className="body_wrapper">
        <Feature />
        <List />
      </div>
    </>
  );
};
export default Main;

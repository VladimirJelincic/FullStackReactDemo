import React from 'react';
import Header from './components/header/Header';
export default ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

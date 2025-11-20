import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
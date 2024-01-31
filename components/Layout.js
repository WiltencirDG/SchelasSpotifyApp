// components/Layout.js

import React from 'react';
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className="bg-purple text-white min-h-screen flex flex-col">
      {/* Global Header with logo */}
      <Header />
      {/* Content */}
      <div className="bg-purple rounded-lg p-6 w-full flex flex-col items-center justify-center">{children}</div>
    </div>
  );
};

export default Layout;

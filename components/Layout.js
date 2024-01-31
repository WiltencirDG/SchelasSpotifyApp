// components/Layout.js

import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      {/* Global Header with logo */}
      <header className="bg-white p-4 text-center mb-8">
        <img src="/logo.png" alt="Schelas for Spotify" className="max-w-40 mx-auto" />
      </header>
      {/* Content */}
      <div className="bg-black rounded-lg p-6 w-full max-w-md">{children}</div>
    </div>
  );
};

export default Layout;

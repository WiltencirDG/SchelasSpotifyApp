// components/Layout.js
import Header from './Header';
const Layout = ({ children }) => {
  return (
    <div className="bg-primary h-full min-h-screen">
      {/* Global Header with logo */}
      <Header />
      {/* Content */}
      <div className="rounded-lg p-6 w-full flex flex-col items-center justify-center">{children}</div>
    </div>
  );
};

export default Layout;

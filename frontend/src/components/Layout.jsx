import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';


const Layout = ({ children, pageTitle, breadcrumbs }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Header pageTitle={pageTitle} breadcrumbs={breadcrumbs} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
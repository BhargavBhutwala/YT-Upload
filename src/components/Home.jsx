// import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../helper/AuthContext';
import Navbar from './Navbar';

function Home() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
}

export default Home;

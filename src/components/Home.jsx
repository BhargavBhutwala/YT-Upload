// import React from 'react'
import { Outlet } from 'react-router';
import Navbar from './Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
}

export default Home;

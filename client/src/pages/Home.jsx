import React , {useState} from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function Home() {
  return (
    <div className='bg-slate-800'>
      <Navbar />
      <h1>Home</h1>
      <Footer/>
    </div>
  );
}

export default Home
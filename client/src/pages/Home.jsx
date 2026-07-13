import React , {useState} from 'react'
import Navbar from '../components/layout/Navbar'

function Home() {
  return (
    <div className='bg-slate-800'>
      <Navbar />
      <h1>Home</h1>
    </div>
  );
}

export default Home
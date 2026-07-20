import React , {useState} from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function Home() {
  return (
    <div className='bg-slate-950 text-white min-h-screen flex flex-col'>
      <Navbar 
        showSync={false}
      />
      <section className='flex flex-col gap-2 justify-center items-center'>
        <div className='text-xs rounded-xl px-2 py-1 bg-blue-600 max-w-fit justify-center items-center space-y-2'>For Dedicated Developers</div>

        <h2 className='text-2xl md:text-4xl lg:text-5xl'>Understand Any Developer </h2>
        <h3 className='text-indigo-500 text-lg md:text-2xl lg:text-4xl'>At Glance</h3>


      </section>
      <Footer/>
    </div> 
  );
}     

export default Home
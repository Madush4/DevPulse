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
        <div className='text-xs rounded-xl px-2 py-1 bg-blue-600 max-w-fit justify-center items-center'>For Dedicated Developers</div>
      </section>
      <Footer/>
    </div> 
  );
}     

export default Home
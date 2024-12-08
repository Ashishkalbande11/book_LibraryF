import React from 'react'
import Hero from '../components/home/Hero.jsx'
import RecentlyAdded from '../components/home/RecentlyAdded.jsx'

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8 flex flex-col'>
      <Hero />
      <RecentlyAdded />
    </div>
  )
}

export default Home
import React from 'react'

const Hero = () => {
  return (
    <div className='h-[75vh] flex flex-col lg:flex-row'>
        <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
            <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>Discover Your Next Great Read</h1>
            <p className='mt-4 text-xl text-zinc-300 lg:text-left text-center'>
                Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
            </p>
            <div className='mt-8'>
                <button className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
                    Discover book
                </button>
            </div>
        </div>
        <div className='w-ful lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center m-auto'>
            <img className='h-[200px] md:h-[300px] lg:h-[500px] rounded-lg' src="https://imgs.search.brave.com/5594DIIofqYB3w_66DSRbuop_8SHFgpS3WQeMOaA0so/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE1/ODQxMzU5Ny9waG90/by9jb21wb3NpdGlv/bi13aXRoLWJvb2tz/LW9uLXRoZS10YWJs/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9b0xUQnd0SnVp/V1FUdjZOUFlPYzNp/RTNiaVZscDhMSTdP/NkhYMXA3V2xLcz0" alt="image" />
        </div>
    </div>
  )
}

export default Hero
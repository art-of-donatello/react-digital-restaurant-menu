import Head from 'next/head'
import Img from 'next/image'
import React from 'react';

export default function Home() {
 



  console.log('adasdasd');
  return (
    <div className="relative items-center self-center ">
   
        <div className="flex flex-col items-center justify-center   pt-10">
          <a href="/yiyecekler"><img className=' w-2/3 mx-5 ' src="https://cdn.getiryemek.com/restaurants/1618309789015_1125x522.jpeg"  /></a>
          </div>

          <div className="flex flex-col items-center  pt-10">
          <a href="/icecekler"><img className='w-2/3 mx-5' src="https://cdn.getiryemek.com/restaurants/1618309789015_1125x522.jpeg"  /></a>
          </div>
  </div>
  )
} 
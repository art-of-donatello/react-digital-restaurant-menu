import Head from 'next/head'
import Img from 'next/image'
import React from 'react';
import Link from 'next/link';
export default function Home() {
 



  console.log('adasdasd');
  return (
    <div className="relative items-center self-center ">
   
        <div className="flex flex-col items-center justify-center   pt-10">
          <Link href="/yiyecekler"><img className=' w-2/3 mx-5 ' src="https://cdn.getiryemek.com/restaurants/1618309789015_1125x522.jpeg"  /></Link>
          </div>

          <div className="flex flex-col items-center  pt-10">
          <Link href="/icecekler"><img className='w-2/3 mx-5' src="https://cdn.getiryemek.com/restaurants/1618309789015_1125x522.jpeg"  /></Link>
          </div>
  </div>
  )
} 
import Head from 'next/head'
import Img from 'next/image'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";

export default function Home({menu,url}) {
 const createUrl=(item)=>{
    const myArray = item.id.split("-");

    return "/"+item.text+myArray[0]
  
    
 }
 function Previous() {
    window.history.back()
}

  return (
    
    <div className="container flex flex-col">
        <button onClick={()=>Previous()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
    <div className="relative items-center self-center max-w-2xl ">
    {menu.length>0?menu.map((e,index)=>e.children?.length>0?(
     <Animate  key={index} play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div  className="flex flex-col items-center justify-center   pt-10 relative">
          <Link href={url+createUrl(e)} className='flex' ><div>
            <img    className=' self-center items-center w-auto  ' src={e.image}  />
          <p  className="absolute bg-red-500 text-5xl text-white top-3/4 left-3/2  translate-y-3/4 ">{e.text} 
          {e.description} </p>
          </div>
           </Link>
          </div></Animate>):(<Animate  key={index} play start={{ opacity: 0 }} end={{ opacity: 1 }}>
                 <div  className="flex flex-col justify-center   pt-10 relative">
             
                    <img layout='fill'   className=' self-center items-center w-auto  ' src={e.image} />
                 <p  className="absolute bg-red-500 text-5xl text-white top-3/4 left-3/2  translate-y-3/4 ">{e.text} 
                 {e.description} </p>
                 <p  className="absolute bg-red-500 text-5xl text-white top-3/4 left-3/2  translate-y-3/4 ">{e.price} 
                 {e.price} </p>
                  </div>
                  </Animate>
          )
):null}
  </div>
  </div>

  )
} 
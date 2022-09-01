import Head from 'next/head'
import Img from 'next/image'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ChevronsLeft} from 'react-feather';

import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";

export default function Home({menu,url,parent}) {
 const createUrl=(item)=>{
    const myArray = item.id.split("-");

    return "/"+item.text+myArray[0]
  
    
 }
 function Previous() {
    window.history.back()
}

const data= url.reduce((a,b)=>"/"+a+"/"+b);
  return (
    
    <div className="container flex flex-col bg-gradient-to-b from-black to-slate-600 max-w-full min-h-screen">
        <div className="sticky top-[-5px] z-50 h-12 w-full flex flex-row text-center  bg-gray-800 items-center self-center">
        <div className=' self-center w-1/3'>
           
            </div>
            <div className=' self-center w-1/3'>
            {parent} 
            </div>
            <div className='w-1/3'>
        <button onClick={()=>Previous()} className=" bg-[#333]  hover:bg-blue-700 text-white self-end font-bold py-2 pt-2 px-4 rounded"><ChevronsLeft className="inline-block" size={20} />Back 
 
       
 
        </button>
        </div>
        </div>

        
    <div className="relative items-center self-center ">
        
 
    {menu.length>0?menu.map((e,index)=>e.children?.length>0?(
     <Animate  key={index} play start={{ opacity: 0 }} end={{ opacity: 1 }}>
         <div className="pt-5 px-5 w-full">
        <div  className="flex flex-col items-center justify-center  relative rounded-xl max-w-md">
          <Link href={data+createUrl(e)} className='flex' ><div >
            <img    className=' min-w-[350px]  min-h-[200px] self-center items-center w-auto  rounded-xl' src={e.image}  />
            <div className=' text-base font-bold bg-opacity-25 rounded-xl bg-gradient-to-t items-center justify-center text-center flex from-black w-full  absolute h-1/4  text-white bottom-[30px] xm:bottom-[42px] left-3/2  translate-y-3/4 '>
                {e.text} 
          </div>
          </div>
           </Link>
          </div></div></Animate>):(<Animate  key={index} play start={{ opacity: 0 }} end={{ opacity: 1 }}>
            <div className="py-5 px-5 my-3 rounded-xl  min-h-[45px] w-full min-w-[350px] flex flex-row bg-[#333] ">
                

                   
                <div className=' text-base   bg-opacity-25 flex flex-col w-1/2   text-white  '>
                <p className=' font-bold'>{e.text} </p> 
                <p className=' text-bold'> {e.description}</p> 
                 </div>
                
                <div className=' text-base   font-bold rounded-xl  w-1/2 bg-opacity-25   flex-col flex  justify-start items-end text-white  '>
                 {e.price}
                </div>
                 
               
                  </div>
                  </Animate>
          )
):null}
  </div>
  <br/>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
  </div>

  )
} 
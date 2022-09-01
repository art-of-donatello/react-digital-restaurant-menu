import React, { Component,useState,Fragment, useEffect } from 'react';
import Cart from '../Cart';

//import { toggleHandle,OpenMenu,CloseMenu } from 'components/Shopping/Helpers/helpers';
import Menu from 'components/Shopping/Menu';
import Link from 'next/link';

export function Header() {
/*
  useEffect(() => {

    toggleHandle();
    
  },[])
*/

    const [isOpen, setIsOpen] = useState(false); 

 
    return (
       
        <div className=" sticky top-0 z-10 bg-transparent   border-gray-500 ">
             <Cart isOpen={isOpen} setIsOpen={setIsOpen}/>

        <div  className="     flex items-center  bg-white border-gray-500  border-b-2   md:h-20 sm:h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
       
          <div className="flex items-center justify-start">
            <button type="button" className="p-2 sm:mr-4 lg:hidden">

            </button>
            <a  className="flex">
            <img src="/test/logo.jpg" className='md:h-24 sm:h-16 xs:h-16 ' alt="logo"  />
            </a>

       

        
          </div>
        
       
          <div className="flex items-center justify-center flex-1 font-medium md:mx-auto md:pl-20 ">
            <nav className="hidden lg:uppercase lg:text-gray-500 lg:tracking-wide lg:font-bold lg:text-xs lg:space-x-4 lg:flex">
            <Menu/>
            </nav>
     
          </div>
          <div className="flex items-center justify-end font-medium">
              <div className="flex items-center border-gray-100 divide-x divide-gray-100 border-x">
                <span>
                  <Link onClick={()=>setIsOpen(!isOpen)} className="block p-6 border-b-4 border-transparent hover:border-red-700">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="sr-only">Cart</span>
                  </Link>
                </span>
                <span>
                  <Link href="/account" className="block p-6 border-b-4 border-transparent hover:border-red-700">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="sr-only"> Account </span>
                  </Link>
                </span>
                <span className="hidden sm:block">
                  <Link href="/search" className="block p-6 border-b-4 border-transparent hover:border-red-700">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="sr-only"> Search </span>
                  </Link>
                </span>
              </div>
            </div>
        </div>
        </div>
        
     
      
  
    )
  }


export default Header
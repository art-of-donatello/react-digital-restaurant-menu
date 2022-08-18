import React, { useEffect } from 'react'
import {OpenMenu,CloseMenu,toggleHandle} from 'components/Shopping/Helpers/helpers'
import { useState } from 'react'

function Menu() {

    useEffect(()=>{


        toggleHandle()

    },[])
  return (
    <div class="flex  items-center justify-center flex-1 content-between">
         <div className='self-center mx-4'> 
        <div className='dropdown self-center text-sm '>
                      <button className="block py-2 hasSubMenu">Company & <span class="inline-block"></span> </button>
                          <ul className="bg-white text-sm subMenu dropdown-menu absolute hidden">
                            <li><a href="#" class="block py-2 ml-3">About Us</a></li>
                            <li><a href="#" class="block py-2 ml-3">Investor Relations </a></li>
                            <li><a href="#" class="block py-2 ml-3">Careers </a></li>
                          </ul>
                    </div>
                    </div>
                   
         
                    <div className='self-center mx-4'>       
                    <div className='dropdown self-center text-sm '>
                      <button className="block py-2 hasSubMenu">Company & <span class="inline-block"></span> </button>
                          <ul className="bg-white subMenu dropdown-menu absolute hidden">
                            <li><a href="#" class="block py-2 ml-3">About Us</a></li>
                            <li><a href="#" class="block py-2 ml-3">Investor Relations </a></li>
                            <li><a href="#" class="block py-2 ml-3">Careers </a></li>
                          </ul>
                    </div>
                    </div>
                    

                    <div className='self-center mx-4'>       
                    <div className='dropdown self-center text-sm '>
                      <button className="block py-2 hasSubMenu">Company & <span class="inline-block"></span> </button>
                          <ul className="bg-white subMenu dropdown-menu absolute hidden">
                            <li><a href="#" class="block py-2 ml-3">About Us</a></li>
                            <li><a href="#" class="block py-2 ml-3">Investor Relations </a></li>
                            <li><a href="#" class="block py-2 ml-3">Careers </a></li>
                          </ul>
                    </div>
                    </div>


                    <div className='self-center mx-4'>       
                    <div className='dropdown self-center text-sm '>
                      <button className="block py-2 hasSubMenu">Company & <span class="inline-block"></span> </button>
                          <ul className="bg-white subMenu dropdown-menu absolute hidden">
                            <li><a href="#" class="block py-2 ml-3">About Us</a></li>
                            <li><a href="#" class="block py-2 ml-3">Investor Relations </a></li>
                            <li><a href="#" class="block py-2 ml-3">Careers </a></li>
                          </ul>
                    </div>
                    </div>


    </div>
  )
}

export default Menu
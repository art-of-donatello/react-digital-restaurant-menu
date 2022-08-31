import React,{useEffect} from "react";
import { getSession, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import {auth, login} from 'redux/UserSlicer'
// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { fetchRestaurants } from 'redux/dataSlicer'

export default function Admin({ children }) {

  

const session =  useSession();
const dispatch = useDispatch();

if(session.status=="authenticated"){
  /*** Check user is authenticated or not*/
 const userData = {name:null, email:session?.user?.email, adres:null,csrfToken:""} 

 dispatch(login({email:session?.data?.user?.email,role:"asdasd@asdasd.com",user:session?.data?.user?.email}))

 dispatch(fetchRestaurants(session?.data?.user)).then("")
    

return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );


}else if(session.status=="unauthenticated"){
  signIn()
}
}

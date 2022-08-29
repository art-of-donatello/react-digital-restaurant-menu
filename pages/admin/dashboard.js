import React, { useEffect } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import Modal from "components/Cards/CardNewRest";
import Restaurant from "components/Cards/CardRestaurantsModal";
import { signIn, useSession } from "next-auth/react";
import CardCreateMenu from "components/Cards/CardCreateMenu";
import {useSelector,useDispatch} from "react-redux";
import {auth, login} from 'redux/UserSlicer'
import Admin from "layouts/Admin.js";


export default function Dashboard() {



  return (
    <>
  
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">

          
       
        </div>
        <div className="w-full px-4">
        <Modal  />
        <Restaurant />
       
        <CardCreateMenu />
       
        </div>
      </div>
      
    </>
  );

}
Dashboard.layout = Admin;

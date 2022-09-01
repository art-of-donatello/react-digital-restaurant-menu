import React, { useEffect,useLayoutEffect } from "react";
import axios from "axios";
import {getSession, useSession } from "next-auth/react";
import {useSelector,useDispatch} from "react-redux";
import { fetchRestaurants } from 'redux/dataSlicer'
import { updateMenu } from "components/system/firebaseActions";
import CardCreateMenu from "./Menu/CardCreateMenu";
import Link from "next/link";

export default function CardRestaurantsModal() {
  const dispatch = useDispatch();
  const session = useSession();
  const user = useSelector(state => state.user);
  const restaurant =useSelector(state=>state.data.restaurant);
 
  const [showModal, setShowModal] = React.useState(0);
  const [dataa,setData] = React.useState({name:null, email:user.email, adres:null,csrfToken:""});
  //const [restaurant,setRestaurant] = React.useState([]);

 
  



  return (
        <>
        {showModal?<CardCreateMenu  showModal={showModal} setShowModal={setShowModal}  />:null}
        <button onClick={()=>setShowModal(!showModal)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">asdasdasd</button>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Restaurant List
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Menus
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Restaurant Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Restaurant adress
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Restaurant Phone
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                 
                  {restaurant.length>0?restaurant.map((restaurant,index)=>
                  (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {restaurant.name}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                     Denizli
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      5394542248
                    </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button  type="button" className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  
                     <Link href={"restaurant?restaurant="+restaurant.id}>
                      Menu
                      </Link>
                    </button>
                    </td>
                
                  </tr>)
                ):null}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    }
    



   
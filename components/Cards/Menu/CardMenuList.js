import React, { useEffect,useLayoutEffect } from "react";
import axios from "axios";
import {getSession, useSession } from "next-auth/react";
import {useSelector,useDispatch} from "react-redux";
import {getMenu} from 'components/utils/utils'
import Link from "next/link";
import CardCreateMenu from "components/Cards/Menu/CardCreateMenu";



export default function CardRestaurantsModal({menus,setMenus,restaurantid}) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const session = useSession();
  const [selectedMenu,setSelectedMenu] = React.useState({});
  const [showModal,setShowModal] = React.useState(0);

const openModal = (id,name)=>{

setSelectedMenu({id,name});

setShowModal(1);
console.log(showModal)
}

const activate = async(id,restaurantid) =>{
  console.log(id);
  
  await axios.post("/api/api/menuActivate",{user,info:{id:id,restaurant:restaurantid}}).then(res=>console.log(res));

  }

  return (
        <>
        {showModal?<CardCreateMenu restaurantid={restaurantid} id={selectedMenu.id} showModal={showModal} setShowModal={setShowModal} name={selectedMenu.name} />:null}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Menu List
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
                      Menu Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Menu description
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Menu state
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                 
                  {menus.length>0?menus.map((menu,index)=>
                  (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {menu.name}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                     Denizli
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {menu.active=="active"?null:  (<button onClick={()=>{activate(menu.id,restaurantid)}} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Activate</button>)}
                    </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button onClick={()=>openModal(menu.id,menu.name)}  type="button" className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  
                    
                      update
                  
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
    



   
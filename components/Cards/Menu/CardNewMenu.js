import React, { useEffect } from "react";
import axios from "axios";
import {useSelector,useDispatch } from "react-redux";
import { fetchRestaurants } from 'redux/dataSlicer'
import uuid from "react-uuid";
import {updateMenu,getMenu} from'components/utils/utils'
import { random } from "lodash";

//import {GetRestaurantReal} from 'components/system/firebaseActions'
export default function Modal({menus,setMenus,restaurantid}) {
 const dispatch = useDispatch();
 const user = useSelector(state => state.user);
 const [showModal, setShowModal] = React.useState(0);
 const [dataa,setData] = React.useState();
 const [defaultMenu, setDefaultMenu] = React.useState([]);
const restaurant =useSelector(state=>state.data.restaurant);

  const handle=()=>{
    setShowModal(true);
    setData({...dataa});
  
   
  }
 useEffect(()=>{
 
  const menus1 = getMenu(user,null,null,null,null,{id:null,restaurant:null}).then(res=>setDefaultMenu(res));
  setDefaultMenu(menus1);

 },[showModal])

  function prettyUrl(value)
  {
    return value.replace(/ /g, "-").replace(/@/g, "").replace(/\$/g, "").replace(/!/g, "").replace(/#/g, "").toLowerCase();
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newurl = prettyUrl(dataa.name+(random(0,100000)));
    const newid= uuid();
    setMenus([...menus,{name:dataa.name,restaurant:restaurantid,id:newid,url:newurl}]);
    getMenu(user).then(res=>{
    
    updateMenu(res[0].menu.menuliste,user,dataa.name,{id:newid,restaurant:restaurantid,url:newurl}).then(res=>console.log(res))
    });
    const menus1 = getMenu(user,null,null,null,null,{id:null,restaurant:restaurantid}).then();
    
    
  }
  return (
    <div>
    <div>
    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
    
       
      <button type="button"
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => handle()} >
        Create New Menu
      </button>
      </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                  Create New Menu
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    {/*form*/}
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                          <div className="mb-6">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Menu Name</label>
                            <input onChange={(e)=>setData({...dataa,name:e.target.value})} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required/>
                          </div>
                     
                        
                          
                    </form>


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
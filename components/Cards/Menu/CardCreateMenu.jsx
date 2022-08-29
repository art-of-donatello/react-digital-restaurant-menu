import React, { useEffect ,useRef,useState} from "react";
import axios from "axios";
import {useSelector,useDispatch } from "react-redux";
import uuid from 'react-uuid'
import FormData from 'form-data'
import _ from 'lodash'
import ProductCard from "../ProductCard";
import { useStateWithRef,clone,getMenu ,uploadImage,RemoveItem,setmenulist,updateMenu} from "components/utils/utils";




//import {GetRestaurantReal} from 'components/system/firebaseActions'
export default function CardCreateMenu({restaurantid=null,id=null,name='Default Menu',showModal,setShowModal}) {




   const uploadImage = async(file) => {
    let data = new FormData();

  const body = new FormData();
  body.append("file", file);
  const response = await axios.post("/api/api/uploadimage", body);

 
  return response.data?.resultBody?.url;
}

  

  
  const RemoveItem=(id,liste,e)=>{
    e.preventDefault();
    const tempMenu = [...menulist];
    const index = tempMenu.findIndex(x => x.id === id);
    tempMenu.splice(index, 1);

    setmenulist(tempMenu)
  }





  const inputRef = useRef(null);
  const scrollref = useRef();
  const user = useSelector(state => state.user);

  const [showItem,setShowItem] = useState({item:{id:""}});
  const [menu,setMenu,menuRef] = useStateWithRef([]);
  const [menulist,setmenulist,menulistRef] =useStateWithRef([]);

  const [adres,setAdres,currentAdres] = useStateWithRef([]);
  const info ={
    id:id,
    restaurant:restaurantid,
  }
  const handle= async()=>{
    await getMenu(user,setmenulist,setMenu,menulistRef,"",info)
/*
    setmenulist(menulist)
            
    setMenu(list_to_tree( clone(menulistRef.current) )) ;
*/
    setShowModal(true);

    
  }








  
  const UpdateItem=async(id,liste,e)=>{
    e.preventDefault();
  
    const veri=e.target.name.value;
    const description=e.target.description.value;
    const price=e.target.price.value;
    const imageFile=e.target.file.files[0];
    const image=imageFile==undefined?"":await uploadImage(imageFile);

  menulist.map((item)=>{
    if(item.id===id){
      item.parentId=item.parentId;
     veri==""?null: item.text=veri;
     description==""?null: item.description=description;
     price==""?null:item.price=price;
     image==""?null:item.image=image;
     
    }
   
  })
  
      setmenulist(menulist);
     
      updateMenu(menulistRef.current,user,name,info)
      ShowAlt(currentAdres.current.at(-1));

  }

  const AddItem=async(itemid=0,liste,e,setmenulist=null)=>{
   

    e.preventDefault();
  
    const veri=e.target.name.value;
    const description=e.target.description.value;
    const price=e.target.price.value;

    const imageFile=e.target.file.files[0];
    const image=imageFile==undefined?"":await uploadImage(imageFile);
   
  
  setmenulist!=null? setmenulist([...menulist,
      {
        id:uuid(),
        parentId:itemid,
        text:veri,
        description:description,
        price:price,
        image:image,
        level:veri,
        price:0,
        children:null
      }]):null
    
     
      updateMenu(menulistRef.current,user,name,info)

  executeScroll();
} 


function list_to_tree(list) {
  
  var map = {}, node, roots = [], i;
  
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== "0") {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  
  return roots;
}

const executeScroll = () => scrollref.current.scrollIntoView()


useEffect(()=>{
  getMenu(user,setmenulist,setMenu,menulistRef,"",info);

  setmenulist(menulist)
            
  setMenu(list_to_tree( clone(menulistRef.current) )) ;
  

  ShowAlt("0");
console.log(info)
  
},[])

useEffect(()=>{


  menulist.length>0?setMenu(list_to_tree( clone(menulist))):null;

  ShowAlt(currentAdres.current.at(-1));

  
},[menulist])


const ShowUp=()=>{
  /*** Remove from adress line move to upper page */
const upIndex=adres.at(-2);
setAdres(adres.slice(0, -2));
ShowAlt(upIndex);
}

const ShowAlt=(parent)=>{

  /*** Move to Current Page or Selected Page */
const temp =list_to_tree( clone(menulist));
currentAdres.current.at(-1)!==parent?setAdres([...currentAdres.current,parent]):null;

/*** scroll to the top page */


const RecursiveAlt=(parent,temp,tempm=[])=>{

  temp.forEach((el)=>{
    

    if(el.parentId===parent){
   
      tempm.push(el)
      
    }
    el.children.length>0?RecursiveAlt(parent,el.children,tempm):null;
  })
 return tempm;
}

setMenu(RecursiveAlt(parent,temp))

const tempParent=menu.length<1?"0":menu[0].parentId


//setcurrenParent({oldParent:tempParent,newParent:parent})

}






  function OpenMneu({listeler}){


 return (
<>
 
{  
listeler.map((item) => item.children.length>0&&currentAdres.current.at(-1)==item.parentId? (
  <div key={item.id} className="flex justify-center text-slate-900  pt-4">

    <ul key={item.id+"a"} className="rounded-lg border text-slate-900   border-gray-200 w-96 ">
        
        <li key={item.id+"b"} className="px-6 py-2 flex flex-1 flex-col items-center  border-b border-gray-200  w-full rounded-t-lg">
        <ProductCard item={item}></ProductCard>
        <button onClick={()=>{ShowAlt(item.id);executeScroll()}} type="submit" className=" p-1 m-1 text-white bg-pink-500 justify-center self-center w-auto hover:bg-orange-300 rounded">Create Sub</button> 
        <button type="button" className="bg-pink-500 p-1 m-1 text-white justify-center self-center hover:bg-orange-300 rounded" onClick={(e)=>RemoveItem(item.id,menu,e)} >Remove </button> 
         </li>

        <li  className="px-6 py-2 flex flex-1 flex-col items-center  border-b border-gray-200  w-full rounded-t-lg" key={item.id+"s"} onClick={()=>ShowAlt(item.id)} ><button className="bg-pink-500 p-1 m-1 text-white justify-center  self-center hover:bg-orange-300 rounded"> Sub Products </button></li> 
          <li  className="px-6 py-2 flex flex-1 flex-col items-center  border-b border-gray-200  w-full rounded-t-lg">
            <div> 
              <button type="submit" onClick={()=>setShowItem({...setShowItem,item})} className={showItem.item.id==item.id?"hidden":"bg-pink-500 p-1 m-1 text-white justify-center self-center hover:bg-orange-300 rounded"}  >Update </button>
               
                <div className={showItem.item.id==item.id?"":"hidden"}>
                    <form  onSubmit={(e)=>UpdateItem(item.id,menu,e)}>
                        <input ref={inputRef} placeholder="New Product" name="name" className={"s"+item.id+ "bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        <input ref={inputRef} placeholder="Description" name="description" className={"s"+item.id+ "bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        <input ref={inputRef} placeholder="Price" name="price" className={"s"+item.id+ "bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        
                        <input ref={inputRef} type="file" name="file" className={"s"+item.id+ "bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} ></input>
                        
                         <button type="submit"  className="bg-pink-500 p-1 m-1 text-white justify-center self-center hover:bg-orange-300 rounded" >Update </button> 
                    </form>
                    </div>
                    </div>
             
        </li>
  
          <OpenMneu listeler={item.children}></OpenMneu> 

    </ul> 
  </div>

):(

  <div key={item.id} className={currentAdres.current.at(-1)==item.parentId?"flex justify-center pt-4":"hidden "}>
    <ul key={item.id+"a"} className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900  ">
      <li key={item.id+"c"}  className="flex flex-1 flex-col items-center px-6 py-2 border-b w-auto border-gray-200 rounded-t-lg" > 
      <ProductCard item={item}></ProductCard>
 
      <button onClick={()=>{ShowAlt(item.id);executeScroll()}} type="submit" className=" p-1 m-1 text-white bg-pink-500 justify-center self-center hover:bg-orange-300 rounded">Create Sub </button> 
      <button type="button" className="bg-pink-500 p-1 m-1 text-white justify-center self-center hover:bg-orange-300 rounded" onClick={(e)=>RemoveItem(item.id,menu,e)} >Remove </button> 
      
      <div> 
              <button type="submit" onClick={()=>setShowItem({...setShowItem,item})} className={showItem.item.id==item.id?"hidden":"bg-pink-500 p-1 m-1 text-white justify-center self-center hover:bg-orange-300 rounded"}  >Update </button>
                
                <div className={showItem.item.id==item.id?"":"hidden"}>
                    <form  onSubmit={(e)=>UpdateItem(item.id,menu,e)}>
                        <input ref={inputRef} placeholder="New Product" name="name" className={"s"+item.id+ "bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        <input ref={inputRef} placeholder="Description" name="description" className={"s"+item.id+ "bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        <input ref={inputRef} placeholder="Price" name="price" className={"s"+item.id+ "bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        
                        <input ref={inputRef} type="file" name="file" className={"s"+item.id+ "bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} ></input>
                        
                         <button type="submit"  className="bg-pink-500 p-1 m-1 text-white justify-center self-center hover:bg-orange-300 rounded" >Update </button> 
                    </form>
                    </div>
                    </div>
      
      </li>
    </ul>
 </div>)

)
}
</>
 )
}


  return (
    <div>
    <div>
    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right ">
    
       
      <button type="button"
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => handle()} >
        Create New Menu
      </button>
      </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-cmenulist items-cmenulist w-full max-w-full   flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full max-w-4xl my-6 mx-auto ">
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
                <div className="relative p-6 flex-auto w-auto w-full  max-w-sm justify-center self-center">
                    {/*form*/}
                    

                  <div ref={scrollref}>
                    { currentAdres.current.at(-1)!='0'? (
                      <div>
                    <button onClick={()=>ShowUp()}>Back </button><div> <p className="flex flex-col items-center"> {menuRef.current[0]?.text}</p></div>
                    </div>
                    ):<div  className="flex flex-col items-center">  <p> Main Page</p></div>}
                    
                    </div>

                  <div  id="newItem" className="flex flex-1 flex-col items-center px-6 py-2 border-b border-gray-200 w-full rounded-t-lg border-2 pt-5 mt-5">
                    <form  onSubmit={(e)=>AddItem(currentAdres.current.at(-1),menu,e,setmenulist)} className="flex flex-1 flex-col items-center self-center">
                  
                        <input ref={inputRef} placeholder="New Product" name="name" className={ "bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        <input ref={inputRef} placeholder="Description" name="description" className={"bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        <input ref={inputRef} placeholder="Price" name="price" className={"bg-gray-50  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
                        
                        <input ref={inputRef} type="file" name="file" className={"bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} ></input>
                        
                       
                                     <button  className="bg-pink-500 p-1 m-1 text-white justify-center self-center items-center hover:bg-orange-300 rounded" type="submit" >New Main Item </button> 
                    </form>
                    </div>

                    <OpenMneu  listeler={menuRef.current} />
                    
                    

                  <hr/>
                
                    


                </div>
                {/*footer*/}
                <div className="flex items-cmenulist justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
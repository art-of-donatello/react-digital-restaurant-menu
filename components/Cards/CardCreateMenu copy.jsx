import React, { useEffect ,useRef,useState} from "react";
import axios from "axios";
import {useSelector,useDispatch } from "react-redux";
import uuid from 'react-uuid'


//import {GetRestaurantReal} from 'components/system/firebaseActions'
export default function CardCreateMenu({restauantId}) {


 
  const getMenu = async() => {

  await axios.post("/api/api/getMenu", {
      name: "DefaultMenu",user 
    }).then((res) => {
      //setmenulist(res.data.menu)
     
      setmenulist(res.data.message[0].menu.menulist)
      
     setMenu(list_to_tree(res.data.message[0].menu.menulist)) ;

    }).catch((err) => {
      console.log(err)
    })

  }

const updateMenu = async(menulist) => {

  const data  = {
    menu:{menulist},
    name:"DefaultMenu"
  }
  await axios.post("/api/api/menuupdate",{data,user}).then(res=>console.log(res));
}


  const inputRef = useRef(null);
  const user = useSelector(state => state.user);
  const [showModal, setShowModal] = useState(0);
 

  const [menu,setMenu] = useState([]);
  const [menulist,setmenulist] =useState([]);
  const [currenParent,setcurrenParent] = useState({oldParent:"0",newParent:"0"});

  const handle= async()=>{
    setShowModal(true);
    getMenu()
  }



  const RemoveItem=(id,liste,e)=>{
    e.preventDefault();
    const tempMenu = [...menulist];
    const index = tempMenu.findIndex(x => x.id === id);
    tempMenu.splice(index, 1);

    setmenulist(tempMenu)
  }

const updateItem=(id,liste,e)=>{
  e.preventDefault();
  const tempMenu = [...menulist];
  const index = tempMenu.findIndex(x => x.id === id);
  tempMenu[index].text = e.target.name.value;
  setmenulist(tempMenu)
}

  const AddItem=(id=0,liste,e)=>{
    console.log(id);
    let counter=0;
    e.preventDefault();
  
    const veri=e.target.name.value;
    setmenulist([...menulist,{id:uuid(),parentId:id,text:veri,level:veri,price:0,children:null}])
   // entries.push({id:uuid(),parentId:id,text:veri,level:veri,price:0,children:null});
  
 
    ShowAlt(id);
  
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


useEffect(()=>{


  //menulist.length>0?ShowAlt(currenParent.newParent):null;



  menulist.length>0?ShowAlt(currenParent.newParent):null;

  //ShowAlt(currenParent.newParent)
  //updateMenu(menulist);
  updateMenu(menulist)
  
},[menulist])


useEffect(()=>{
  getMenu();

  
},[])

const ShowAlt=(parent)=>{

const temp = list_to_tree(menulist);

setcurrenParent({oldParent:menu.length<1?"0":menu[0].parentId,newParent:parent});
setMenu(RecursiveAlt(parent,temp))

}

const RecursiveAlt=(parent,temp,tempm=[])=>{

  temp.forEach((el)=>{
    

    if(el.parentId===parent){
   
      tempm.push(el)
      console.log(tempm);
    }
    el.children.length>0?RecursiveAlt(parent,el.children,tempm):null;
  })
 return tempm;
}




useEffect(()=>{



},[menu])

  function OpenMneu({listeler}){


 return (
<>
 
{  
listeler.map((item) => item.children.length>0? (
  <div key={item.id} className="flex justify-center">

 <ul key={item.id+"a"} className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
 <li key={item.id+"s"} onClick={()=>ShowAlt(item.id)} className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{item.text}  </li>
 <li key={item.id+"b"} className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
    <form  onSubmit={(e)=>AddItem(item.id,menu,e)}>
    <input ref={inputRef} placeholder="New Product" name="name" className={"s"+item.id+ "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
    <button type="submit" >Item {item.text}</button> 
    </form>
   
   
    </li>
  
  <OpenMneu listeler={item.children}></OpenMneu> 

  </ul> 
  </div>
):(<div key={item.id} className="flex justify-center">
  <ul key={item.id+"a"} className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
  <li key={item.id+"c"} className={currenParent.newParent==item.parentId?" px-6 py-2 border-b border-gray-200 w-full rounded-t-lg":"hidden "} > {item.text} <br/>
<form  onSubmit={(e)=>AddItem(item.id,menu,e)}>

    <input ref={inputRef} placeholder="New Product" name="name" className={"s"+item.id+ " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"></input>
    <button type="submit" >Item {item.text+" "}</button> 
    </form>
    <button type="button" onClick={(e)=>RemoveItem(item.id,menu,e)} >Remove {item.text}</button> 
 </li></ul></div>)

)
}
</>
 )
}





  const handleSubmit=async(e)=>{
    e.preventDefault();
    updateMenu(menulist);
   
 
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
                    { currenParent.newParent!=0? (
                    <button onClick={()=>ShowAlt(currenParent.oldParent)}>Back</button>
                    ):null}
                    <OpenMneu  listeler={menu} />
                    
                    

                  <hr/>
                  <div className="flex justify-center self-center items-center max-w-sm pt-5">
                    <form  onSubmit={(e)=>AddItem(currenParent.newParent,menu,e)}>
                    <input ref={inputRef} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"></input>
                    <button type="submit" >New Main Item </button> 
                    </form>
                    </div>
       

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
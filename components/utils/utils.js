import React,{useRef,useState} from "react"
import uuid from 'react-uuid'
import FormData from 'form-data'
import _ from 'lodash'
import axios from "axios"

  const useStateWithRef = (initialValue) => {
    const ref = useRef(initialValue)
    const [state, setState] = useState(initialValue)
  
    const updateState = (newState) => {
      ref.current = typeof newState === 'function' ? newState(state) : newState
      setState(ref.current)
    }
  
    return [state, updateState, ref]
  }
  
  
    const clone=(dataref)=>{
      const veri =dataref.map( (child)=>_.clone(child )) ;
      return veri;
    }
    
    


 


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
  const updateMenu = async(menuliste,user,name="DefaultMenu",info={id:uuid(),restaurant:null}) => {

    const data  = {
      menu:{menuliste},
      id:info.id,
      restaurant:info.restaurant,
      name:name
    }
    
   const res =  await axios.post("/api/api/menuupdate",{data,user,info})
   return res;
  }


  const getMenu = async(user,setmenulist=null,setMenu=null,menulistRef, name="DefaultMenu",info={}) => {

   const res= await axios.post("/api/api/getMenu", {
        name: name,user, info
      }).then((res) => {
        //setmenulist(res.data.menu)
  
       setmenulist!=null? setmenulist(res.data.message[0].menu.menuliste):null;
        
       setMenu!=null?setMenu(list_to_tree( clone(menulistRef.current) )):null ;
        
        return res.data.message
      }).catch((err) => {
        console.log(err)
      })
  return res;
    }

  const uploadImage = async(file) => {
    let data = new FormData();

  const body = new FormData();
  body.append("file", file);
  const response = await axios.post("/api/api/uploadimage", body);

 
  return response.data?.resultBody?.url;
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
  
      setmenulist(menulist)

    
      
     
      updateMenu(menulistRef.current)
      ShowAlt(currentAdres.current.at(-1));

  }

  const AddItem=async(itemid=0,liste,e)=>{
   

    e.preventDefault();
  
    const veri=e.target.name.value;
    const description=e.target.description.value;
    const price=e.target.price.value;

    const imageFile=e.target.file.files[0];
    const image=imageFile==undefined?"":await uploadImage(imageFile);
   
  
   setmenulist([...menulist,
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
      }])
    
    
      
     
      updateMenu(menulistRef.current)

  
} 

export {useStateWithRef,clone,ShowUp,ShowAlt,list_to_tree,uploadImage,UpdateItem,AddItem,getMenu,updateMenu}
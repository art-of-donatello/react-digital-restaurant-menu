import {app,db,stograge } from './firebase'

import { getAuth} from "firebase/auth";

import { get, getDatabase, ref, set } from "firebase/database";

import { collection, addDoc,doc,setDoc,updateDoc,getDoc, getDocs, query, where, onSnapshot,getDocsFromServer, orderBy } from "firebase/firestore";

import { getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { isEmpty } from '@firebase/util';
import { stringify } from 'postcss';




const setRole=async(user,role,roles={})=>{
    /*
    set(ref(database, 'users/' + user), {
        role:role,
        roles:roles
      }).then((result) => {console.log(result)});
      */
      
      const data = {
        role: role,
        roles:roles
      };

     // const role = doc(collection(db, "user",user));
      const newCityRef1 = doc(collection(db, "user",user));
      const res =await updateDoc(newCityRef1, data);
    
      return res;
}



const createUser=async(user)=>{
console.log(user);
    const data={
       
        email:user.email,
        name:user.username,
        role:"user",
        roles:{},
    
}
    try{
      
            const newuser = doc(collection(db, "user"),user.email);
    
            const res= await setDoc(newuser, data); //addDoc use
    return res;
        }catch(e){
            console.log(e);
            return e;
    }

}


const createRestaurant=async(restaurant)=>{

    const data={
       
        id:restaurant.id,
        name:restaurant.name,
        owner:[restaurant.email],
        info:{},
    
}
    try{
      
            let newres = doc(collection(db, "user/"+restaurant.email+"/restaurant"),restaurant.id);
    
            let res= await setDoc(newres, data); //addDoc used

             newres = doc(collection(db, "restaurants"),restaurant.id);
    
             res= await setDoc(newres, data); //addDoc used
    return res;
        }catch(e){
            console.log(e);
            return e;
    }

}

const getRestaurants=async(data)=>{
   

    const res = collection(db, "user/"+data.email+"/restaurant");
   // console.log(res)
   try {
    const query =(res, orderBy("name", "desc"));
    const getRes =await getDocs(res,query);
   
    return getRes;
} catch (error) {
    console.log(error);
    return error;
}

   

}
const getRestaurant=async(data)=>{
    const res = collection(db, "user/"+data.email+"/restaurant");
    const newquery = query(res,where("name", "==", data.name));
    const getRes = await getDoc(res,newquery);
 
    return getRes;

}

const updateRestaurant=async(data)=>{
    const res = doc(collection(db, "user/"+data.email+"/restaurant"),data.name);
    const updatedData = data.info?data.info:{};
    const getRes = await updateDoc(res, updatedData);
    return getRes;
}

const createMenu = async (data) => {

    const menu={
        id:data.info.id,
        restaurant:data.info.restaurant,
        name:data.data.name,
        owner:data.user.email,
        menu:data.data.menu,
    
}
    try{
      
            const newres = doc(collection(db, "user/"+data.user.email+"/menu"),data.info.id);
    
            const res= await setDoc(newres, menu); //addDoc used
    return res;
        }catch(e){
            console.log(e);
            return e;
    }
  
}

const createRestaurantMenu = async (data) => {

    const menu={
        id:data.info.id,
        restaurant:data.info.restaurant,
        name:data.data.name,
        owner:data.user.email,
        menu:data.data.menu,
        url:data.info.url,
        active:"passive",
    
}
    try{
      
            const newres = doc(collection(db, "restaurants/"+data.info.restaurant+"/menu"),data.info.id);
    
            const res= await setDoc(newres, menu); //addDoc used
    return res;
        }catch(e){
            console.log(e);
            return e;
    }
  
}

const updateMenu = async (data) => {
    if(data.info.restaurant==null){
    const col  = collection(db, "user/"+data.user.email+"/menu");
    const checkcol = await getDocs(col);
    checkcol.docs.length<1?await createMenu(data):null;
    const res = doc(col,data.data.name);
    const menu={
        id:data.info.id,
        name:data.data.name,
        owner:data.user.email,
        menu:data.data.menu,
    
}
    const getRes = await updateDoc(res, menu);
    return getRes;
}else{

    const col  = collection(db, "restaurants/"+data.info.restaurant+"/menu");
    //const newQuery = query(col,where('id', "==", "123456"));
    console.log("burayı sorguladı")
    const checkcol = await getDocs(col)
   
    let passed=checkcol.docs.length<1?false:true;
  
    
   checkcol.forEach(e=>{e.data()==data.info.id?console.log("eşleşti"):passed=false});
 
   passed?null:await createRestaurantMenu(data);

    const res = doc(col,data.info.id);
    const menu={
        name:data.data.name,
        owner:data.user.email,
        menu:data.data.menu,
    
}
    const getRes = await updateDoc(res, menu);
    return getRes;
}
    }

   
const ActivateMenu = async (data) => {
    const col  = collection(db, "restaurants/"+data.info.restaurant+"/menu");
    const checkcol = await getDocs(col)
    console.log(data.info.id)
   
    let res="";
    checkcol.forEach((e)=>{e.data().id==data.info.id?
     res = updateDoc(doc(col,e.data().id), {"active":"active"})
    : res = updateDoc(doc(col,e.data().id), {"active":"passive"})})
    return res;
}
const getMenu = async (data) => {
    console.log(data)
    if(data.info.restaurant==null){
    const res = collection(db, "user/"+data.user.email+"/menu");
    //const newquery = query(res,where('name', "==", data.name));
    try {
       
    
    const getRes = await getDocs(res);
      
    return getRes;

    } catch (error) {
      
        return error;
    }
}else{
    const res = collection(db, "restaurants/"+data.info.restaurant+"/menu");
    let newquery="";
  

    try {
       
   
    const getRes = await getDocsFromServer(res,newquery);
   
    return getRes;

    } catch (error) {
      
        return error;
    }

}

}



const GetRestaurantReal=async(data)=>{
    const user1 = collection(db, "user/"+data.email+"/restaurant");
    const unsubscribe = onSnapshot(user1, (snapshot) => {
        const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      
        const source1=snapshot._snapshot?.excludesMetadataChanges?true:false;
        if(source==="Server"&&source1==true){
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              console.log("New city: ", change.doc.data());
          }
          if (change.type === "modified") {
              console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
              console.log("Removed city: ", change.doc.data());
          }
        });
        return source;
    }
      });
  
      
    
}
const getUsers=async()=>{
    const user = collection(db, "user");

    const res= await getDocs(user); //addDoc use
   
    return res;

}
  
const getUser=async(email)=>{
    const user1 = collection(db, "user");
    const newquery = query(user1,where("email", "==", email));
    const res= await getDocs(newquery); //addDoc use
    res.forEach((doc)=>{
        console.log(doc.data());
    })
    return res;


}


const Realtime=async()=>{
    const user1 = collection(db, "user");
    const unsubscribe = onSnapshot(user1, (snapshot) => {
        const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      
        
        const source1=snapshot._snapshot?.excludesMetadataChanges?true:false;
        if(source==="Server"&&source1==true){
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              console.log("New city: ", change.doc.data());
          }
          if (change.type === "modified") {
              console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
              console.log("Removed city: ", change.doc.data());
          }
        });
        return source;
    }
      });
  
      
    
}


export {setRole,createUser,getUsers,getUser,Realtime,createRestaurant,getRestaurants,updateRestaurant,getRestaurant,GetRestaurantReal,createMenu,updateMenu,getMenu,ActivateMenu};
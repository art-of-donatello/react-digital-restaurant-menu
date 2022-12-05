import {app,db,stograge } from 'components/system/firebase'

import { getAuth} from "firebase/auth";


import { collection, addDoc,doc,setDoc,updateDoc,getDoc, getDocs, query, where, onSnapshot,getDocsFromServer, orderBy, deleteDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytesResumable, getDownloadURL,uploadBytes } from "firebase/storage";

import { isEmpty } from '@firebase/util';
import { stringify } from 'postcss';
import { random } from 'lodash';




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

function prettyUrl(value)
{
  return value.replace(/ /g, "-").replace(/@/g, "").replace(/\$/g, "").replace(/!/g, "").replace(/#/g, "").toLowerCase();
}


const createRestaurant=async(restaurant)=>{
    console.log(restaurant.image)
    const data={
       
        id:restaurant.id,
        name:restaurant.name,
        owner:[restaurant.email],
        image:restaurant.image,
        info:{},
        url:prettyUrl(restaurant.name+( random())),
    
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
console.log(menu)
    try{
      
            const newres = doc(collection(db, "user/"+data.user.email+"/menu"),menu.id);
            
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
    
            const res= await setDoc(newres, menu,{merge:true}); //addDoc used
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
 
    let id = "";
    checkcol.docs.length<1?await createMenu(data):"";
    id=data.info.id
    
    const res = doc(col,id);
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
  
    
   checkcol.forEach(e=>{e.data().id==data.info.id?console.log("eşleşti"):passed=false});
 
   passed?null:await createRestaurantMenu(data);

    const res = doc(col,data.info.id);
    const menu={
        name:data.data.name,
        owner:data.user.email,
        menu:data.data.menu,
    
}
    const getRes = await updateDoc(res, menu,{merge:true});
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

const deleteMenu = async (data) => {

    const res = doc( collection(db, "restaurants/"+data.info.restaurant+"/menu"),data.info.id);

    const result = deleteDoc(res);
return result;
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
const getUrlMenu = async (data) => {
  

    const res = collection(db, "restaurants");
    let newquery = query(res,where('url', "==", data));
  
    try {
        const getRes = await getDocsFromServer(res,newquery);
        //const id= getRes.docs[0].data().id;
        let id =0;
        getRes.forEach(e=>
            e.data().url==data?id=e.data().id:null
            );
       
        const menu = collection(db, "restaurants/"+id+"/menu");
        newquery = query(menu,where('active', "==", "active"));

        const getMenu = await getDocsFromServer(menu,newquery);
        let activeMenu = [];
        getMenu.forEach(e=>
            e.data().active=="active"?activeMenu=e.data().menu:null
            );
        return activeMenu;
   
   // const getRes = await getDocsFromServer(res,newquery);
   
    return getRes;

    } catch (error) {
      
        return error;
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

const uploadImage = async (file,blob) => {

    // Create a root reference
const storage = getStorage();

// Create a reference to 'mountains.jpg'
//const mountainsRef = ref(storage, file);

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, `/images/${file.originalFilename}`);

// While the file names are the same, the references point to different files
//mountainsRef.name === mountainImagesRef.name;           // true

    console.log(mountainImagesRef.fullPath);

   
console.log("buraya gelindi")
// 'file' comes from the Blob or File API
uploadBytes(mountainImagesRef, blob).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
   
   // const storageRef = ref(stograge,file);

    // Upload the file and metadata
  /*
    const uploadTask = await uploadBytesResumable(mountainImagesRef, blob);
*/
}
const getImage = (file) => {

}


export {deleteMenu,uploadImage,getUrlMenu,setRole,createUser,getUsers,getUser,Realtime,createRestaurant,getRestaurants,updateRestaurant,getRestaurant,GetRestaurantReal,createMenu,updateMenu,getMenu,ActivateMenu};
import {app,db,stograge } from './firebase'

import { getAuth} from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";

import { collection, addDoc,doc,setDoc,updateDoc,getDoc, getDocs, query, where, onSnapshot } from "firebase/firestore";

import { getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {getSession} from 'next-auth/react'
import { isEmpty } from '@firebase/util';

const session = getSession();
const database = getDatabase(  );

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
export {setRole,createUser,getUsers,getUser,Realtime}
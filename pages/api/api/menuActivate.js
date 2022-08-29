
import {createRestaurant,getRestaurants,updateRestaurant,getRestaurant,getMenu,ActivateMenu} from 'components/system/firebaseActions';
import {getSession,get } from 'next-auth/react'
import {useState} from 'react'


export default async function handler(req, res) {

const session =await getSession({req});
let data = [];

session?"":res.status(403).json({message:'You must be sign in to view the protected content on this page.',});

/** get Restaurant(s) */
const getmenuInfo = {user:req.body.user,info:{restaurant:req.body.info.restaurant}};


   
   const rep={info:{id:req.body.info.id,restaurant:req.body.info.restaurant},user:req.body.user};
           
console.log(rep)
   const response = ActivateMenu(rep);


res.status(201).json({message:data});

  }
  
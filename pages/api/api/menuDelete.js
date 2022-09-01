
import {createRestaurant,getRestaurants,updateRestaurant,getRestaurant,getMenu,deleteMenu} from 'components/system/firebaseActions';
import {getSession,get } from 'next-auth/react'
import {useState} from 'react'
import { list_to_tree } from 'components/utils/utils';

export default async function handler(req, res) {

//const session =await getSession({req});
let data = [];

//session?"":res.status(403).json({message:'You must be sign in to view the protected content on this page.',});

/** get Restaurant(s) */

const response =await deleteMenu(req.body);


res.status(201).json({message:response});

  }
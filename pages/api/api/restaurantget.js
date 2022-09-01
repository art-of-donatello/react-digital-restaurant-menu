
import {createRestaurant,getRestaurants,updateRestaurant,getRestaurant} from 'components/system/firebaseActions';
import {getSession,get } from 'next-auth/react'
import {useState} from 'react'


export default async function handler(req, res) {


let data = [];

session?"":res.status(403).json({message:'You must be sign in to view the protected content on this page.',});

/** get Restaurant(s) */

const response =await getRestaurants(req.body);


response.forEach(element => {data=[...data,element.data()]});
res.status(201).json({message:data});

  }
  
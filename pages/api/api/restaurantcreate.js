
import {createRestaurant,getRestaurants} from 'components/system/firebaseActions';
import {getSession } from 'next-auth/react'
import { getToken, } from "next-auth/jwt"

export default async function handler(req, res) {
  const token = await getToken({ req })
//const session =await getSession({req});
//session?"":res.status(403).json({message:'You must be sign in to view the protected content on this page.',});


await createRestaurant(req.body);
const response = await getRestaurants(req.body);


res.status(201).json({message:response})

  }
  
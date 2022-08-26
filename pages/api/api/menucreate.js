import {createRestaurant,getRestaurants,createMenu} from 'components/system/firebaseActions';
import {getSession } from 'next-auth/react'
import { getToken, } from "next-auth/jwt"

export default async function handler(req, res) {
  const token = await getToken({ req })
const session =await getSession({req});
session?"":res.status(403).json({message:'You must be sign in to view the protected content on this page.',});


const response = await createMenu(req.body);

res.status(201).json({message:response})

  }
  
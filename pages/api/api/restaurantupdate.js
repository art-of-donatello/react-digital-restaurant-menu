
import {createRestaurant,getRestaurants,updateRestaurant} from 'components/system/firebaseActions';
import {getSession } from 'next-auth/react'

export default async function handler(req, res) {
const session =await getSession({req});
session?"":res.status(403).json({message:'You must be sign in to view the protected content on this page.',});




const response = await updateRestaurant(req.body);
console.log(response.forEach(element => {console.log(element.data())}));

res.status(201).json({message:response})

  }
  
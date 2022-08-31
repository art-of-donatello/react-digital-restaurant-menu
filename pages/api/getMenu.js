
import {getUrlMenu} from 'components/system/firebaseActions';
import {getSession,get } from 'next-auth/react'
import {useState} from 'react'
import { list_to_tree } from 'components/utils/utils';

export default async function handler(req, res) {

const session =await getSession({req});
let data = [];

session?"":res.status(403).json({message:'You must be sign in to view the protected content on this page.',});

/** get Restaurant(s) */
const url = req.body.url;

const response =await getUrlMenu(url[0]);
let menu = list_to_tree(response.menuliste)


if(url.length>1){
  


for(var i=1; i<url.length;i++){
  
    
   menu = menu.filter((item)=>item.text+createUrl(item.id)==url[i])
   menu = menu[0].children
    
    
}
return res.status(201).json({message:menu});
}

res.status(201).json({message:menu});

  }
  

import {getUrlMenu} from 'components/system/firebaseActions';
import {getSession,get } from 'next-auth/react'
import {useState} from 'react'
import { list_to_tree } from 'components/utils/utils';

export default async function handler(req, res) {


let data = [];

//session?"":res.status(403).json({message:'You must be sign in to view the protected content on this page.',});

/** get Restaurant(s) */
const url = req.body.url;

const response =await getUrlMenu(url[0]);
let menu = list_to_tree(response.menuliste)

console.log(response)


res.status(201).json({message:menu});

  }
  
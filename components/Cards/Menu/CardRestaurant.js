import { isEmpty } from 'lodash';
import React,{useEffect,useRef} from 'react'
import {useSelector } from 'react-redux'
import Link from 'next/link';
import CardMenuList from "components/Cards/Menu/CardMenuList";
import CardNewMenu from "components/Cards/Menu/CardNewMenu";
import {getMenu,useStateWithRef} from 'components/utils/utils'

function CardRestaurant({restaurantid}) {
const restaurants = useSelector(state=>state.data.restaurant);
const [menus,setMenus,menusRef] = useStateWithRef([]);
const user = useSelector(state => state.user);
const restaurant = restaurants.find(restaurant=>restaurant.id==restaurantid)

console.log(restaurant);


useEffect(()=>{
 
  const menus1 = getMenu(user,null,null,null,null,{id:null,restaurant:restaurantid}).then(res=>setMenus(res));
  setMenus(menus1);

 
},[])



console.log(restaurants)
if (restaurant==undefined) {

location.href='/admin/dashboard';
}else {
  return (


    <div>
      <CardNewMenu restaurantid={restaurantid} menus={menus}  setMenus={setMenus} /> 
    <CardMenuList menus={menusRef.current} setMenus={setMenus} restaurantid={restaurantid} />

    </div>
  )
} 
}

export default CardRestaurant
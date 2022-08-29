import React, { useEffect } from 'react'
import {getRestaurants} from 'components/system/firebaseActions'
import { useSession,getSession } from "next-auth/react";
import {useSelector,useDispatch } from "react-redux";
import {loginState,login} from 'redux/UserSlicer'


function CardRestaurantsTable() {

const dispatch = useDispatch();
const session = getSession();
const [restaurants,setRestaurants] = React.useState([]);
const user = useSelector(state => state.user);
const user1 = useSelector(loginState);

useEffect(() => {
    console.log(user+"asdasdasd ");
   
  
    console.log(user);
 

 

} ); 

const ekle=()=>{



    
    console.log(user);
}

  return (


    <div>
        <button onClick={()=>ekle()}>asdasd</button>
{/* restaurants.map((restaurant,index)=>(<div key={index}> {restaurant.data().name} </div>)) */}


    </div>


  )
}

export default CardRestaurantsTable
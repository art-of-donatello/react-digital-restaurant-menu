import React from "react";
import { useRouter } from "next/router";
// components

import MapExample from "components/Maps/MapExample.js";
import CardRestaurant from "components/Cards/Menu/CardRestaurant.js";
import { fetchRestaurants } from 'redux/dataSlicer'
import { useSelector, useDispatch } from "react-redux";
// layout for page

import Admin from "layouts/Admin.js";

export default function Restaurant() {
      const user = useSelector(state => state.user);
    const data=useRouter();
    const dispatch = useDispatch();

    
  const restaurant = data.query.restaurant;
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">

            <CardRestaurant restaurantid={restaurant} />
          </div>
        </div>
      </div>
    </>
  );
}

Restaurant.layout = Admin;

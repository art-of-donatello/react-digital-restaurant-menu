// Components 

import { useRouter } from "next/router";
import React from "react";
import Test from "components/Cards/test.js";


// layout for page

import Admin from "layouts/Admin.js";

export default function Restaurant() {
    const data=useRouter();
    console.log(data.query.args);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            
         
          </div>
        </div>
      </div>
    </>
  );
}

Restaurant.layout = Admin;
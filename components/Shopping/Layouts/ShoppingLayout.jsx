

import React from 'react'
import Header from "components/Shopping/Layouts/Header";
import Footer from "components/Shopping/Layouts/Footer";

function ShoppingLayout( {children}) {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  )
}

export default ShoppingLayout
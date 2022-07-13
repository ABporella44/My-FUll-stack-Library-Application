import React from "react"
import { createContext} from 'react';
import { useState } from "react";
import { globalState } from "./context";

const CartProvider = ({children})=>{
    const [cartItems,setCartItem] = useState([])
   
    const setCartitems =(item)=>{
     setCartItem((prevState)=>{
        return [...prevState,item]
     })
    }
    return(
        <globalState.Provider value={[cartItems,setCartitems]}>
           {children}
        </globalState.Provider>
    )
}

export default CartProvider
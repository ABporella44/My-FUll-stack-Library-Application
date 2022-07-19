import React from "react"
import { createContext} from 'react';
import { useState } from "react";
import { globalState } from "./context";

const CartProvider = ({children})=>{
    const [cartItems,setCartItem] = useState([])
    const [userName,setName] = useState("")

    const setCartitems =(item)=>{
        if(Object.keys(item).length === 0){
            setCartItem(()=>{
                return []
            })
        }else{
            setCartItem((prevState)=>{
                return [...prevState,item]
             })
        }
    }

    const setUserName = (item)=>{
      setName(item)
    }

    return(
        <globalState.Provider value={[cartItems,userName,setCartitems,setUserName ]}>
           {children}
        </globalState.Provider>
    )
}

export default CartProvider
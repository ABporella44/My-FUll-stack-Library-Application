import { Box,Card,Paper } from "@mui/material";
import { globalState } from "../authenticationPages/context";
import books from "./books";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState,useContext } from "react"

function Cart(props){
    const  userDetails = useContext(globalState)
    console.log("hello world",userDetails)
     const [initialState,setIntialState] = useState({
        numberOfBooks:1,
        selectedBooks:userDetails[0],
        errorMsg:"",
        repeatedOrder:[]
    })

    const increaseQuantity=(item)=>{
     let cartitems = initialState.selectedBooks     
     for(let i=0;i<=cartitems.length;i++){
         if(cartitems[i].isbn === item){
            cartitems[i].quantity =  cartitems[i].quantity + 1
            break;
         }
      }
      setIntialState({ selectedBooks:cartitems})
    }
   const decreaseQuantity=(item)=>{
    let cartitems = initialState.selectedBooks
     for(let i=0;i<=cartitems.length;i++){
         if(cartitems[i].isbn === item){
            if(cartitems[i].quantity > 0){
                cartitems[i].quantity =  cartitems[i].quantity - 1
            }           
            break;
         }
      }
      setIntialState({ ...initialState,selectedBooks:cartitems})
    }

    const deleteBook=()=>{
     
    }

   const orderBooks=()=>{
        axios.post("http://localhost:3002/api/Orders",initialState.selectedBooks,{
            headers:{
              token:localStorage.getItem('auth-token')
            },
          })
          .then(()=>{
            console.log("Posted data")
          })
          .catch((error)=>{
           if(error.response.status == 400){
            setIntialState({errorMsg:error.response.data.message,repeatedOrder:error.response.data.repetedOrderedBooks})
           }
          })
    }

  const  clearCart=()=>{
        const setCartitems = userDetails[2]
        setCartitems({})
        setIntialState({selectedBooks:[]})
        props.history.push({
            pathname:"/Navigation/homePage",
          })
    }
        return(
        <Box>
            <Box style={{margin:"10px"}}>
              {initialState.selectedBooks.map((item)=>
              <Box>
              <Box  style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",alignItems:"center",margin:"10px"}}>       
                    <Paper variant="outlined" elevation={6} style={{display:"flex",padding:"10px",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"70%",height:"100px"}}>
                       <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <img style={{height:"80px",width:"80px",borderRadius:"50px"}} src={item.thumbnailUrl}></img>
                        <h4>{item.title}</h4>
                       </Box>
                       <Box style={{    display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",columnGap:"10px"}}>
                       <AddIcon  onClick={()=>increaseQuantity(item.isbn)} id={`${item.isbn}`} style={{border:"0.5px solid black",borderRadius:"13px"}}/>{item.quantity}<RemoveIcon  name={`${item.isbn}`} onClick={()=>decreaseQuantity(item.isbn)} style={{border:"0.5px solid black",borderRadius:"13px"}}/>
                       <Button variant="contained" sx={{backgroundColor:"darkorange"}} onClick={deleteBook}>Delete Book</Button>
                       </Box>
                    </Paper>
              </Box>  
              </Box>
                   
               )}
               <Box>
                   <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center",width:"inherit",columnGap:"30px"}}>
                      <Button variant="contained" sx={{backgroundColor:"darkorange"}} onClick={orderBooks}>Order Now</Button>
                      <Button variant="contained" sx={{backgroundColor:"darkorange"}} onClick={clearCart}>Clear Cart</Button>
                   </Box>
              </Box> 
              {initialState.errorMsg ? 
              <Box style={{display:"flex",flexDirection:"row",color:"Red",justifyContent:"center",alignItems:"center"}}>
                <Typography >{initialState.errorMsg}</Typography>
                {initialState.repeatedOrder.map((item)=><>{item.title}</>)}
              </Box> :<></> 
            } 
            </Box>
        </Box>
        )
        
    }
export default Cart;
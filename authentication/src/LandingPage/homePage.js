import React, { useEffect,useContext,useState } from "react"
import {Button,Card,CardActions,CardContent,CardHeader,CardMedia,Typography } from "@mui/material";
import {Link} from "react-router-dom"
import  Box   from '@mui/material/Box';
import books from "./books"
import "../additionalStyles.css"
import {globalState} from "../authenticationPages/context"
import axios from "axios";

function Homepage(props){

const userDetails = useContext(globalState)
console.log(userDetails)
const [intialState,setIntialState] = useState({
    booksData:books,
    categoriesBooks:[],   
    defaultDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    cartItems:[],
    afterSelectedBook:[],
    secretData:""
  } )

useEffect(()=>{
  const [cartItems,setCartItems]  = userDetails ;
  setIntialState({...intialState,cartItems:cartItems})
  axios.get("http://localhost:3002/api/secret-route",{
    headers:{
      token:localStorage.getItem('auth-token')
    }
  })
  .then((res)=>{
    if(res.status==='401'){
      props.history.push("/Login")
    }
    console.log(res.data)
  })
  .catch((error)=>{
    console.log("error",error)
  })
},[])



    const cartAddedItems=(item)=>{
      let selectedBooks = intialState.afterSelectedBook
      let cartItems = intialState.cartItems
      let selectedBook = books.find((element)=>element.isbn === item)
      let checkBookAlreadySelected = selectedBooks.some((element)=>element.isbn === selectedBook.isbn)
      if(checkBookAlreadySelected){
        alert("The selected book already in the cart! you can add the quantity you need in cart!!!!!")
      }else{
        selectedBooks.push(selectedBook) 
        selectedBook.quantity = 1
        selectedBook.user=userDetails[1]
        let setCartItems = userDetails[2]
        setCartItems(selectedBook) 
        setIntialState({...intialState,cartItems:cartItems})} 
    }
    
     return(
            <Box >
               <Box className="hompage-cards">
              {intialState.booksData.map((item,index)=>
               <Card className="homepageEach-card">
                   <CardHeader title={item.title} sx={{height:"80px"}}></CardHeader>
                   <CardMedia image={item.thumbnailUrl} sx={{margin:"auto",width:"unset",height:"180px"}} component="img"></CardMedia>
                   <CardContent sx={{height:"200px",overflowY:"",overflowX:"hidden"}}>
                    <Typography sx={{minHeight:"170px"}}>{item.shortDescription ? item.shortDescription:intialState.defaultDescription}</Typography>
                   </CardContent>
                   <CardActions sx={{height:"80px",justifyContent:"space-evenly"}}>
                   <Link sx={{backgroundColor:"darkorange"}} to={{pathname:"/Navigation/displayBook",params:{bookId:item.isbn}}}>View Full Details</Link>           
                   <Button  variant="contained" onClick={()=>cartAddedItems(item.isbn)}>Add to Cart</Button>
                   </CardActions>
               </Card> 
              )}
               </Box>
            </Box>
        )
    }
export default Homepage;
import React, { useEffect, useState } from "react"
import { Box } from "@mui/system";
import books from "./books";
import { Button, Typography } from "@mui/material";

function  DisplayBook(props){

     const [initailState,setInitialState] = useState({
        bookId: this.props.location.params.bookId,
        selectedBook:{},
        authors:[]
       })

    useEffect(()=>{
        const bookId = props.location.params.bookId
        const bookSelected = books.find((item,index)=> item.isbn == bookId)
        setInitialState({...initailState,selectedBook:bookSelected,authors:bookSelected.authors})
    },[])

  const AuthorRender =()=>{
           return initailState.authors.map((item,index)=><>{item},</>)    
    }
        return(
            <Box sx={{width:"100%",display:"flex",flexDirection:"row"}}>
               <Box sx={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                   <Box sx={{height:"42rem"}}>
                       <img src={initailState.selectedBook.thumbnailUrl}  style={{height:"35rem",marginTop:"70px"}}></img>
                    </Box> 
                   <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-around",width:"inherit"}}>
                      <Button variant="contained" sx={{backgroundColor:"darkorange"}}>Add To Cart</Button>
                      <Button variant="contained" sx={{backgroundColor:"darkorange"}}>Add To Favourites</Button>
                   </Box>
               </Box>
               <Box sx={{width:"50%",marginTop:"70px"}}>
                   <Box>
                     <Box sx={{display:"flex",flexDirection:"column",rowGap:"15px",width:"70%"}}>
                        <Typography variant="h4"  sx={{color:"darkorange"}} component="h6">{initailState.selectedBook.title}</Typography>
                        <Typography variant="h8" component="h7"><span style={{color:"darkorange"}}>Authors:</span><AuthorRender/></Typography>
                        <Typography variant="h8" component="h7"><span style={{color:"darkorange"}}>ShortDescription:</span>{initailState.selectedBook.shortDescription}</Typography>
                        <Typography variant="h8" component="h7"><span style={{color:"darkorange"}}>Published Status:</span>{initailState.selectedBook.status}</Typography>
                        <Typography variant="h8" component="h7"><span style={{color:"darkorange"}}>PublishedDate:</span>{"2014-12-06"}</Typography>
                        <Typography variant="h8" component="h7"><span style={{color:"darkorange"}}>Price:</span>{"$100"}</Typography>
                     </Box>
                   </Box>
               </Box>
            </Box>
        )
    }
export default DisplayBook;
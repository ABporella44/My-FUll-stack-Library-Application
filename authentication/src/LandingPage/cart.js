import { Box,Card,Paper } from "@mui/material";
import React from "react"
import { globalState } from "../authenticationPages/context";
import books from "./books";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Typography } from "@mui/material";


class Cart extends React.Component{
    static contextType = globalState
    constructor(props){
     super(props);
     this.state={
         numberOfBooks:1
     }
    }

    increaseQuantity=()=>{
      
    }

    decreaseQuantity=()=>{

    }

    render(){
      const selectedCartItems = this.context[0]
    
     
        return(
        <Box>
            <Box style={{margin:"10px"}}>
              {selectedCartItems.map((item)=>
              <Box>
              <Box  style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",alignItems:"center",margin:"10px"}}>       
                    <Paper variant="outlined" elevation={6} style={{display:"flex",padding:"10px",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"70%",height:"100px"}}>
                       <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <img style={{height:"80px",width:"80px",borderRadius:"50px"}} src={item.thumbnailUrl}></img>
                        <h4>{item.title}</h4>
                       </Box>
                       <Box style={{    display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",columnGap:"5px"}}>
                       <AddIcon onClick={this.increaseQuantity} name={item.isbn} style={{border:"0.5px solid black",borderRadius:"13px"}}/>{this.state.numberOfBooks}<RemoveIcon  name={item.isbn} onClick={this.decreaseQuantity} style={{border:"0.5px solid black",borderRadius:"13px"}}/>
                       </Box>
                    </Paper>
              </Box>  
              </Box>
                   
               )}
               <Box>
                   <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center",width:"inherit",columnGap:"30px"}}>
                      <Button variant="contained" sx={{backgroundColor:"darkorange"}}>Order Now</Button>
                      <Button variant="contained" sx={{backgroundColor:"darkorange"}}>Clear Cart</Button>
                   </Box>
              </Box>  
            </Box>
        </Box>
        )
    }
}
export default Cart;
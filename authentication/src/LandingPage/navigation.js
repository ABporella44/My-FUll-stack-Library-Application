import React from "react"
import books from "./books"
import { AppBar,Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import  IconButton from '@mui/material/IconButton';
import  MenuIcon  from '@mui/icons-material/Menu';
import  Box   from '@mui/material/Box';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import CancelIcon from '@mui/icons-material/Cancel';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {globalState} from "../authenticationPages/context"

class Navigation extends React.Component{
  static contextType = globalState;
    constructor(props){
        super(props);
        this.state={
            drawerOpen:false,
            booksData:books,
            categoriesBooks:[],
            cartItems:[]
        }
    }

    componentDidMount(){
      
        let categoriesBooks = []
        books.map((item)=>{
               if(item.categories.length > 0){
                 categoriesBooks.push(item.categories )
               }
           })  
       let uniqueCategories = []
       categoriesBooks.map((item,index)=>{
          for(let i=0;i<=item.length;i++){
            let category = item[i]
             if(uniqueCategories.includes(category) == false && category !== undefined && category.length > 0){
                uniqueCategories.push(category)
             }
          }
       })
        this.setState({categoriesBooks:uniqueCategories,booksData:books})
 
     }

    handleDrawer=(action)=>{
        console.log(action)
        this.setState((prevState)=>{
         
        })
        
        
      if(action == "open"){
        this.setState({drawerOpen:true})
      }else{
        this.setState({drawerOpen:false})
      }  
    }

    openCartpage =()=>{
      this.props.history.push({
        pathname:"/Navigation/cart"
      })
    }

    render(){
     let cartItems = this.context[0].length;
        return(
          <Box>
            <AppBar sx={{display:"flex", position:"static",flexDirection:"row",justifyContent:"space-between"}}>
                <Toolbar>
                <IconButton
                   size="large"
                   edge="start"
                   color="inherit"
                   aria-label="open drawer"
                >
                </IconButton>
                <MenuIcon onClick={()=>this.handleDrawer("open")}/>  
                </Toolbar>
                <Box  onClick={this.openCartpage} className="cart-class">Cart<span><ShoppingCartIcon/></span><span className="item-count">{cartItems}</span></Box>
               </AppBar>
               <Box sx={{maxWidth:250}}>
                <Drawer
                open={this.state.drawerOpen}
                >
                  <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",margin:"15px"}}>
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                       <AutoStoriesIcon/>
                       <Typography>Menu</Typography>
                    </Box> 
                    <CancelIcon onClick={()=>this.handleDrawer("close")}/>
                  </Box>  
                   {this.state.categoriesBooks.map((item,index)=>
                   <List>
                      <ListItem>
                        <ListItemButton>
                            <ListItemIcon>{<InboxIcon/>}</ListItemIcon>
                        </ListItemButton>
                        <ListItemText>
                        {item}
                        </ListItemText>
                      </ListItem>
                   </List>
                  )} 
                </Drawer>
                </Box>
          </Box>
        )
    }
}
export default Navigation;
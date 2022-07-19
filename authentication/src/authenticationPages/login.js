import React, { useEffect } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {Card,CardHeader, Modal, TextField } from "@mui/material";
import axios from 'axios';
import { useState,useContext } from "react";
import { globalState } from "./context";

function Login (props){
  const  userDetails = useContext(globalState)
  const [initailState,setInitialState] = useState({
      modalOpen:false,
      nameError:false,
      passwordError:false,
      userName:"",
      password:"",
      errorMsg:null
    }
  )

  const handleSubmit=()=>{
    console.log(initailState.userName)
    console.log(initailState.password)
       if(initailState.userName == ""){
        setInitialState({nameError:true})
       }
       if(initailState.password.length <= 8 || initailState.password ==""){
        setInitialState({passwordError:true})
       }

       
       let userData = {}
       userData.username = initailState.userName
       userData.password = initailState.password
      
       if(userData.username !=="" && userData.password.length >= 8){
          axios.post("http://localhost:3002/api/login",userData)
          .then((res)=>{
            const setName = userDetails[3]
             setName(res.data.user)
             console.log("hello world",res.data.msg)
            if(res.data.msg){
              localStorage.setItem('auth-token', res.data.token)
              props.history.push({
                pathname:"/Navigation/homePage",
              })
            }   
       
          })
          .catch((error)=>{
            if(error){
              setInitialState({errorMsg:error.response.data.msg})
            }
          })
       }

    }

    const handleChange=(e)=>{
       e.preventDefault()
       setInitialState({...initailState,[e.target.name]:e.target.value,nameError:false,passwordError:false,errorMsg:null})
    }

  
  const style = {
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          };
  return(
    <Box sx={{ flexGrow: 1,width:"100%"}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountBalanceIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,display:"flex" }}>
            SF Public Library
          </Typography>
          <Button color="inherit" onClick={()=>setInitialState({modalOpen:true})}>Register</Button>
          <Modal
          open={initailState.modalOpen}
          onClose={()=>setInitialState({modalOpen:false})}
          >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Register for Library
                </Typography>
                <TextField id="outlined-basic" fullWidth  label="Name" variant="outlined" />
                <TextField id="outlined-basic" fullWidth  label="Email" variant="outlined" />
                <TextField id="outlined-basic" fullWidth  label="password" variant="outlined"/>
                <TextField id="Outlined-basic" fullWidth  label="Repeat-Password" variant="outlined"/>

                <Box component="div" sx={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                   <Button variant="contained" style={{marginTop:"20px"}}>SignUp</Button>
                   <Button variant="contained" style={{marginTop:"20px"}} onClick={()=>setInitialState({modalOpen:false})}>Close</Button>
                </Box>
            </Box>
          </Modal> 
        </Toolbar>
      </AppBar>
       <Box  component="div" sx={{display:"flex",flexDirection:"row",height:"100%",marginTop:"100px"}}>
          <Box sx={{height:"100%",width:"50%",backgroundColor:"white"}}>
            
          </Box>
          <Box sx={{height:"100%",width:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
             <Card sx={{width:500,height:500,display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Box sx={{maxWidth:"70%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",rowGap:"20px"}}>
                    <Box>
                         <Typography variant="h4" component="h2">
                             Login Into Library
                         </Typography>
                    </Box>
                    <Box>
                          <TextField onChange={handleChange} name="userName" error={initailState.nameError} helperText="Please enter a Username" id="outlined-basic" fullWidth label="Email" variant="outlined" />
                          <TextField onChange={handleChange} name="password" error={initailState.passwordError} helperText="Please enter a Valid Password"  id="outlined-basic" fullWidth label="password" variant="outlined"/>
                    </Box>
                   <Box component="div" sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",minWidth:"70%"}}>
                          <Button variant="contained" sx={{marginTop:"20px"}} onClick={handleSubmit}>Login</Button>
                          <Button variant="contained" sx={{marginTop:"20px"}} onClick={()=>setInitialState({modalOpen:true})}>Register</Button>
                   </Box>
                   <Box>
                        { initailState.errorMsg ? 
                          <Box>
                            <Typography color="red" variant="h6" component="h6">
                             {initailState.errorMsg}
                            </Typography>
                          </Box> : <></>
                        }
                   </Box>
                </Box>
             </Card>
          </Box>
       </Box>
    </Box>
        )
    }
export default Login;
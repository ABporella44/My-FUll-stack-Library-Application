import React from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {Card,CardHeader, Modal, TextField } from "@mui/material";
import axios from 'axios';

class Login extends React.Component{
    constructor(props){
     super(props);
     this.state={
       modalOpen:false,
       nameError:false,
       passwordError:false,
       userName:"",
       password:"",
       errorMsg:null
     }
    }

    handleModalClose=()=>{
      this.setState({modalOpen:false })
    }

    handleSubmit=()=>{
       if(this.state.userName == ""){
        this.setState({nameError:true})
       }
       if(this.state.password.length <= 8 || this.state.password ==""){
          this.setState({passwordError:true})
       }

       
       let userData = {}
       userData.username = this.state.userName
       userData.password = this.state.password
      
       if(userData.username !=="" && userData.password.length >= 8){
          axios.post("http://localhost:3002/api/login",userData)
          .then((res)=>{
            if(res.data.msg){
              localStorage.setItem('auth-token', res.data.token)
              this.props.history.push({
                pathname:"/Navigation/homePage",
                token:res.data.token,
                user:res.data.user
              })
            }    
          })
          .catch((error)=>{
            if(error){
                this.setState({errorMsg:error.response.data.msg})
            }
          })
       }

    }

    handleChange=(e)=>{
       e.preventDefault()
       this.setState({[e.target.name]:e.target.value,nameError:false,passwordError:false,errorMsg:null})
    }

    render(){
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
          <Button color="inherit" onClick={()=>this.setState({modalOpen:true})}>Register</Button>
          <Modal
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
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
                   <Button variant="contained" style={{marginTop:"20px"}} onClick={()=>this.setState({modalOpen:false})}>Close</Button>
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
                          <TextField onChange={this.handleChange} name="userName" error={this.state.nameError} helperText="Please enter a Username" id="outlined-basic" fullWidth label="Email" variant="outlined" />
                          <TextField onChange={this.handleChange} name="password" error={this.state.passwordError} helperText="Please enter a Valid Password"  id="outlined-basic" fullWidth label="password" variant="outlined"/>
                    </Box>
                   <Box component="div" sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",minWidth:"70%"}}>
                          <Button variant="contained" sx={{marginTop:"20px"}} onClick={this.handleSubmit}>Login</Button>
                          <Button variant="contained" sx={{marginTop:"20px"}} onClick={()=>this.setState({modalOpen:true})}>Register</Button>
                   </Box>
                   <Box>
                        { this.state.errorMsg ? 
                          <Box>
                            <Typography color="red" variant="h6" component="h6">
                             {this.state.errorMsg}
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
}
export default Login;
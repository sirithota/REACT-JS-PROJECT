import React from "react"
import { useState,useEffect } from "react"
import {useNavigate,useLocation, useParams} from "react-router-dom";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";

const initialState={
    name:"",
    email:"",
    contact:"",
};
const AddEdit=()=>{
    const [state,setState]=useState(initialState);

    const {name,email,contact}=initialState;
    
const navigate = useNavigate();

const {id} = useParams();

useEffect(()=>{
    if(id){
        getSingleUser(id);
    }
},[id]);

const getSingleUser=async (id)=>{
    const response =await axios.get(`http://localhost:4000/user/${id}`);
    if(response.status===200){
        setState({...response.data[0]});
    }
};


    const addUser=async (data) =>{
        const response =await axios.post(`http://localhost:4000/user`,data);
        if(response.status===200){
            toast.success(response.data);
        }
    }
    const updateUser=async (data,id) =>{
        const response =await axios.put(`http://localhost:4000/user/${id}`,data);
        if(response.status===200){
            toast.success(response.data)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name||!email||!contact){
            toast.error("please provide value into each input field")
        }else
        if(id){
            addUser(state);
        }else{
            updateUser(state.id);
        }
            setTimeout(()=>navigate("/"),500) 
        }
        
        const handleInputChange=(e1)=>{
            let {name,value}= e1.target;
            setState({...state,[name]:value})
         };
        
    
return(
<div style={{marginTop:"100px"}}>
    <h1>Login</h1>
    <form style={{margin:"auto",padding: "15px", maxWidth:"400px",alignContent:"center"}} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
        type="text" 
        id="name"
       name="name" 
       placeholder="enter name" 
       onChange={handleInputChange} 
       value={name}/>

        <label htmlFor="email">Email:</label>
 <input 
 type="email" 
 id="email"
name="email" 
placeholder="enter email" 
onChange={handleInputChange} 
value={email}/>

 <label htmlFor="contact">Contact:</label>
 <input 
 type="number" 
 id="contact"
name="contact" 
placeholder="enter contact no.." 
onChange={handleInputChange} 
value={contact}/>
<input type="submit" value={id ? "update" : "Add"}/>
</form>
</div>)
}
export default AddEdit
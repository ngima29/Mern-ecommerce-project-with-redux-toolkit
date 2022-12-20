import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {api} from './api'
import jwt_decode from "jwt-decode";
const initialState={
    token:localStorage.getItem('token'),
    name:'',
    email:'',
    _id:"",
    success: "",
    user:"",
    error:"",
    userLoaded:false,
    status:""
};
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (values,{rejectWithValue})=>{
    try {
     const token = await  axios.post(`${api}/user`,
        {
            name:values.name,
            email:values.email,
            password:values.password
        });
        localStorage.setItem("token",token.data)
        return token.data
    } catch (error) {
      console.log(error.response.data)   
      return rejectWithValue(error.response.data)
    }
})
/// user login 
export const userLogin = createAsyncThunk(
    "user/login",
    async(value, {rejectWithValue })=>{
        try {
            const token = await axios.post(`${api}/user/login`,{
                name:value.email,
                password:value.password,
            });
            localStorage.setItem('token',token.data)
            return token.data
        } catch (error) {
            console.log(error.response);
      return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
name:'user',
initialState,
reducers:{
 loasUser(state,action) {
    const token = state.token
    if(token){
        const user = jwt_decode(action.payload, { header: true });
        return{
            ...state,
            token,
            name:user.name,
            email:user.email,
            _id:user._id,
            userLoaded:true
        }
    }
 },
 logoutUser(state, action){
    localStorage.removeItem('token')
    return{
    ...state,
    token:"",
     name:'',
     email:'',
    _id:"",
    success: "",
    user:"",
    error:"",
    userLoaded:false,
    status:""
    }
 }
 // reducer close
},
extraReducers:(builder)=>{
builder.addCase(registerUser.pending,(state,action)=>{
    return {...state, status: "pending" }
});

builder.addCase(registerUser.fulfilled,(state,action)=>{
    if(action.payload){
      const user = jwt_decode(action.payload, { header: true });
      console.log(user)
       return{
        ...state,
        token: action.payload,
        name: user.name,
        email: user.email,
        _id: user._id,
        status: "success"
       } 
    } else return state
});
builder.addCase(registerUser.rejected,(state,action)=>{
   return{
    ...state,
    status:"rejected",
    error:action.payload
   }
});
builder.addCase(userLogin.pending,(state,action)=>{
    return{
        ...state, status:"pending"
    }
});
builder.addCase(userLogin.fulfilled,(state,action)=>{
    if(action.payload){
        const user = jwt_decode(action.payload, { header: true });
       
         return{
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          status: "success",
          
         } 
      } else return state
});
builder.addCase(userLogin.rejected,(state,action)=>{
    return{
        ...state,
         status:"rejected",
        error:action.payload
    }
});
// extraReducer close
}

///create slice ended
})

export const {loasUser, logoutUser} = authSlice.actions
export default authSlice.reducer
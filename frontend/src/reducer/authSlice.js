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
    loading:false,
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

const authSlice = createSlice({
name:'user',
initialState,
reducers:{

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
}




})

//export const { } = authSlice.actions
export default authSlice.reducer
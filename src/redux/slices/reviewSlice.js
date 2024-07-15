import { createAsyncThunk,createAction,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = 'http://localhost:5000'; 

export const getCreatorRating=createAsyncThunk('review/getCreatorRating',async(state,thunkApi)=>{
    
    try{
let response=await axios.get(`${BASE_URL}/getCreatorRating/${state}`)
return response
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})

export const saveRating=createAsyncThunk('review/create',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
     
let headers = {
    headers: {
        Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
    }
};
let response=await axios.post(`${BASE_URL}/save-review`,state,headers)
return response;
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})

export const reportCreator=createAsyncThunk('review/report',async(state,thunkApi)=>{
    console.log('creator')
    console.log(state)

    try{
 
let response=await axios.post(`${BASE_URL}/report`,state)
return response
    }catch(error){
        console.log('state')
        console.log(error.message)
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})


const reviewSlice=createSlice({
    name:'reviewSlice',
    initialState:{
        review:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getCreatorRating.pending,(state,action)=>{
state.pending=true
        })
        builder.addCase(getCreatorRating.fulfilled,(state,action)=>{
state.review=action.payload
        })
        builder.addCase(getCreatorRating.rejected,(state,action)=>{
state.serverErr=action?.payload?.message;
state.appErr=action?.error?.message
        })




        builder.addCase(saveRating.pending,(state,action)=>{
            state.pending=true
                    })
                    builder.addCase(saveRating.fulfilled,(state,action)=>{
            state.review=action.payload
                    })
                    builder.addCase(saveRating.rejected,(state,action)=>{
            state.serverErr=action?.payload?.message;
            state.appErr=action?.error?.message
                    })
    }
})
export default reviewSlice.reducer
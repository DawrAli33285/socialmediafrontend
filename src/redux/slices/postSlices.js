import axios from 'axios'
import {createSlice,createAsyncThunk, createAction} from '@reduxjs/toolkit'
const BASE_URL = 'http://localhost:5000'; 

export const getPost=createAsyncThunk('post/get',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
       
let headers = {
    headers: {
        Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
    }
};
let response=await axios.get(`${BASE_URL}/get-posts`,headers)
console.log(response)
return response.data
    }catch(e){
if(e.response.data){
return thunkApi.rejectWithValue(e.response.data)
}else{
    return thunkApi.rejectWithValue({error:"impossible de récupérer les messages"})
}
    }
})

export const add_remove_favourites=createAsyncThunk('post/like',async(state,thunkApi)=>{
    try{
let response=await axios.post(`${BASE_URL}/add-remove-favourites`,state)
return response.data
    }catch(e){
if(!e.response.data){
    return thunkApi.rejectWithValue({error:'incapable de traiter la demande'})
}else{
    return thunkApi.rejectWithValue(e.response.data)
}

    }
})



export const getSinglePost=createAsyncThunk('post/single',async(state,thunkAPI)=>{
    try{
        const token=thunkAPI.getState();
       
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };
let response=await axios.post(`${BASE_URL}/get-post`,state,headers)
return response.data
    }catch(error){
       
        if (error.response && error.response.data) {
          
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ error: "impossible d'obtenir une erreur de post-serveur" });
        }
    }
})

export const searchByUsername=createAsyncThunk('post/search_by_username',async(state,thunkAPI)=>{
    
    try{
let res=await axios.get(`${BASE_URL}/search-profile-username/${state}`)
return res

    }catch(error){
      
        if (error.response && error.response.data) {
          
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ error: "impossible d'obtenir une erreur de post-serveur" });
        }
    }
})
export const searchByTag=createAsyncThunk('post/search_by_tag',async(state,thunkAPI)=>{
    
    try{
let res=await axios.get(`${BASE_URL}/search-profile-tag/${state}`)
return res

    }catch(error){
      
        if (error.response && error.response.data) {
          
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ error: "impossible d'obtenir une erreur de post-serveur" });
        }
    }
})


export const emptysearchResults=createAction('post/empty_searchresults')

export const getCreatorPost=createAsyncThunk('post/creator_post',async(state,thunkAPI)=>{
    try{
        const token=thunkAPI.getState();
       
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };

let res=await axios.get(`${BASE_URL}/creator-posts/${state}`,headers)
return res
    }catch(error){
        if (error.response && error.response.data) {
          
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ error: "impossible d'obtenir une erreur de post-serveur" });
        }
    }
})

export const initialSeachPosts=createAsyncThunk('search/initial_search_posts',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
let headers = {
    headers: {
        Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
    }
};
       let res=await axios.get(`${BASE_URL}/initialSeachPosts`,headers)
       return res 
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})


const postSlice=createSlice({
    name:'postSlice',
    initialState:{
        post:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getPost.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getPost.fulfilled,(state,action)=>{
            state.loading=false;
            state.post=action.payload
        })
        builder.addCase(getPost.rejected,(state,action)=>{
            state.appErr=action?.payload?.message
            state.serverErr=action?.error?.message
            state.loading=false;
        })
        builder.addCase(add_remove_favourites.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(add_remove_favourites.fulfilled,(state,action)=>{
            state.loading=false;
            state.updatedPost=action.payload;
        })
        builder.addCase(add_remove_favourites.rejected,(state,action)=>{
            state.appErr=action?.payload?.message
            state.serverErr=action?.error?.message
            state.loading=false;
        })
        builder.addCase(getSinglePost.pending,(state,action)=>{
            state.loading=false
        })
        builder.addCase(getSinglePost.fulfilled,(state,action)=>{
            state.loading=false;
            state.singlePost=action.payload;
        })
        builder.addCase(getSinglePost.rejected,(state,action)=>{
            state.appErr=action?.payload?.message
            state.serverErr=action?.error?.message
            state.loading=false;
        })
        builder.addCase(searchByUsername.pending,(state,action)=>{
            state.loading=false
        })
        builder.addCase(searchByUsername.fulfilled,(state,action)=>{
            state.loading=false;
            state.searchposts=action.payload;
        })
        builder.addCase(searchByUsername.rejected,(state,action)=>{
            state.appErr=action?.payload?.message
            state.serverErr=action?.error?.message
            state.loading=false;
        })
        builder.addCase(getCreatorPost.pending,(state,action)=>{
            state.loading=false
        })
        builder.addCase(getCreatorPost.fulfilled,(state,action)=>{
            state.loading=false;
            state.searchposts=action.payload;
        })
        builder.addCase(getCreatorPost.rejected,(state,action)=>{
            state.appErr=action?.payload?.message
            state.serverErr=action?.error?.message
            state.loading=false;
        })
        builder.addCase('post/empty_searchresults',(state,action)=>{
            state.searchposts=''
        })
        builder.addCase(searchByTag.pending,(state,action)=>{
            state.loading=false;
        })
         builder.addCase(searchByTag.fulfilled,(state,action)=>{
            state.loading=false;
            state.searchposts=action.payload;
        })
        builder.addCase(searchByTag.rejected,(state,action)=>{
            state.appErr=action?.payload?.message
            state.serverErr=action?.error?.message
            state.loading=false;
        })

        builder.addCase(initialSeachPosts.pending,(state,action)=>{
            state.loading=true
        })
        
        builder.addCase(initialSeachPosts.fulfilled,(state,action)=>{
            state.searchposts=action?.payload;
        state.loading=false;
        })
        
        builder.addCase(initialSeachPosts.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })
        
       
    }
})



export default postSlice.reducer
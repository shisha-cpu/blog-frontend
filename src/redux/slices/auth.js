import { createSlice , createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUser = createAsyncThunk('auth/fetchUser',async(params)=>{
    const {data} = await axios.post('/auth/login' , params)
    
    return data
})
export const fetchAuth= createAsyncThunk('auth/fetchAuth',async(params)=>{
    const {data} = await axios.get('/auth/me' )
    return data
})

export const fetchRegister= createAsyncThunk('auth/fetchRegister',async(params)=>{
    const {data} = await axios.post('/auth/register' , params)
    return data
})

const initialState = {
    data : null,
    status : 'Loading' 
}

const authSlice = createSlice ({
    name : 'auth',
    initialState,
    reducers : {
        logout : (state)=>{
            state.data = null
        }
    },
    extraReducers: {
        [fetchUser.pending]:(state )=> {
            state.status  = 'loading'
            state.data = null
        },
        [fetchUser.fulfilled]:(state , action)=> {
            state.status  = 'loaded'
            state.data = action.payload
         },
         [fetchUser.rejected]:(state )=> {
            state.status  = 'error'
            state.data = null
         },
         [fetchAuth.pending]:(state )=> {
            state.status  = 'loading'
            state.data = null
        },
        [fetchAuth.fulfilled]:(state , action)=> {
            state.status  = 'loaded'
            state.data = action.payload
         },
         [fetchAuth.rejected]:(state )=> {
            state.status  = 'error'
            state.data = null
         },
         [fetchRegister.pending]:(state )=> {
            state.status  = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled]:(state , action)=> {
            state.status  = 'loaded'
            state.data = action.payload
         },
         [fetchRegister.rejected]:(state )=> {
            state.status  = 'error'
            state.data = null
         },
    }
})
export const selectIsAuth = state =>Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions
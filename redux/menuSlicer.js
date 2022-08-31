import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMenu = createAsyncThunk(
    'data/getMenu',
    async(restaurant,thunkFilled)=>{
      
        const url=[restaurant[0]]
        const menu =    await axios.post('/api/getMenu', {url:url})
        
        return menu.data;
    }
)
const menuSlice = createSlice({
    name: "menu",
    initialState: {
        menu: [],
    },
    reducers: {
        getMenu:(state,action)=>{

        }
    },
    extraReducers: (builder)=> {
        builder.addCase(getMenu.fulfilled,(state,action)=>{
            state.menu=action.payload.message
        })

        
    }
});

export const menuState = state => state.menu;
export default menuSlice.reducer;
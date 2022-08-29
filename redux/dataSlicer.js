import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurants = createAsyncThunk(
    'data/fetchRestaurants',
    async (user, thunkAPI) => {
  
      const response = await axios.post("/api/api/restaurantget",user)
      console.log(response)
      return response.data
    }
  )
  

const DataSlice = createSlice({
name: "data",
initialState: {
    restaurant: [],
},
reducers:{
    addRestaurant: (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.email = action.payload.email;
    },
    removeRestaurant: (state) => {
        state.user = null;
        state.role = null;
        state.email = null;
    },
    loadRestaurant: (state) => {
    
    },
},
extraReducers:(builder)=> {
    builder.addCase(fetchRestaurants.fulfilled, (state,action) => {
        // Add restaurants to the state array
     
        state.restaurant=action.payload.message;

      })
}


})

export const restaurantList = state => state.restaurant;


export const { addRestaurant, removeRestaurant, loadRestaurant } = DataSlice.actions;


export default DataSlice.reducer;
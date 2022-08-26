import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "redux/UserSlicer";
import DataSlice from "redux/dataSlicer";


export default configureStore({
name:"store",
reducer: {
    user: UserSlice,
    data: DataSlice,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
devTools: process.env.NODE_ENV !== 'production',
}
)
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "redux/UserSlicer";
import DataSlice from "redux/dataSlicer";
import MenuSlice from "redux/menuSlicer";

export default configureStore({
name:"store",
reducer: {
    user: UserSlice,
    data: DataSlice,
    menu: MenuSlice,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
devTools: process.env.NODE_ENV !== 'production',
}
)
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/products-slice";
import userReducer from "./user/user-slice";

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,

  }
})

export default store;
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/products-slice";
import userReducer from "./user/user-slice";
import singleProductReducer from "./single-product/single-product-slice";

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    singleProduct: singleProductReducer,

  }
})

export default store;
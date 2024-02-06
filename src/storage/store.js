import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/products-slice";
import userReducer from "./user/user-slice";
import singleProductReducer from "./single-product/single-product-slice";
import api from "../utils/api";
import cartReducer from "./cart/cart-slice";
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'cart',
  storage: storage,
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    products: productReducer,
    user: userReducer,
    singleProduct: singleProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
      serializableCheck: {
        ignoreActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER, 
        ],
      },
    })
})
export const persistor = persistStore(store);
export default store;
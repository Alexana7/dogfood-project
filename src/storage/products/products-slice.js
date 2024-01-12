import{ createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { isLiked } from '../../utils/products';

const initialState = {
  data: [],
  favoriteProducts: [],
  total: 0,
  loading: true,
  error: null
};

export const sliceName = 'products';

export const fetchChangeLikeProduct = createAsyncThunk(
  `${sliceName}/fetchChangeLikeProduct`,
  async function( product, {fulfillWithValue, rejectWithValue, getState}) {
    try {
      const {user} = await getState();
      const liked = isLiked(product.likes, user.data._id);
      const data = await api.changeLikeProductStatus(product._id, liked);
      return fulfillWithValue({product: data, liked})
    }
    catch(err) {
      return rejectWithValue(err)
    }
  }
)


export const fetchProducts = createAsyncThunk(
  `${sliceName}/fetchProducts`,
  async function(_, {fulfillWithValue, rejectWithValue, getState}) {
    try {
      const {user} = await getState();
      const data = await api.getProductsList();
      return fulfillWithValue({...data, currentUser: user.data})
    }
    catch(err) {
      return rejectWithValue(err)
    }
  }
)

const productSlice = createSlice({
   name: sliceName,
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const {total, products, currentUser} = action.payload;
        state.data = products;
        state.favoriteProducts = products.filter(item => isLiked(item.likes, currentUser._id));
        state.total = total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.err = action.payload;
        state.loading = false;
      })
      
      .addCase(fetchChangeLikeProduct.fulfilled, (state, action) => {
        const {product, liked} = action.payload;
        state.data = state.data.map(cardState => {
          return cardState._id === product._id ? product : cardState;
        })

        if (!liked) {
          state.favoriteProducts.push(product);  
        } else {
          state.favoriteProducts =  state.favoriteProducts.filter(card => card._id !== product._id)
        }
        state.loading = false;
      })
      .addCase(fetchChangeLikeProduct.rejected, (state, action) => {
        state.err = action.payload;
        state.loading = false;
      })
      
    }
})

export default productSlice.reducer;
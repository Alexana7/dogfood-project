import{ createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: true,
  error: null
};

export const sliceName = 'user';

export const fetchUser = createAsyncThunk(
  `${sliceName}/fetchUser`,
  async function(_, {fulfillWithValue, rejectWithValue, extra: api}) {
    try {
      const data = await api.getUserInfo();
      return fulfillWithValue(data)
  
    }
    catch(err) {
      return rejectWithValue(err)
    }
  }
)

const userSlice = createSlice({
   name: sliceName,
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;

      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.err = action.payload;
        state.loading = false;
      })
    }
})

export default userSlice.reducer;
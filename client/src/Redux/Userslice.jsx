import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
export const RegisterUser = createAsyncThunk("user/register",async (data) => {
    // console.log(data);
    try {
        const res = await axios.post('http://localhost:3000/Register',data);
        res.data.msg ? alert(res.data?.msg) : "";
        return res.data;
    } catch (error) {
        return error
    }
});

export const LoginUser = createAsyncThunk("user/Login",async (data) => {
  try {
      const res = await axios.post('http://localhost:3000/Login',data);
      res.data.msg ? alert(res.data?.msg) : "";
      localStorage.setItem('token', res.data.token);
      return res.data;
  } catch (error) {
      return error
  }
});

export const GetUserData = createAsyncThunk("user/GetUserData", async (data, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login !");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post('http://localhost:3000/Getuser', data, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error data:', error.response.data.msg);
      if (error.response.data.msg === "Token is not valid") {
        localStorage.removeItem('token');
      }
      return thunkAPI.rejectWithValue(error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
      return thunkAPI.rejectWithValue("No response received");
    } else {
      console.error('Error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});


export const GetProductData = createAsyncThunk("Product/GetProductData", async (thunkAPI) => {
  try {
   
    const response = await axios.get('http://localhost:3000/GetProduct');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error data:', error.response.data.msg);
      if (error.response.data.msg === "Token is not valid") {
        localStorage.removeItem('token');
      }
      return thunkAPI.rejectWithValue(error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
      return thunkAPI.rejectWithValue("No response received");
    } else {
      console.error('Error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const UpdateProfile = createAsyncThunk("user/UpdateProfile",async (data) => {
  try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login !");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post('http://localhost:3000/UpdateProfile',data,config);
      res.data.msg ? alert(res.data?.msg) : "";
      return res.data;
  } catch (error) {
    console.log(error);
      // return error
  }
});

export const GetSearchResult = createAsyncThunk("Product/GetSearchResult",async (data) => {
  try {
      const res = await axios.post('http://localhost:3000/GetSearchResult',{word:data});
      res.data.msg ? alert(res.data?.msg) : "";
      return res.data;
  } catch (error) {
    console.log(error);
      // return error
  }
});

export const UpdateCart = createAsyncThunk("User/UpdateCart", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token'); // Example: Retrieve token from localStorage or state
    const res = await axios.post('http://localhost:3000/UpdateCart', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.msg) {
      alert(res.data.msg); // Example: Show alert for successful message
    }

    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return rejectWithValue(error.response.data); // Return error response data to handle in Redux
  }
});

export const GetCartProduct = createAsyncThunk("User/GetCartProduct", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) return;
    const res = await axios.get('http://localhost:3000/GetCartProduct',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.msg) {
      alert(res.data.msg); // Example: Show alert for successful message
    }

    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return rejectWithValue(error.response.data); // Return error response data to handle in Redux
  }
});

export const DeleteCartProduct = createAsyncThunk("User/DeleteCartProduct", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(`http://localhost:3000/DeleteCartItem`,{id:data},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.msg) {
      alert(res.data.msg); // Example: Show alert for successful message
    }

    return {data:res.data,id:data};
  } catch (error) {
    console.error("Error:", error);
    return rejectWithValue(error.response.data); // Return error response data to handle in Redux
  }
});

export const PlaceOrder = createAsyncThunk("User/PlaceOrder", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(`http://localhost:3000/PlaceOrder`,{data},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.msg) {
      alert(res.data.msg); 
    }

    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return rejectWithValue(error.response.data); // Return error response data to handle in Redux
  }
});

export const GetOrder = createAsyncThunk("User/GetOrder", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:3000/GetOrder`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.msg) {
      alert(res.data.msg); 
    }

    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return rejectWithValue(error.response.data); // Return error response data to handle in Redux
  }
});

const cartSlice = createSlice({
    name:"User",
    initialState:{
        User:null,
        ProductData:[],
        SearchData:[],
        CartData:[],
        Order:[],
        Address:null,
        Error:null,
        Token:null
    },
    reducers:{
        SetTokenToState(state,action){
            const token = localStorage.getItem('token');
            state.Token = token;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(RegisterUser.fulfilled, (state, action) => {
            state.User = action.payload;
            state.Error = null;
          })
          .addCase(RegisterUser.rejected, (state, action) => {
            console.log("Registration failed:", action);
            state.Error = action.error.message;
            state.User = null;
          });

          builder.addCase(LoginUser.fulfilled,(state,action)=>{
            state.Token = action.payload.token;
          });
          builder.addCase(GetUserData.fulfilled, (state, action) => {
            state.User = action.payload.user;
            state.Address = action.payload.address;
          })
          .addCase(GetUserData.rejected, (state, action) => {
            state.Error = action.payload;
          });

          builder
          .addCase(UpdateProfile.fulfilled, (state, action) => {
              // state.User = action.payload;
              // state.Error = null;
          })
          .addCase(UpdateProfile.rejected, (state, action) => {
              // state.Error = action.payload;
              // state.User = null;
          });
          builder.addCase(GetProductData.fulfilled, (state,action) => {
            state.ProductData = action.payload;
          });
          builder.addCase(GetSearchResult.fulfilled,(state,action)=>{
            state.SearchData = action.payload;
          });
          builder.addCase(GetCartProduct.fulfilled,(state,action) => {
            state.CartData = action.payload;
          });
          builder.addCase(DeleteCartProduct.fulfilled, (state, action) => {
            state.User = action.payload.data;
            const deletedItemId = action.payload.id;
          
            // Filter out the deleted item from CartData
            state.CartData = state.CartData.filter((item) => item._id !== deletedItemId);
          });
          builder.addCase(PlaceOrder.fulfilled,(state,action)=>{
            state.Order = action.payload;
          });
          builder.addCase(GetOrder.fulfilled,(state,action) => {
            state.Order = action.payload.flat();
          })
      },

});


export const {SetTokenToState} = cartSlice.actions;
export default cartSlice.reducer;
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
      // console.log("Please Login !");
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
    let options = {
      "key": "rzp_test_2IEDRFaCoooycY", // Test Key ID
      "amount": "50000", // 500 INR
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://storage.googleapis.com/test-4b354.appspot.com/nataliya-melnychuk-51sGDpm5S78-unsplash.jpg?GoogleAccessId=firebase-adminsdk-r44c2%40test-4b354.iam.gserviceaccount.com&Expires=51437808000&Signature=tJp7xIzqsUQHrV9VQGW3rC9A%2Fm17neeSn%2BT71yTuV339kxhqQRTH%2BxjvKTEdI6M%2FU1d2S7yi90hPKRn6n3y7dUkkph3wFt7Jl9lLHGhy289cXgGwn%2BRdxL%2BNanLjY4QdTWYqJrhINjZLTac6WwdyfXAD1eWOEKV6unRBZNS2STBi8RIQgJo7NqVpUn%2FlSL2dQpMUcTEc5%2B9MnNR4p4eyl00ymQBwFJfU4FuoQQifxc%2FbY3pahMHyKBT6azT%2FhGtm2MaREdYw%2B1Z%2Br%2FTtYZ%2F0ham51NTHz7ZSLH%2FSqY%2FZdeTZJq9wvCTAPyaSrByQtSCOk0CkmyJGSdyq3GtsIJSVcw%3D%3D",
      "order_id": "order_IluGWxBm9U23y8", // Ensure this is a valid Order ID from Razorpay
      "handler": function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  
  // let rzp1 = new Razorpay(options);
  
  // // Handle payment failure
  // rzp1.on('payment.failed', function (response) {
  //     alert(response.error.code);
  //     alert(response.error.description);
  //     alert(response.error.source);
  //     alert(response.error.step);
  //     alert(response.error.reason);
  //     alert(response.error.metadata.order_id);
  //     alert(response.error.metadata.payment_id);
  // });
  
  // Open the payment form
  // rzp1.open();
  

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

export const CancelOrder = createAsyncThunk("User/CancelOrder", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`http://localhost:3000/CancelOrder`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data:data
    });

    if (res.data.msg) {
      alert(res.data.msg);
      window.location.reload(); 
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
            // state.Order = action.payload.flat();
          });
          builder.addCase(GetOrder.fulfilled,(state,action) => {
            state.Order = action.payload.flat().reverse();
          })
      },

});


export const {SetTokenToState} = cartSlice.actions;
export default cartSlice.reducer;
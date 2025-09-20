import axiosClient from "@/utils/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (userId, thunkAPI) => {
      try {
        const res = await axiosClient.get(`/api/carts?filters[user][id][$eq]=${userId}&populate[products][populate][0]=banner`, {
          withCredentials: true,
        });
  
        const existingCart = res.data?.data[0];
  
        if (existingCart) {
          return existingCart.products;
        } else {
          return [];
        }
      } catch (error) {
        console.error("❌ Error fetching cart items:", error);
        return thunkAPI.rejectWithValue(error.response?.data || "حدث خطأ غير متوقع");
      }
    }
);

export const handleAddToCart = createAsyncThunk(
  'cart/handleAddToCart',
  async ({ userId, productId }, thunkAPI) => {
    try {
      const cartRes = await axiosClient.get(`/api/carts?filters[user][id][$eq]=${userId}&populate[products][populate][0]=banner`, {
        withCredentials: true,
      });
      let cartId;

      if (cartRes.data?.data[0]?.id) {
        const existingCart = cartRes.data.data[0];
        cartId = existingCart.documentId;

        const existingProductIds = existingCart.products?.map(prod => prod.documentId);

        if (existingProductIds.includes(productId)) {
          return thunkAPI.rejectWithValue("المنتج موجود بالفعل في الكارت!");
        }

        const updateRes = await axiosClient.put(`/api/carts/${cartId}`, {
          data: {
            products: {
                connect: [...existingProductIds, productId].map(id => ({ documentId :id }))
            }
          }
        }, {
          withCredentials: true
        });

        return updateRes.data.data[0];

      } else {
        const newCartRes = await axiosClient.post("/api/carts", {
          data: {
            user: [userId],
            products: {
              connect: [productId]
            }
          }
        }, {
          withCredentials: true
        });

        return newCartRes.data.data[0].products;
      }

    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "حدث خطأ غير متوقع");
    }
  }
);

export const handleRemoveFromCart = createAsyncThunk(
  'cart/handleRemoveFromCart',
  async ({ userId, productId }, thunkAPI) => {
    try {
      const cartRes = await axiosClient.get(`/api/carts?filters[user][id][$eq]=${userId}&populate[products][populate][0]=banner`, {
        withCredentials: true,
      });

      if (!cartRes.data?.data[0]?.id) {
        toast.error("الكارت غير موجود!");
        return thunkAPI.rejectWithValue("الكارت غير موجود!");
      }

      const existingCart = cartRes.data.data[0];
      const cartId = existingCart.documentId;
      const existingProductIds = existingCart.products?.map(prod => prod.documentId);

      if (!existingProductIds.includes(productId)) {
        toast.error("المنتج غير موجود في الكارت!");
        return thunkAPI.rejectWithValue("المنتج غير موجود في الكارت!");
      }

      const updatedProductIds = existingProductIds.filter(id => id !== productId);

      const updateRes = await axiosClient.put(`/api/carts/${cartId}`, {
        data: {
          products: {
            set: updatedProductIds.map(id => ({ documentId: id }))
          }
        }
      }, {
        withCredentials: true
      });
      if(updateRes) 
        console.log(updateRes
      )
      

      return updateRes?.data?.data?.products;

    } catch (error) {
      console.error("❌ Error removing from cart:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "حدث خطأ غير متوقع");
    }
  }
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(handleAddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(handleAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleRemoveFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRemoveFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(handleRemoveFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default cartSlice.reducer;
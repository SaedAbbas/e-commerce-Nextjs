import axiosClient from "@/utils/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";


export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (userId, thunkAPI) => {
      try {
        const res = await axiosClient.get(`/api/carts?filters[user][id][$eq]=${userId}&populate=*`, {
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
  


// ✅ ثنك لإضافة منتج للكارت
export const handleAddToCart = createAsyncThunk(
  'cart/handleAddToCart',
  async ({ userId, productId }, thunkAPI) => {
    try {
      // 1️⃣ نجيب الكارت الحالي
      const cartRes = await axiosClient.get(`/api/carts?filters[user][id][$eq]=${userId}&populate=*`, {
        withCredentials: true,
      });
      // console.log(cartRes.data?.data[0])
      let cartId;

      if (cartRes.data?.data[0]?.id) {
        // ✅ الكارت موجود
        const existingCart = cartRes.data.data[0];
        cartId = existingCart.documentId;

        const existingProductIds = existingCart.products?.map(prod => prod.documentId);

        // ✅ لو المنتج موجود أصلًا، منضفوش تاني
        if (existingProductIds.includes(productId)) {
          toast.error("المنتج موجود بالفعل في الكارت!");
          return thunkAPI.rejectWithValue("المنتج موجود بالفعل في الكارت!");
        }

        // 🆕 ضيف المنتج الجديد مع اللي قبله
        const updateRes = await axiosClient.put(`/api/carts/${cartId}`, {
          data: {
            products: {
                connect: [...existingProductIds, productId].map(id => ({ documentId :id }))
            }
          }
        }, {
          withCredentials: true
        });
        // console.log(updateRes)
        return updateRes.data.data[0];

      } else {
        // 🛒 كارت مش موجود، نعمل واحد جديد
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

        return newCartRes.data.data[0];
      }

    } catch (error) {
      console.error("❌ Error adding to cart:", error);
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
        state.cartItems = action.payload?.products;
      })
      .addCase(handleAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default cartSlice.reducer;

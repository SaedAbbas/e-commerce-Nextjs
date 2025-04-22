import axiosClient from "@/utils/axiosClient";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


export const handleOrder = createAsyncThunk(
    'order/handleOrder',
    async ({ email, username, amount, productss }, thunkAPI) => {
        try {
            const response = await axiosClient.post('/api/orders', {
                data: {
                    email,
                    username,
                    amount,
                    products: {
                        connect: productss.map( prod => ({ documentId :prod.documentId }))
                      }
                }
            }, {
                withCredentials: true
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Error creating order:", error);
            return thunkAPI.rejectWithValue(error.response?.data || "حدث خطأ غير متوقع");
        }
    }
);





const orderSlice = createSlice({
    name :"order",
    initialState : {
        email : null,
        username : null,
        amount : null,
        products :[],
    },
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(handleOrder.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.amount = action.payload.amount;
            state.products = action.payload.products;
        });
    }})
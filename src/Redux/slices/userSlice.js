const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    user:null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser : (state,action) => {
            state.user = action.payload
        },
        logOut : (state,action) => {
            state.user = null
        }
    }
})

export const {setUser,logOut} = userSlice.actions
export default userSlice.reducer
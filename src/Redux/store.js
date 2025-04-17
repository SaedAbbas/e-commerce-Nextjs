import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux'
import userReducer from './slices/userSlice' // المسار حسب مشروعك
import cartReducer from "./slices/cartSlice";


const userPersistConfig = {
  key: 'root', // اسم المفتاح اللي هيتخزن في sessionStorage
  storage:storageSession,
}

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer), // هنا بنعمل ربط بين الـ userReducer و الـ persistConfig
  cart: cartReducer,
})

 
export const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) =>       // هنا بنستخدم middleware الافتراضية اللي بتيجي مع redux toolkit
    // وبنستخدم serializableCheck: false عشان نتجنب مشاكل الـ serialization
    //عشام ما يصير اررات فالكونسول
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store) //بياخد الـ store، وبيعمله ربط مع redux-persist.
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux'
import userReducer from './slices/userSlice' // المسار حسب مشروعك

const persistConfig = {
  key: 'root', // اسم المفتاح اللي هيتخزن في sessionStorage
  storage:storageSession,
}

const rootReducer = combineReducers({
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer) // هنا بنعمل ربط بين الـ rootReducer و الـ persistConfig

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>       // هنا بنستخدم middleware الافتراضية اللي بتيجي مع redux toolkit
    // وبنستخدم serializableCheck: false عشان نتجنب مشاكل الـ serialization
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store) //بياخد الـ store، وبيعمله ربط مع redux-persist.
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../reducer/authSlice'
export const store = configureStore({
  reducer: {
    user: authSlice,
  },
})

export default store
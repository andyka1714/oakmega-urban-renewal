import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {},
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;

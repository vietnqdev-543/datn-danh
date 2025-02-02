import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderReducer from './order/orderSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'



//redux persist
const persistConfig = {
  key: 'root',
  storage :storage ,
  whitelist : ['account' ,'order' ] ,
  // blacklist : ['account']
}

const rootReducer = combineReducers({
  order : orderReducer , 
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  
})


const  persistor = persistStore(store)
export {store , persistor}